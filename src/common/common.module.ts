import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './guards/api-key.guard';

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        { provide: 'APP_GUARD', useClass: ApiKeyGuard }
    ]
})
export class CommonModule { }
