import { useState } from "react";
import usePosts from "./hooks/usePosts";
import useImages from "./hooks/useImages";
import Post from "./Posts/Post";

export default function Community() {
  const [page, setPage] = useState<number>(1);
  const posts = usePosts(null, page);
  const { allPostImages, downloading } = useImages(posts);

  return (
    <div className="w-screen min-h-screen p-4">
      <h1 className="text-3xl font-bold text-emerald-900 text-center mt-4" style={{textShadow: '0px 0px 1px black'}}>Community</h1>
      <h2 className="text-xl text-emerald-800 text-center mt-2 mb-6" style={{textShadow: '0px 0px 1px black'}}>Here's what others are doing :)</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
        {downloading ? (
          <p className="text-emerald-600 col-span-2 md:col-span-3 lg:col-span-5 text-center">Loading...</p>
        ) : (
          posts.map((post) => (
            <Post post={post} allPostImages={allPostImages} key={post.post_id} />
          ))
        )}
      </div>
      <div className="flex justify-around mt-6">
        {page > 1 && (
          <button onClick={() => setPage((currPage) => currPage - 1)} className="bg-emerald-200 text-emerald-800 rounded-md p-2 mx-auto hover:bg-emerald-500 hover:shadow-xl">
            Prev
          </button>
        )}
        {posts.length < 5 ? null : <button onClick={() => setPage(currPage => currPage + 1)} className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl mb-12">Next</button>}
      </div>
    </div>
  );
}
