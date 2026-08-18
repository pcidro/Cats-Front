import photosGet from "@/actions/post/photosget";

import Feed from "@/components/explorar/feed";

export default async function PageExplorar() {
  const posts = await photosGet();

  return <Feed posts={posts} />;
}
