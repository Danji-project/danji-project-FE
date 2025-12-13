export interface BaseApartInfo {
  id: number;
  name: string;
  region: string;
  location: string;
  address: string;
  apartDetailName: string;
  houseSize: number;
  totalCount: number;
  moveAbleMonth: number;
  thumbnailFileUrl?: string;
  buildingCount?: number;
  totalUnit?: number;
  latitude?: number;
  longitude?: number;
  isUseBookmark?: boolean;
  bookmark?: boolean;
  picture?: string[];
}
