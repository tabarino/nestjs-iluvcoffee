import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './controllers/coffees.controller';
import { Event } from 'src/events/entities/event.entity';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { CoffeesService } from './services/coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';

class MockCoffeesService { }

@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavour, Event])
    ],
    exports: [
        CoffeesService
    ],
    controllers: [
        CoffeesController
    ],
    // providers: [
    //     CoffeesService
    // ]
    // providers: [{
    //     provide: CoffeesService,
    //     useValue: new MockCoffeesService
    // }]
    providers: [
        CoffeesService,
        { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }
    ]
})
export class CoffeesModule { }
