import getPostById from "@/actions/post/getPostByIdAction";
import { PostModal } from "./PostModal";

interface PagePostParalelParams {
  params: Promise<{ id: string }>;
}

export default async function PagePostParalel({
  params,
}: PagePostParalelParams) {
  const { id } = await params;

  try {
    const post = await getPostById(id);
    if (!post) return null;

    return <PostModal post={post} />;
  } catch (error) {
    console.error("Erro ao carregar post interceptado:", error);
    return null;
  }
}
