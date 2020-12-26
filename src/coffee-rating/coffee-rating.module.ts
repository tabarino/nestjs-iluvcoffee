import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';
import { CoffeeRatingService } from './services/coffee-rating.service';

@Module({
    imports: [
        CoffeesModule,
        ConfigModule.forRoot(),
        DatabaseModule.register({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        })
    ],
    providers: [
        CoffeeRatingService
    ]
})
export class CoffeeRatingModule { }
