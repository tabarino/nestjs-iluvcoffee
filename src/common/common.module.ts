import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        { provide: 'APP_GUARD', useClass: ApiKeyGuard }
    ]
})
export class CommonModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
        // consumer.apply(LoggingMiddleware).forRoutes('coffees');
        // consumer.apply(LoggingMiddleware).forRoutes({
        //     path: 'coffees',
        //     method: RequestMethod.GET
        // });
        // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
    }
}
