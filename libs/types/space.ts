import { Location } from './location';

export type Space = {
  id: string;
  name: string;
  slug: string;
  dateAdded?: Date;
  dateLastModified?: Date;
  dateLastAccessed?: Date;
  locations?: Location[];
};
