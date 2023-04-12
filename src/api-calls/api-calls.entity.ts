
export enum apiCallsStatus
{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    NOT_FOUND = 'ID NOT FOUND!'
}

export class dataObject{
    id: string
    title: string
    description: string
    date: string
    status: apiCallsStatus
}

export class statusOK{
    id: string
    status: apiCallsStatus.DONE | apiCallsStatus.NOT_FOUND
}