import { Injectable } from '@nestjs/common';
import { dataObject, apiCallsStatus, statusOK } from './api-calls.entity';
import { v4 } from 'uuid';
import {updateDataTO} from './dto/api-calls.dto';

@Injectable()
export class ApiCallsService {

    //This struct simulate a database, when the server is restarted the data is lost.
    private exampleApiResponse: dataObject[] = [
        {
            //id: `01 - ${new Date().toString()}` concatenate data,
            id: v4(), //Automatically generate an ID.
            title: 'test data',
            description: 'test the api response',
            date: new Date().toString(),
            status: apiCallsStatus.DONE
        },
    ];   

    getData(){
        return this.exampleApiResponse;
    }

    createData(title:string, description:string){
        const newData = {
            id: v4(),
            title: title,
            description: description,
            date: new Date().toString(),
            status: apiCallsStatus.IN_PROGRESS
        }

        //Add a new object to the array.
        this.exampleApiResponse.push(newData);

        //Respond successfully.
        let statusOKResponse = new statusOK();
        statusOKResponse.id = newData.id; 
        statusOKResponse.status = apiCallsStatus.DONE;

        return statusOKResponse
    }

    deleteData(id:string){
        const initialLength = this.exampleApiResponse.length;
        // (=>) it is used to iterate through each element and if the id is equal to the one entered, it removes the object from the array
        this.exampleApiResponse = this.exampleApiResponse.filter(dataObject => dataObject.id !== id);
        let statusOKResponse = new statusOK();
        
        if (this.exampleApiResponse.length === initialLength - 1) {
            //Respond successfully.
            statusOKResponse.status = apiCallsStatus.DONE;
        }else{
            //id not found
            statusOKResponse.status = apiCallsStatus.NOT_FOUND;          
        }
       return statusOKResponse
    }

    getDataById(id: string):dataObject
    {
        return this.exampleApiResponse.find(request => request.id === id)
    }

    updateData(id:string, updateFields: updateDataTO){
        const dataObject = this.getDataById(id);
        console.log(dataObject)
        if(dataObject !== undefined && dataObject !== null)
        {
            const newData = Object.assign(dataObject, updateFields)
            this.exampleApiResponse = this.exampleApiResponse.map(dataObject => dataObject.id === id ? newData : dataObject)
            return newData;
        }
        else
        {
            let statusOKResponse = new statusOK();
            //id not found
            statusOKResponse.status = apiCallsStatus.NOT_FOUND; 
            return statusOKResponse
        }
       
    }
}
