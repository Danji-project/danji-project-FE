interface IBaseApartInfoBase {
  buildingCount: number;
  id: number;
  location: string;
  name: string;
  region: string;
  thumbnailFileUrl: string | null;
  totalCount: number;
  bookmark: boolean;

  moveAbleMonth?: number;
  picture?: string[];
  houseSize?: number;
  apartDetailName?: string;
  isUseBookmark?: boolean;
}

export class BaseApartInfo implements IBaseApartInfoBase {
  buildingCount: number;
  id: number;
  location: string;
  name: string;
  region: string;
  thumbnailFileUrl: string | null;
  totalCount: number;
  bookmark: boolean;

  moveAbleMonth?: number;
  picture?: string[];
  houseSize?: number;
  apartDetailName?: string;
  isUseBookmark?: boolean;

  constructor(
    buildingcount: number,
    id: number,
    loc: string,
    name: string,
    region: string,
    thumb: string,
    totalCount: number,
    book: boolean
  ) {
    this.buildingCount = buildingcount;
    this.id = id;
    this.location = loc;
    this.name = name;
    this.region = region;
    this.thumbnailFileUrl = thumb;
    this.totalCount = totalCount;
    this.bookmark = book;
  }
}
