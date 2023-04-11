import { Injectable } from '@nestjs/common';
import { Api, apiCallsStatus, statusOK } from './api-calls.entity';
import { v4 } from 'uuid';

@Injectable()
export class ApiCallsService {

    //This struct simulate a database, when the server is restarted the data is lost.
    private exampleApiResponse: Api[] = [
        {
            //id: `01 - ${new Date().toString()}` concatenate data,
            id: v4(), //Automatically generate an ID.
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

        //Add a new object to the array.
        this.exampleApiResponse.push(request);

        //Respond successfully.
        this.statusOKResponse.id = request.id; 
        this.statusOKResponse.status = apiCallsStatus.DONE;

        return this.statusOKResponse
    }

    updateData(){}
    deleteData(){}
}
