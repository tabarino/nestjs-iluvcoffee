import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
    imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Root1234',
            database: 'postgres',
            autoLoadEntities: true,
            synchronize: true // This option must be disabled on Production
        })
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule { }
