import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Session } from '@supabase/supabase-js'
import useLocation from 'wouter/use-location';
import DayStreakTracker from './DayStreakTracker';

export default function Dashboard({ session }: { session: Session }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [streak, setStreak] = useState<number>(0)
  const [_location, setLocation] = useLocation();

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { user } = session

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, streak`)
        .eq('id', user.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setStreak(data.streak)
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

  

  async function updateProfile(event: any) {
    event.preventDefault()

    setLoading(true)
    const { user } = session
    const updates = {
      id: user.id,
      username,
      website,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    // } else {
    //   setAvatarUrl(avatarUrl)
    // }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4">
      <section className="mb-8 p-4 max-w-prose bg-emerald-50 shadow-md rounded-lg">
        <h2 className="text-lg text-emerald-800 font-bold mb-4">Welcome to the Clean Room Club</h2>
        <p className="text-sm text-gray-600 mt-2">
          Thank you for joining Clean Room Club, where every clean room is a step toward a more organized, peaceful life. Together, we’re not just cleaning our spaces—we’re building a community that celebrates the beauty of simplicity and the power of habit.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Welcome aboard, and let’s start sharing the spaces we’re proud of!
        </p>
      </section>
      <DayStreakTracker streak={streak}/>
      <form onSubmit={updateProfile} className="flex flex-col items-center justify-center w-full h-full p-4">
  <h1 className="text-2xl text-emerald-800 font-bold mb-8">My Info</h1>
  <div className="w-full max-w-xs">
    <div className="mb-4">
      <label htmlFor="email" className="block text-emerald-800 text-sm font-bold mb-2">Email:</label>
      <input id="email" type="text" className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-500' value={session.user.email} disabled />
    </div>
    <div className="mb-6">
      <label htmlFor="username" className="block text-emerald-800 text-sm font-bold mb-2">Username:</label>
      <input
        id="username"
        className='appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-emerald-500'
        type="text"
        required
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className='flex flex-col space-y-4 w-full items-center'>
      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4" type="submit" disabled={loading}>
        {loading ? 'Loading ...' : 'Update'}
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4" type="button" onClick={handleLogout}>
        Sign Out
      </button>
    </div>
  </div>
</form>

    </div>
  )
}