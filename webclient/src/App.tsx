import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/Auth'
import Account from './components/Account'
import Home from './components/Home'
import { Session } from '@supabase/supabase-js'
import { Link, Route, useRoute } from 'wouter'
import { navigate } from 'wouter/use-location'

function NavLink({href, children}: {href: string, children: any}) {
  const [isActive] = useRoute(href)

  return (
    <div className={`w-full h-full text-center p-4 ${isActive ? 'bg-emerald-600' : 'hover:bg-emerald-500'}` } onClick={() => navigate(href)}    >
      <Link href={href}>
        <a className="link">{children}</a>
      </Link>
    </div>
  )
}

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (session) return (
    <div className='bg-emerald-400 font-sans subpixel-antialiased h-screen'>
      <nav className='flex justify-around shadow-md'>
        <NavLink href="/me">Profile</NavLink>
        <NavLink href="/home">Home</NavLink>
        <NavLink href="/community">Community</NavLink>
      </nav>

      <Route path="/me">
        <Account key={session.user.id} session={session} />
      </Route>
      <Route path="/home">
        <Home key={session.user.id} session={session}></Home>
      </Route>
    </div>
  )

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Auth />
    </div>
  )
}

export default App