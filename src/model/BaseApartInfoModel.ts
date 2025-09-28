interface IBaseApartInfoBase
{
    buildingcount : number;
    id : number;
    location : string;
    name : string;
    region : string;
    thumbnailFileUrl : string;
    totalUint : number;
    bookmark : boolean;

    moveVailableMonth? : number;
    picture? : string;
    houseSize? : number;
    apartDetailName? : string;
    isuseBookmark? : boolean;
}

export class BaseApartInfo implements IBaseApartInfoBase
{
    buildingCount : number;
    id : number;
    location : string;
    name : string;
    region : string;
    thumbnailFileUrl : string;
    totalUnit : number;
    bookmark : boolean;
    
    moveVailableMonth? : number;
    picture? : string;
    houseSize? : number;
    apartDetailName? : string;
    isuseBookmark? : boolean;

    constructor(buildingcount:number, id:number, loc:string, name:string, region:string, thumb:string, uint:number, book:boolean)
    {
        this.buildingCount = buildingcount;
        this.id = id;
        this.location = loc;
        this.name = name;
        this.region = region;
        this.thumbnailFileUrl = thumb;
        this.totalUnit = uint;
        this.bookmark = book;
    }
}