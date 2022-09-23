import Layout from "@/components/App/Main/Layout";
import CreatePost from "@/components/Feed/CreatePost";
import Post from "@/components/Feed/Post";
import { trpc } from "@/utils/trpc";
import { FeedPost, FeedPostLike, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const FeedsPAge = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<
    (FeedPost & {
      author: User;
      likes: FeedPostLike[];
    })[]
  >([]);

  const postsQuery = trpc.useInfiniteQuery(
    [
      "feed.list.home",
      {
        limit: 5,
      },
    ],
    {
      getNextPageParam: ({ nextCursor }) => nextCursor,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setPosts([...posts, ...data.pages[currentPage - 1].items]);
      },
    }
  );

  return (
    <Layout>
      <div className="w-full flex-col flex-end overflow-y-scroll h-[calc(100%-5rem)] scrollbar-hide">
        <CreatePost posts={posts} setPosts={setPosts} />
        {postsQuery.status === "loading" && <div>Loading...</div>}
        {posts.length >= 0 && postsQuery.status === "success" && posts.map((post) => <Post key={post.id} {...post} />)}
        {postsQuery.hasNextPage && (
          <div className="w-full flex-col flex items-center">
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                postsQuery.fetchNextPage();
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedsPAge;
