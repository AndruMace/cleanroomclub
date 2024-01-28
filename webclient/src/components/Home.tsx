import { useState, useRef, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { Session, User } from "@supabase/supabase-js";
import { FileUploader } from "./FileUploader";
import { Tables } from '../../supabase.types'

type PostRow = Tables<'posts'>
type ImageRow = Tables<'images'>
interface DisplayImages {
  pid: string,
  url: string
  iid: string
}

export default function Home({session}: {session: Session}) {

  const { user }: { user: User } = session;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploading, setUploading] = useState<boolean>(false)
  const [downloading, setDownloading] = useState<boolean>(false)
  const [postText, setPostText] = useState<string>('');
  const [imagesForUpload, setImagesForUpload] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [postImages, setPostImages] = useState<DisplayImages[][]>([])
  const [posts, setPosts] = useState<PostRow[]>([])

  const [page, setPage] = useState<number>(1)
  // const [pageRange, setPageRange] = useState<number>(10)

  useEffect(() => {
    // GET INITIAL POSTS
    async function getInitialPosts() {
      const { data, error } = await supabase
      .from('posts')
      .select(`*`)
      .eq('user_id', user.id)
      .order('post_date', {ascending: false})
      .range(0, 4)

      if (error) {
        console.error(error)
        throw error
      } else if (data) {
        setPosts(data)        
      }
    }

    getInitialPosts()
  }, [])

  useEffect(() => {
    // PAGINATE
    async function getPagePosts() {

      const startOfRange = ((page-1) * 10) / 2
      // p1 = 0,4
      // p2 = 5,9
      // p3 = 10,14
      // p4 = 15,19
      // p5 = 20, 24
      // ...etc

      const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.id)
      .order('post_date', {ascending: false})
      .range(startOfRange, startOfRange + 4)

      if (error) {
        console.error(error)
        throw error
      } else if (data) {
        setPosts(data)        
      }
    }

    getPagePosts()
  }, [page])

  useEffect(() => {
    // GET IMAGES
    async function downloadImages(images: any[]): Promise<any> {
      setDownloading(true);
    
      try {
        const downloadPromises = images.map(async (image) => {
          const { data, error } = await supabase.storage.from('postimages').download(image.url);
          if (error) {
            throw error;
          }
          return {url: URL.createObjectURL(data), pid: image.pid, iid: image.iid};
        });
    
        const urls = await Promise.all(downloadPromises);
    
        setDownloading(false);
        return urls;
      } catch (error: any) {
        setDownloading(false);
        console.log('Error downloading images: ', error.message);
        return []
      }
    }

    async function getPostImages() {
      const pids: Array<string> = posts.map(post => post.post_id)

      let imagesArr = pids.map(async (pid) => {
        const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('post_id', pid)
        
        if (error) {
          console.error(error)
          // throw error
        } else if (data) {
          return data
        }
      })

      Promise.all(imagesArr)
      .then(results => {
        const filteredResults: Array<any> = results.filter((img) => img && img.length > 0)
        const updatedFilteredResults: Array<any> = filteredResults.map(async (postImgs) => {
          const newUrls: string[] = await downloadImages(postImgs.map((pI: ImageRow) => ({pid: pI.post_id, url: pI.image_url, iid: pI.image_id})))
          return newUrls
        })
        Promise.all(updatedFilteredResults)
        .then((resolved) => {
          setPostImages(resolved)
        })
        .catch(error => {
          console.error(error)
        })
      })
      .catch(error => {
        console.error("An error occurred:", error);
        throw error
      });
    }

    getPostImages()
  }, [posts])

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
    }

    const { data, error } = await supabase.from('posts').insert(post).select().single()

    if (error) throw error

    return data
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      if (!imagesForUpload) {
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
      <form onSubmit={handleSubmit} className="flex flex-col w-full content-center border-emerald-700 border-solid border-2 rounded-md p-5">
        <h2 className="text-center underline pb-2">Create a New Post</h2>
        <textarea
          value={postText}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className="block p-2.5 w-full text-sm text-gray-900 bg-emerald-100 rounded-lg border border-gray-300 focus:border-emerald-800 focus:ring-emerald-800 focus:outline-none"
        />
        <FileUploader handleFiles={handleImageChange}/>
        {previewImages.map((imgUrl) => <img src={imgUrl} key={imgUrl} alt="" className="h-auto w-56"/>)}
        <button type="submit" className="bg-emerald-200 text-emerald-800 rounded-md w-1/2 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl">{!uploading ? 'Post' : 'Uploading...'}</button>
      </form>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
          {posts.map((post, i) => (
          <div key={`${i}_${post?.post_id}`}>
            <h3>{post.post_date ?? ''}</h3>
            <p>{post.text_content ?? ''}</p>
            {postImages.filter((postImages) => postImages[0].pid === post.post_id ).map((postImages) => (
              !downloading ? postImages.map((img) => <img src={img.url ?? ''} alt="" key={`${img.iid}`} className="h-auto w-40 rounded-md"/>) : <p key={`${post.post_id}`}>Loading...</p>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        {page > 1 ? <button onClick={() => setPage(currPage => currPage - 1)}className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl">Prev</button>: null}
        <button onClick={() => setPage(currPage => currPage + 1)} className="bg-emerald-200 text-emerald-800 rounded-md w-1/4 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl">Next</button>
      </div>
    </>
  )
}