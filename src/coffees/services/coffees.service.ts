import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { Coffee } from '../entities/coffee.entity';
import { Flavour } from '../entities/flavour.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavourRepository: Repository<Flavour>
    ) { }

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

    private async preloadFlavourByName(name: string): Promise<Flavour> {
        const existingFlavour = await this.flavourRepository.findOne({ name });

        if (existingFlavour) {
            return existingFlavour;
        }

        return this.flavourRepository.create({ name });
    }
}
