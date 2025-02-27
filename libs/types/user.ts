export type User = {
  id: string;
  authId: string;
  username: string;
  subscriber: boolean;
  dateRegistered: Date;
  dateLastLoggedIn: Date | null;
};
