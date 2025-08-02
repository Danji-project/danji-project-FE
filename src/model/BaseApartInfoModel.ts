interface IBaseApartInfoBase
{
    apartID : string;
    locatin : string;
    apartName : string;
    apartDetailName : string;
    totalHouseHolds : number;
    houseSize : number;
    moveVailableMonth : number;
    picture : string;
}

export class BaseApartInfo implements IBaseApartInfoBase
{
    apartID : string;
    locatin: string;
    apartName: string;
    apartDetailName: string;
    totalHouseHolds: number;
    houseSize: number;
    moveVailableMonth: number;
    picture : string;
    isuseBookmark : boolean;
    bookmark : boolean;

    constructor(id:string, loc : string, name:string, detail:string, total:number, size:number, month:number, url:string, isusebookmark:boolean, bookmark:boolean)
    {
        this.apartID = id;
        this.locatin = loc;
        this.apartName = name;
        this.apartDetailName = detail;
        this.totalHouseHolds = total;
        this.houseSize = size;
        this.moveVailableMonth = month;
        this.picture = url;
        this.isuseBookmark = isusebookmark;
        this.bookmark = bookmark;
    }
}