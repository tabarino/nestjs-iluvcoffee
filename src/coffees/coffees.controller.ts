import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get('flavours')
    findAll() {
        return 'this action returns all coffees';
    }
}
