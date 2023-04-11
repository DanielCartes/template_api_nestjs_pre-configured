import { Injectable } from '@nestjs/common';
import { Api, apiCallsStatus, statusOK } from './api-calls.entity';
import { v4 } from 'uuid';
import {apiRequestTO} from './dto/api-calls.dto';

@Injectable()
export class ApiCallsService {

//Simula una base de datos, cuando se reinicia el servidor se pierden los datos
private exampleApiResponse: Api[] = [
    {
        //id: `01 - ${new Date().toString()}` concatenar datos,
        id: v4(),//genera id
        title: 'test data',
        description: 'test the api response',
        date: new Date().toString(),
        status: apiCallsStatus.DONE
    },
];   

private statusOKResponse = new statusOK();


    getData(){
        return this.exampleApiResponse;
    }

    createData(title:string, description:string){
        const request = {
            id: v4(),
            title: title,
            description: description,
            date: new Date().toString(),
            status: apiCallsStatus.IN_PROGRESS
        }

        //agrega un nuevo objeto al arreglo
        this.exampleApiResponse.push(request);

        //responde exitosamente
        this.statusOKResponse.id = request.id; 
        this.statusOKResponse.status = apiCallsStatus.DONE;

        return this.statusOKResponse
    }

    updateData(){}
    deleteData(){}
}
