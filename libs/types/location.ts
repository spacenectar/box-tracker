import type { Box } from './box'; // Assuming Box type is in ./box.ts

export type Location = {
  id: string;
  name: string;
  slug: string;
  spaceId: string;
  address?: string;
  whatThreeWords?: string;
  photo?: string;
  type: string;
  notes?: string;
  dateAdded?: Date;
  dateLastModified?: Date | null;
  dateLastAccessed?: Date | null;
  boxes?: Box[]; // Add the boxes field
};
