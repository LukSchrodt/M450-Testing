import { User } from "./User.model";

export type Post = {
  id: string;
  name: string;
  createdAt: Date;
  creator: User;
};
