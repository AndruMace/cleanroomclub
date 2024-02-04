import { useState } from "react"
import { Tables } from "../../../supabase.types"
import { supabase } from "../../supabaseClient"

interface DisplayImages {
  pid: string,
  url: string
  iid: string
}

type PostRow = Tables<'posts'>

export default function Post({post, allPostImages, profilePic, uid}: {post: PostRow, allPostImages: DisplayImages[][], profilePic?: string, uid?: string}) {
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredPIs = allPostImages.filter((postImages) => postImages[0].pid === post.post_id);

  const inputDate = new Date(post.post_date);
  const formattedDate = inputDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  async function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('post_id', post.post_id);

    if (error) {
      console.error(error);
      throw error;
    }

    window.location.reload();
  }

  return (
    <div key={post.post_id} className="border-2 border-emerald-500 rounded-lg overflow-hidden shadow-lg m-2 bg-white transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => setShowAll(prev => !prev)}>
      <div className="p-4">
        <div className="text-right">
          {uid && (
            <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer inline-block text-red-500 hover:text-red-600"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
          )}
        </div>
        {profilePic && <img src={profilePic} alt="Profile" className="h-16 w-16 rounded-full mx-auto"/>}
        <h3 className="text-lg font-semibold text-emerald-800 text-center my-2">{formattedDate}</h3>
        <p className="text-gray-800 text-sm text-center">{post.text_content ?? ''}</p>
      </div>
      <div className="px-4 pb-4 text-center">
        {showAll ? filteredPIs.flat().map((img) => (
          <div key={img.iid} className="my-2">
            <img src={img.url ?? ''} alt="" className="mx-auto rounded-md max-w-full h-auto" />
          </div>
        )) : (
          filteredPIs[0] && <img src={filteredPIs[0][0].url ?? ''} alt="" key={`${filteredPIs[0][0].iid}`} className="mx-auto my-2 rounded-md max-w-full h-auto"/>
        )}

        {filteredPIs[0] && filteredPIs[0].length > 1 && !showAll && <p className="cursor-pointer text-emerald-600 hover:text-emerald-800 text-sm mt-2">(click to see more photos)</p>}
      </div>
    </div>
  );
}
