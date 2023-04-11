import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; //To display the data in the OpenAPI 3.0 Swagger document.

export class apiRequestTO{
    @IsString()
    @ApiProperty()
    title: string

    @IsString()
    @MinLength(3)
    @ApiProperty()
    description: string
}