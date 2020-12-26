import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Request, SetMetadata } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CreateCoffeeDto } from '../dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../dto/update-coffee.dto';
import { CoffeesService } from '../services/coffees.service';

// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
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

    constructor(
        private readonly coffeesService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request
    ) {
        console.log('CoffeesController Created');
    }

    // localhost:3000/coffees
    // @Get()
    // findAll() {
    //     return this.coffeesService.findAll();
    //     // return 'this action returns all coffees';
    // }

    // localhost:3000/coffees?limit=10&offset=5
    // @UsePipes(ValidationPipe)
    // @SetMetadata('isPublic', true)
    @Get()
    @Public()
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        console.log(protocol);
        // await new Promise(resolve => setTimeout(resolve, 5000));
        return this.coffeesService.findAll(paginationQuery);
        // const { limit, offset } = paginationQuery;
        // return `this action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
    }

    // localhost:3000/coffees/123
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log(id);
        return this.coffeesService.findOne(id);
        // return `this action returns #${id} coffee`;
    }

    // You can set return codes using @HttpCode Decorator
    // @HttpCode(HttpStatus.GONE)
    // localhost:3000/coffees
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
        // return 'this action creates a coffee with this content: ' + JSON.stringify(body);
    }

    // localhost:3000/coffees/123
    @Patch(':id')
    // update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
        // return `this action updates #${id} coffee`;
    }

    // localhost:3000/coffees/123
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
        // return `this action removes #${id} coffee`;
    }
}
