import { Body, Controller, Get, Post, Delete, Param, Patch } from '@nestjs/common';
import { ApiCallsService } from './api-calls.service';
import {apiRequestTO, updateDataTO} from './dto/api-calls.dto';

@Controller('api-calls')
export class ApiCallsController {

    //@Patch: Partial update, of one or more data, but not all.
    //@Put: full update

    //Inject the service classes.
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

    @Delete(':id')
    deleteData(@Param('id') id:string){
        return this.ApiCallsService.deleteData(id);
    }

    @Patch(":id")
    updateData(@Param('id') id:string, @Body() updateFields: updateDataTO)
    {
        return this.ApiCallsService.updateData(id, updateFields);
    }

}
