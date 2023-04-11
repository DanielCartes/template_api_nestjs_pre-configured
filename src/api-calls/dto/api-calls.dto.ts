import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; //para mostrar los datos en el documento Swagger de OpenApi 3.0

export class apiRequestTO{
    @IsString()
    @ApiProperty()
    title: string

    @IsString()
    @MinLength(3)
    @ApiProperty()
    description: string
}