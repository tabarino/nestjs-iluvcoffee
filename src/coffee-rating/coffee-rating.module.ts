import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';
import { CoffeeRatingService } from './services/coffee-rating.service';

@Module({
    imports: [
        CoffeesModule,
        DatabaseModule.register({
            type: 'postgres',
            host: 'localhost',
            username: 'postgres',
            password: 'Root1234',
            port: 5432
        })
    ],
    providers: [
        CoffeeRatingService
    ]
})
export class CoffeeRatingModule { }
