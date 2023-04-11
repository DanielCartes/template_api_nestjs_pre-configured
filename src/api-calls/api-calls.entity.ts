
export enum apiCallsStatus
{
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class Api{
    id: string
    title: string
    description: string
    date: string
    status: apiCallsStatus
}

export class statusOK{
    id: string
    status: apiCallsStatus.DONE
}