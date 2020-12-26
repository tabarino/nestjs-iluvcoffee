import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    let app: INestApplication;

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
        await app.init();
    });

    it.todo('Create [POST /]');
    it.todo('Get all [GET /]');
    it.todo('Get one [GET /:id]');
    it.todo('Update one [PATCH /:id]');
    it.todo('Delete one [DELETE /:id]');

    afterAll(async () => {
        await app.close();
    });
});