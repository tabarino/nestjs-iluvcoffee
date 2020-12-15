import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/controllers/coffees.controller';
import { CoffeesService } from './coffees/services/coffees.service';

@Module({
    imports: [],
    controllers: [
        AppController,
        CoffeesController
    ],
    providers: [
        AppService,
        CoffeesService
    ],
})
export class AppModule { }
