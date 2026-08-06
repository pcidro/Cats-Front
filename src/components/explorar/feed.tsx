import { PostType } from "@/types/postType";
import FeedPhotos from "./feedPhotos";
interface feedProps {
  posts: PostType[];
}

export default function Feed({ posts }: feedProps) {
  return (
    <div>
      <FeedPhotos posts={posts} />
    </div>
  );
}
