export interface ITrip{
    id:number;
    name:string;
    place:string;
    startDate:Date;
    endDate:Date;
    price:number;
    maxParticipants: number;
    picture: string;
    description: string;
    grade:number;
}