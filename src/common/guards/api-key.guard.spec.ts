import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
    it('should be defined', () => {
        const testReflector = new Reflector();
        const testConfig = new ConfigService();
        expect(new ApiKeyGuard(testReflector, testConfig)).toBeDefined();
    });
});
