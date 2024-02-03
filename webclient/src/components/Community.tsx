import { useState } from "react"
import usePosts from "./hooks/usePosts"
import useImages from "./hooks/useImages"
import Post from "./Posts/Post"

export default function Community() {
  const [page, setPage] = useState<number>(1)
  const posts = usePosts(null, page)
  const {allPostImages, downloading} = useImages(posts)

  return (
    <div className="w-screen h-screen">
      <h1>Community</h1>
      <h2>Here's what others are doing :)</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center">
          {posts.map((post) => (
            !downloading ? <Post post={post} allPostImages={allPostImages} key={post.post_id}/> : <p key={`${post.post_id}`}>Loading...</p>
        ))}
      </div>
      <div className="flex justify-around">
        {page > 1 ? <button onClick={() => setPage(currPage => currPage - 1)}className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl">Prev</button>: null}
        {posts.length < 5 ? null : <button onClick={() => setPage(currPage => currPage + 1)} className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl mb-12">Next</button>}
      </div>
    </div>
  )
}