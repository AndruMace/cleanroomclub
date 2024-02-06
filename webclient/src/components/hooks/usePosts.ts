import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Tables } from '../../../supabase.types';
type PostRow = Tables<'posts'>

function usePosts(userid: string | null, page: number): PostRow[] {

  const [posts, setPosts] = useState<PostRow[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {

        const startOfRange = ((page-1) * 10) / 2
        
        let query = supabase
          .from('posts')
          .select(`*`)
          .order('post_date', { ascending: false })
          .range(startOfRange, startOfRange+4);
        
        if (userid) {
          query = query.eq('user_id', userid);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPosts();
  }, [page, userid]);

  return posts;

}


export default usePosts;
