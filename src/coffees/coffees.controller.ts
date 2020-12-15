import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { json } from 'express';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'this action returns all coffees';
    }

    /**
     * You can use the response in the same way we do in express
     * Using @Res() param decorator
     * It uses underlying platform Response objects (from Express.js or Fastify)
     * ========================================
     * AS BEST PRACTICE WE DO NOT USE LIKE THIS
     * ========================================
     * It's hard to test and maintain this kind of code
     */ 
    // @Get()
    // findAll(@Res() response) {
    //     // Express.js example using status() and send() methods
    //     response.status(200).send('this action returns all coffees');
    // }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `this action returns #${id} coffee`;
    }

    // You can set return codes using @HttpCode Decorator
    // @HttpCode(HttpStatus.GONE)
    @Post()
    create(@Body() body) {
        return 'this action creates a coffee with this content: ' + JSON.stringify(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `this action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `this action removes #${id} coffee`;
    }
}
