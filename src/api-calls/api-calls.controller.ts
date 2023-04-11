import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCallsService } from './api-calls.service';
import {apiRequestTO} from './dto/api-calls.dto';

@Controller('api-calls')
export class ApiCallsController {

    //inyecta clases del service
    constructor(private ApiCallsService: ApiCallsService){}

    @Get()
    getData(){
        return this.ApiCallsService.getData();
    }

    @Post()
    createData(@Body() dataRequest: apiRequestTO){
        console.log(dataRequest);
        return this.ApiCallsService.createData(dataRequest.description, 
            dataRequest.title);
    }
}
