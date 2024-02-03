import { useState } from "react"
import { Tables } from "../../../supabase.types"

interface DisplayImages {
  pid: string,
  url: string
  iid: string
}

type PostRow = Tables<'posts'>

export default function Post({post, allPostImages, profilePic}: {post: PostRow, allPostImages: DisplayImages[][], profilePic?: string}) {
  const [showAll, setShowAll] = useState<boolean>(false)

  const filteredPIs = allPostImages.filter((postImages) => postImages[0].pid === post.post_id)

  const inputDate = new Date(post.post_date);
  const formattedDate = inputDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  // console.log(formattedDate);

  return (
    <div key={post.post_id} className="border border-emerald-700 rounded-md p-4 mb-4 mx-4 bg-emerald-300" onClick={() => setShowAll(prev => !prev)}>
      {profilePic ? <img src={profilePic} alt="Profile picture"/> : null}
      <h3 className="text-xl font-bold">{formattedDate}</h3>
      <p className="text-gray-800">{post.text_content ?? ''}</p>

      {showAll ? filteredPIs.map((postImages) => (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-4 sm:grid-cols-2 gap-2 bg-emerald-600 bg-opacity-80 rounded-md p-4 w-full">{postImages.map((img) => <img src={img.url ?? ''} alt="" key={`${img.iid}`} className="h-auto w-60 rounded-md"/>)}</div>
              ))
              : filteredPIs.map((postImages) => (
                  <img src={postImages[0].url ?? ''} alt="" key={`${postImages[0].iid}`} className="h-auto w-60 rounded-md"/>
              ))}

      {filteredPIs[0] && filteredPIs[0].length > 1 ? <p className="cursor-pointer">(see more photos)</p> : null}
    </div>
  );
}