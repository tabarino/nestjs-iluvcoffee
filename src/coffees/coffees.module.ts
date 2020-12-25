import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './controllers/coffees.controller';
import { Event } from 'src/events/entities/event.entity';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { CoffeesService } from './services/coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';

// class MockCoffeesService { }
class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

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
        { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
        }
    ]
})
export class CoffeesModule { }
