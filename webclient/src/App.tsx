import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './components/User/Auth'
import Dashboard from './components/User/Dashboard'
import Home from './components/Home'
import { Session } from '@supabase/supabase-js'
import { Link, Route, useRoute } from 'wouter'
import { navigate } from 'wouter/use-location'
import Landing from './components/Landing'
import Community from './components/Community'

function NavLink({href, children}: {href: string, children: any}) {
  const [isActive] = useRoute(href)

  return (
    <div className={`transition duration-300 w-full h-full text-center p-4 flex justify-center ${isActive ? 'bg-emerald-600' : 'hover:bg-emerald-500'}` } onClick={() => navigate(href)}    >
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
    <div className='bg-emerald-400 font-sans subpixel-antialiase min-h-screen'>
      <nav className='flex justify-center shadow-md'>
        <NavLink href="/">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12.223 11.641-.223.22-.224-.22a2.224 2.224 0 0 0-3.125 0 2.13 2.13 0 0 0 0 3.07L12 18l3.349-3.289a2.13 2.13 0 0 0 0-3.07 2.225 2.225 0 0 0-3.126 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21.707 11.293-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707zM18.001 20H6v-9.585l6-6 6 6V15l.001 5z"></path>
          </svg>
        </NavLink>

        <NavLink href="/me">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"></path></svg>
        </NavLink>
        <NavLink href="/home">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path d="M20 9.557V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.525 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.475-.811-2.75-2-3.443zM18 7v2h-5V7h5zM6 7h5v2H6V7zm14 9H4v-3c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v3z"></path></svg>
        </NavLink>
        <NavLink href="/community">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)'}}><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path></svg>
        </NavLink>
      </nav>

      <Route path="/me">
        <Dashboard key={session.user.id} session={session} />
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