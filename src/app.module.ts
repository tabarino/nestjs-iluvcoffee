import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
    imports: [
        // ConfigModule.forRoot({
        //     // You can change the name of your config file
        //     envFilePath: '.environment',
        //     // Or disable it if you configure that directly in your server
        //     ignoreEnvFile: true
        // }),
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().default(5432),
            })
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true // This option must be disabled on Production
        }),
        CoffeesModule,
        CoffeeRatingModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule { }
