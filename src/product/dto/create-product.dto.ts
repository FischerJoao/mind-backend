import { IsString, IsOptional, IsInt, IsDecimal, Min, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;


    @IsNumber()
    @Min(0)
    price: number;

    @IsInt()
    @Min(0)
    quantity: number;
}
