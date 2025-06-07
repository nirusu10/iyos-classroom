import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type DesktopNavProps = {
  links: { name: string; path: string }[]
}

const DesktopNavLinks = ({ links }: DesktopNavProps) => {
  const pathname = usePathname()

  return (
    <ul className='hidden sm:flex gap-6 items-center'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.path}
            className={clsx(
              'transition px-3 py-1 rounded font-medium',
              pathname === link.path
                ? 'bg-white/20 text-yellow-200 underline'
                : 'text-white hover:bg-blue-500 hover:text-yellow-200'
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DesktopNavLinks
