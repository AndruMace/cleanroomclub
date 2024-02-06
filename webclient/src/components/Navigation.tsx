import { useRoute, Link } from "wouter"
import { navigate } from "wouter/use-location"

export function NavLink({href, children}: {href: string, children: any}) {
  const [isActive] = useRoute(href)

  return (
    <div className={`transition duration-300 w-full h-full text-center p-4 flex justify-center ${isActive ? 'bg-emerald-600' : 'hover:bg-emerald-500'}` } onClick={() => navigate(href)}    >
      <Link href={href}>
        <a className="link">{children}</a>
      </Link>
    </div>
  )
}

export function FooterLink({href, children}: {href: string, children: any}) {
  const [isActive] = useRoute(href)

  return (
    <div className="transition duration-300 text-center flex justify-center" onClick={() => navigate(href)}    >
      <Link href={href}>
        <a className="link">{children}</a>
      </Link>
    </div>
  )
}
