import { Tables } from "../../../supabase.types";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

type PostRow = Tables<'posts'>
type ImageRow = Tables<'images'>
interface DisplayImages {
  pid: string,
  url: string
  iid: string
}

function useImages(posts: PostRow[]) {
  const [downloading, setDownloading] = useState<boolean>(false)
  const [allPostImages, setAllPostImages] = useState<DisplayImages[][]>([])

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

      const imagesArr = pids.map(async (pid) => {
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
        const filteredResults: Array<any> = results.filter((imgs) => imgs && imgs.length > 0)
        const updatedFilteredResults: Array<any> = filteredResults.map(async (postImgs) => {
          const newUrls: string[] = await downloadImages(postImgs.map((pI: ImageRow) => ({pid: pI.post_id, url: pI.image_url, iid: pI.image_id})))
          return newUrls
        })
        Promise.all(updatedFilteredResults)
        .then((resolved) => {
          setAllPostImages(resolved)
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

  return {allPostImages, downloading}
}

export default useImages