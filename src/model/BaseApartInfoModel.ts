export interface BaseApartInfo {
  id: number;
  name: string;
  apartDetailName?: string | null;
  location?: string | null;
  thumbnailFileUrl?: string | null;
  totalCount?: number | null;
  houseSize?: number | null;
  moveAbleMonth?: number | null;
  [key: string]: any;
}
