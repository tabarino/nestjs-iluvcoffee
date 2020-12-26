import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { WrapResponseInterceptor } from '../../src/common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from '../../src/common/interceptors/timeout.interceptor';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from '../../src/coffees/dto/update-coffee.dto';
import * as request from 'supertest';

/* IMPORTANT NOTE
  Sometimes when errors happen within npm scripts (such as the tests we're 
  running inside test:e2e), post hooks won't run! 
  
  You have a few options here, when these error happen, you can:
  
  1) Manually run the `posttest:e2e` hook.
  
  2) Use a library like `npm-run-all` (npm i --D npm-run-all) and use 
     the --continue-on-error flag to make sure everything still runs, moving the "post" hook
     into an npm script to be ran
*/

describe('[Feature] Coffees - /coffees', () => {
    const coffee = {
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavours: ['chocolate', 'vanilla'],
    };
    const expectedPartialCoffee = jasmine.objectContaining({
        ...coffee,
        flavours: jasmine.arrayContaining(
            coffee.flavours.map(name => jasmine.objectContaining({ name })),
        ),
    });
    let app: INestApplication;
    let httpServer: HttpServer;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CoffeesModule,
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5433,
                    username: 'postgres',
                    password: 'Root1234',
                    database: 'postgres',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        }));

        await app.init();

        httpServer = app.getHttpServer();
    });

    it('Create [POST /]', () => {
        return request(httpServer)
            .post('/coffees')
            .send(coffee as CreateCoffeeDto)
            .expect(HttpStatus.CREATED)
            .then(({ body }) => {
                expect(body).toEqual(expectedPartialCoffee);
            });
    });

    it('Get all [GET /]', () => {
        return request(httpServer)
            .get('/coffees')
            .then(({ body }) => {
                console.log(body)
                expect(body.length).toBeGreaterThan(0);
                expect(body[0]).toEqual(expectedPartialCoffee);
            });
    });

    it('Get one [GET /:id]', () => {
        return request(httpServer)
            .get('/coffees/1')
            .then(({ body }) => {
                expect(body).toEqual(expectedPartialCoffee);
            });
    });

    it('Update one [PATCH /:id]', () => {
        const updateCoffeeDto: UpdateCoffeeDto = {
            ...coffee,
            name: 'New and Improved Shipwreck Roast'
        }
        return request(httpServer)
            .patch('/coffees/1')
            .send(updateCoffeeDto)
            .then(({ body }) => {
                expect(body.name).toEqual(updateCoffeeDto.name);

                return request(httpServer)
                    .get('/coffees/1')
                    .then(({ body }) => {
                        expect(body.name).toEqual(updateCoffeeDto.name);
                    });
            });
    });

    it('Delete one [DELETE /:id]', () => {
        return request(httpServer)
            .delete('/coffees/1')
            .expect(HttpStatus.OK)
            .then(() => {
                return request(httpServer)
                    .get('/coffees/1')
                    .expect(HttpStatus.NOT_FOUND);
            })
    });

    afterAll(async () => {
        await app.close();
    });
});