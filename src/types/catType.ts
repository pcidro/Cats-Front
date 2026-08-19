import { PostType } from "./postType";

export type CatType = {
  id: string;
  name: string;
  birthDate: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
  username: string;
  ownerId?: string;
  posts?: PostType[];
};
