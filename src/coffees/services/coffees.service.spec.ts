import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';
import { Flavour } from '../entities/flavour.entity';
import { CoffeesService } from './coffees.service';

describe('CoffeesService', () => {
    let service: CoffeesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoffeesService,
                { provide: Connection, useValue: {} },
                { provide: getRepositoryToken(Flavour), useValue: {} },
                { provide: getRepositoryToken(Coffee), useValue: {} }
            ]
        }).compile();

        service = module.get<CoffeesService>(CoffeesService);
        // You should use "resolve" to REQUEST and TRANSIENT Scopes
        // service = await module.resolve(CoffeesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
