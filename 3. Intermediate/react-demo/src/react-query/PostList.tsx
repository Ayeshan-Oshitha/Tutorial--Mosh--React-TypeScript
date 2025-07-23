import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;

  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {posts?.pages.map((page, index) => (
          <div key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </div>
        ))}
      </ul>

      <button
        className="btn btn-primary mt-4"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        Load More
      </button>
    </>
  );
};

export default PostList;
