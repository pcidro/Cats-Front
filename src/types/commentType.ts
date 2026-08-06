export type CommentType = {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
};
