import getCommmentsByPost from "@/actions/comment/getCommentbyPost";
import photosGet from "@/actions/post/photosget";
import Feed from "@/components/explorar/feed";
import Container from "@/components/ui/container";

export default async function PageExplorar() {
  const posts = await photosGet();

  return <Feed posts={posts} />;
}
