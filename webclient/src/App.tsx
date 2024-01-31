import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/User/Auth'
import Account from './components/User/Account'
import Home from './components/Home'
import { Session } from '@supabase/supabase-js'
import { Link, Route, useRoute, useLocation } from 'wouter'
import { navigate } from 'wouter/use-location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons/faBed'
import Landing from './components/Landing'
import Community from './components/Community'

function NavLink({href, children}: {href: string, children: any}) {
  const [isActive] = useRoute(href)

  return (
    <div className={`transition duration-300 w-full h-full text-center p-4 ${isActive ? 'bg-emerald-600' : 'hover:bg-emerald-500'}` } onClick={() => navigate(href)}    >
      <Link href={href}>
        <a className="link">{children}</a>
      </Link>
    </div>
  )
}

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [location, setLocation] = useLocation()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (session) return (
    <div className='bg-emerald-400 font-sans subpixel-antialiase'>
      <nav className='flex justify-around shadow-md'>
        <FontAwesomeIcon onClick={() => setLocation('/')} icon={faBed} className='transition duration-300 m-1 px-2 py-3 rounded-full border-emerald-800 bg-emerald-300 hover:bg-emerald-500' size='lg'/>
        <NavLink href="/me">Profile</NavLink>
        <NavLink href="/home">Home</NavLink>
        <NavLink href="/community">Community</NavLink>
      </nav>

      <Route path="/me">
        <Account key={session.user.id} session={session} />
      </Route>
      <Route path="/home">
        <Home key={session.user.id} session={session}/>
      </Route>
      <Route path="/community">
        <Community key={session.user.id}/>
      </Route>
      <Route path="/">
        <Landing loggedin={true}/>
      </Route>
    </div>
  )

  return (
    <div>
      <Route path="/auth">
        <Auth/>
      </Route>
      <Route path="/">
        <Landing loggedin={false}/>
      </Route>
    </div>
  )
}

export default App