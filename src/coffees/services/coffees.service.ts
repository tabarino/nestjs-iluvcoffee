import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { Event } from 'src/events/entities/event.entity';
import { Coffee } from '../entities/coffee.entity';
import { Flavour } from '../entities/flavour.entity';
import { COFFEE_BRANDS } from '../coffees.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from '../config/coffees.config';

// @Injectable({ scope: Scope.TRANSIENT })
// @Injectable({ scope: Scope.REQUEST })
@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavourRepository: Repository<Flavour>,
        private readonly conn: Connection,
        private readonly configService: ConfigService,
        @Inject(coffeesConfig.KEY)
        private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[]
    ) {
        const databaseHost = this.configService.get<string>('DATABASE_HOST', 'localhost');
        console.log(databaseHost);

        const databaseHostAppConfig = this.configService.get('database.host', 'localhost');
        console.log(databaseHostAppConfig);

        // const coffeesConfig = this.configService.get('coffees.foo');
        // console.log(coffeesConfig);
        console.log(coffeesConfiguration.foo);

        console.log(coffeeBrands);
        console.log('CoffeeService Instantiated');
    }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;

        return this.coffeeRepository.find({
            relations: ['flavours'],
            skip: offset,
            take: limit
        });
    }

    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavours']
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavours = await Promise.all(
            createCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
        );

        const coffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavours
        });

        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavours = updateCoffeeDto.flavours && (
            await Promise.all(
                updateCoffeeDto.flavours.map(name => this.preloadFlavourByName(name))
            )
        )

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavours
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee: Coffee) {
        const queryRunner = this.conn.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id };

            coffee.recommendations++;

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async preloadFlavourByName(name: string): Promise<Flavour> {
        const existingFlavour = await this.flavourRepository.findOne({ name });

        if (existingFlavour) {
            return existingFlavour;
        }

        return this.flavourRepository.create({ name });
    }
}
