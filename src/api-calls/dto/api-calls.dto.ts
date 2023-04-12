import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; //To display the data in the OpenAPI 3.0 Swagger document.
import { apiCallsStatus } from '../api-calls.entity';

export class apiRequestTO{
    @IsString()
    @ApiProperty()
    title: string

    @IsString()
    @MinLength(3)
    @ApiProperty()
    description: string
}

export class updateDataTO{
    @ApiProperty()
    title?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    status?: apiCallsStatus
}