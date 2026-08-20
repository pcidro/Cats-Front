import getPostById from "@/actions/post/getPostByIdAction";
import EspecificPost from "@/components/post/especificPost";

interface PagePostParams {
  params: Promise<{ id: string }>;
}

export default async function PagePost({ params }: PagePostParams) {
  const { id } = await params;

  try {
    const post = await getPostById(id);

    if (!post) {
      return (
        <div className="max-w-2xl mx-auto p-8 text-center">
          <p className="text-muted-foreground">Post não encontrado.</p>
        </div>
      );
    }

    return <EspecificPost post={post} />;
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-muted-foreground">Erro ao carregar o post.</p>
      </div>
    );
  }
}
