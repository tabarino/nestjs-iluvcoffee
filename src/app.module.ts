import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import appConfig from './config/app.config';

@Module({
    imports: [
        // ConfigModule.forRoot({
        //     // You can change the name of your config file
        //     envFilePath: '.environment',
        //     // Or disable it if you configure that directly in your server
        //     ignoreEnvFile: true
        // }),
        // ConfigModule.forRoot({
        //     validationSchema: Joi.object({
        //         DATABASE_HOST: Joi.required(),
        //         DATABASE_PORT: Joi.number().default(5432),
        //     })
        // }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: +process.env.DATABASE_PORT,
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                autoLoadEntities: true,
                synchronize: true // This option must be disabled on Production
            })
        }),
        ConfigModule.forRoot({
            load: [appConfig]
        }),
        CoffeesModule,
        CoffeeRatingModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        // { provide: APP_PIPE, useClass: ValidationPipe }
    ],
})
export class AppModule { }
