import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = () => {
  const fetchPosts = () => {
    return axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.data;
      });
  };

  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export default usePosts;
