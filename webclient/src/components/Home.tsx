import { useState, useRef } from "react"
import { supabase } from "../supabaseClient"
import { Session, User } from "@supabase/supabase-js";
import { FileUploader } from "./FileUploader";
import Post from "./Posts/Post";
import usePosts from "./hooks/usePosts";
import useImages from "./hooks/useImages";
// import usePosts from "./hooks/usePosts";

export default function Home({session}: {session: Session}) {

  const { user }: { user: User } = session;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploading, setUploading] = useState<boolean>(false)
  const [postText, setPostText] = useState<string>('');
  const [imagesForUpload, setImagesForUpload] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [page, setPage] = useState<number>(1)

  const posts = usePosts(user.id, page)
  const {allPostImages, downloading} =useImages(posts)

  function handleTextChange(event: any) {
    setPostText(event.target.value);
  };

  function clearFileInput() {
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
};

  function handleImageChange(imgFiles: File[]) {
    setImagesForUpload((prevImgFiles) => [...prevImgFiles, ...imgFiles])
    const urls = imgFiles.map((file) => URL.createObjectURL(file))
    setPreviewImages((prevUrls) => [...prevUrls, ...urls])
  }
  
  async function toS3(file: File): Promise<string> {
    console.log(typeof file)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    const { error: uploadError } = await supabase.storage.from('postimages').upload(filePath, file)
  
    if (uploadError) throw uploadError

    return filePath
  }

  async function createImageRecord(path: string, post_id: string): Promise<string> {
    const imagesForUpload = {
      post_id,
      image_url: path,
      // upload_date timestamp without time zone not null default current_timestamp,
      // metadata json null,
      // size integer null,
    }

    const { data, error } = await supabase.from('images').insert(imagesForUpload).select()

    if (error) throw error

    return data[0].id
  }

  async function createPostRecord(user_id: string) {
    const post = {
      //   post_id uuid not null,
      user_id,
      text_content: postText,
      //   title text null,
      post_date:'2024-02-05 14:20:00.000000' 
    }

    const { data, error } = await supabase.from('posts').insert(post).select().single()

    if (error) throw error

    return data
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      if (!imagesForUpload || imagesForUpload.length < 1) {
        throw new Error('You must select an image to upload.')
      }

      setUploading(true)

      const filePaths = await Promise.all(imagesForUpload.map(async (img) => await toS3(img)))
      const post = await createPostRecord(user.id)
      await Promise.all(filePaths.map(async (path) => await createImageRecord(path, post.post_id)))

      // TODO more efficient method of populating new post
      window.location.reload()

    } catch(error: any) {
      console.error(error.message)
      alert(error.message)
    } finally {
      setUploading(false);
      setImagesForUpload([])
      setPreviewImages([])
      setPostText('')
      clearFileInput()
    }
  }

  return (
    <>
<div className="flex justify-center p-6">
  <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md content-center bg-white border-2 border-emerald-500 rounded-lg shadow-lg p-6">
    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-emerald-800 text-center mb-4">Create a New Post</h2>
    <textarea
      value={postText}
      onChange={handleTextChange}
      placeholder="Is your room clean?"
      rows={1}
      className="p-3 w-full text-sm text-gray-900 bg-emerald-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition ease-in-out duration-300"
    />
    <div className="my-4">
    <div className="flex justify-center my-4">
      <FileUploader handleFiles={handleImageChange} />
    </div>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {previewImages.map((imgUrl) => (
          <img src={imgUrl} key={imgUrl} alt="Preview" className="h-auto max-w-xs rounded-md shadow" />
        ))}
      </div>
    </div>
    <button
      type="submit"
      className="mt-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow focus:outline-none focus:shadow-outline transition ease-in-out duration-300 w-full"
    >
      {!uploading ? 'Post' : 'Uploading...'}
    </button>
  </form>
</div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 justify-items-center">
          {posts.map((post) => (
            !downloading ? <Post post={post} allPostImages={allPostImages} key={post.post_id} uid={user.id} /> : <p key={`${post.post_id}`}>Loading...</p>
        ))}
      </div>
      <div className="flex justify-around">
        {page > 1 ? <button onClick={() => setPage(currPage => currPage - 1)}className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl">Prev</button>: null}
        {posts.length < 5 ? null : <button onClick={() => setPage(currPage => currPage + 1)} className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl mb-12">Next</button>}
      </div>
    </>
  )
}