"use client";
import { PostType } from "@/types/postType";
import FeedPhotos from "./feedPhotos";
import { useEffect, useRef, useState } from "react";
import photosGet from "@/actions/post/photosget";

import CatsLoading from "@/components/ui/loading";

interface feedProps {
  posts: PostType[];
}

export default function Feed({ posts }: feedProps) {
  const [photosFeed, setPhotosFeed] = useState<PostType[]>(posts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(true);
  const fetching = useRef(false);

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (page === 1) return;
    async function getPagePhotos(page: number) {
      const actionData = await photosGet(page);
      if (actionData) {
        setPhotosFeed((currentPhotos) => [...currentPhotos, ...actionData]);
        if (actionData.length < 6) setInfinite(false);
      }
      fetching.current = false;
      setLoading(false);
    }
    getPagePhotos(page);
  }, [page]);

  useEffect(() => {
    if (infinite) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  useEffect(() => {
    setPhotosFeed(posts);
  }, [posts]);

  return (
    <div>
      <FeedPhotos posts={photosFeed} />
      {loading && (
        <div className="flex h-[50px] my-4 mx-auto items-center justify-center text-amber-500">
          <CatsLoading className="w-12 h-auto" />
        </div>
      )}
    </div>
  );
}
