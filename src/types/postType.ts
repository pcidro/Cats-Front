import { CommentType } from "./commentType";

export type PostType = {
  id: string;
  caption: string;
  imageUrl: string;
  comments?: CommentType[];
  catId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  cat: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  _count: {
    likes: number;
    comments: number;
  };
};
