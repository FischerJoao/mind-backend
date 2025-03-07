import { IsString, IsOptional, IsInt, IsDecimal, Min, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    // Usar "number" para garantir que é interpretado como número
    @IsNumber()
    @Min(0)
    price: number; // Garantir que "price" seja um número (não uma string)

    @IsInt()
    @Min(0)
    quantity: number;
}
