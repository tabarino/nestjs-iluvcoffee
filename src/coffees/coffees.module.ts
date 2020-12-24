import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './controllers/coffees.controller';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { CoffeesService } from './services/coffees.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavour])
    ],
    controllers: [
        CoffeesController
    ],
    providers: [
        CoffeesService
    ],
})
export class CoffeesModule { }
