import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MobileNavProps = {
  links: { name: string; path: string }[]
  open: boolean
  setOpen(status: boolean): void
}

const MobileNavLinks = ({ links, open, setOpen }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <ul
      className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-blue-700 z-50
        transform transition-transform duration-300 flex flex-col gap-6  pt-28 px-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.path}
            className={clsx(
              'block text-xl font-semibold px-3 py-2 rounded transition',
              pathname === link.path
                ? 'bg-white/20 text-yellow-200 underline'
                : 'text-white hover:bg-blue-500 hover:text-yellow-200'
            )}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default MobileNavLinks
