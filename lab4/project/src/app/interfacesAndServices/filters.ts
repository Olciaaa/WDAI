export interface IFilters{
    placeRange:string[];
    startDate:[Date, Date];
    endDate:[Date, Date];
    price:[number, number];
    grade: number[];
}