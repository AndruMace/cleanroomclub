import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Session } from '@supabase/supabase-js'
import useLocation from 'wouter/use-location';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  function handleLogout() {
    supabase.auth.signOut()
    setLocation('/')
  }

  async function updateProfile(event: any, avatarUrl: string) {
    event.preventDefault()

    setLoading(true)
    const { user } = session
    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={updateProfile} className="w-screen h-screen flex flex-col align-middle justify-center justify-items-center text-center">
      <h1>My Info</h1>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" type="text" className='rounded-md p-1 m-2' value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          className='rounded-md p-1 m-2'
          type="text"
          required
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {/* <div>
        <label>Avatar</label>
        <Avatar
          id="avatar"
          url={avatar_url || ''}
          size={150}
          onUpload={(event, url) => {
            updateProfile(event, url)
          }}
        />
      </div> */}
      <div className='flex justify-center'>
        <button className="bg-emerald-200 text-emerald-800 rounded-md w-1/2 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl" type="submit" disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div className='flex justify-center'>
        <button className="bg-emerald-200 text-emerald-800 rounded-md w-1/2 p-2 mx-auto my-3 hover:bg-emerald-500 hover:shadow-xl" type="button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </form>
  )
}