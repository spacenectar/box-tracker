export type User = {
  id: string;
  authId: string;
  username: string;
  subscriber: boolean;
  dateRegistered: Date;
  dateLastLoggedIn: Date | null;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
};
