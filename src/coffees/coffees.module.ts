import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './controllers/coffees.controller';
import { Event } from '../events/entities/event.entity';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { CoffeesService } from './services/coffees.service';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// class MockCoffeesService { }
// class ConfigService { }
// class DevelopmentConfigService { }
// class ProductionConfigService { }

// @Injectable()
// export class CoffeeBrandsFactory {
//     create() {
//         /* Do Something */
//         return ['buddy brew', 'nescafe'];
//     }
// }

@Module({
    imports: [
        ConfigModule.forFeature(coffeesConfig),
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
    // providers: [
    //     CoffeesService,
    //     { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    //     {
    //         provide: ConfigService,
    //         useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    //     }
    // ]
    // providers: [
    //     CoffeesService,
    //     CoffeeBrandsFactory,
    //     {
    //         provide: COFFEE_BRANDS,
    //         useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
    //         inject: [CoffeeBrandsFactory]
    //     }
    // ]
    // providers: [
    //     CoffeesService,
    //     {
    //         provide: COFFEE_BRANDS,
    //         useFactory: async (conn: Connection): Promise<string[]> => {
    //             // const coffeeBrands = await conn.query('SELECT...');
    //             const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
    //             console.log('[!] Async Factory');
    //             return coffeeBrands;
    //         },
    //         inject: [Connection]
    //     }
    // ]
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useFactory: () => ['buddy brew', 'nescafe'],
            // scope: Scope.TRANSIENT
        }
    ]
})
export class CoffeesModule { }
