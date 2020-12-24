import { IsOptional, IsPositive } from "class-validator";
// import { Type } from "class-transformer";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    // @Type(() => Number) - We don't need specify Type here, because of the enableImplicitConversion on main.ts
    limit: number;

    @IsOptional()
    @IsPositive()
    // @Type(() => Number) - We don't need specify Type here, because of the enableImplicitConversion on main.ts
    offset: number;
}
