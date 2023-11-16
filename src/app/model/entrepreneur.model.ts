import {User} from "./user.model";

export interface Entrepreneur {
  entrepreneurId: number;
  firstName: string;
  lastName: string;
  companyName: string;
  user: User;
}
