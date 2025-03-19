export type Item = {
  id: string;
  name: string;
  slug: string;
  boxId: string | null;
  locationId: string | null;
  description?: string;
  photo?: string;
  condition?: number;
  quantity?: number;
  value?: number;
  dateAdded?: Date;
  dateLastModified?: Date | null;
  dateLastAccessed?: Date | null;
};