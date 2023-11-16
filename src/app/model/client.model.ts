import {User} from "./user.model";

export interface Client {
  clientId: number;
  firstName: string;
  lastName: string;
  isPremium: string;
  user: User;
}
