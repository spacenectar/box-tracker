import type { Item } from './item';

export type Box = {
  id: string;
  name: string;
  slug: string;
  locationId: string;
  room: string;
  sealed: boolean;
  description?: string;
  items: Item[];
  colour: string;
  dateAdded?: Date;
  dateLastModified?: Date | null;
  dateLastAccessed?: Date | null;
};