import { Link, NavLink } from 'react-router'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-teal-950 shadow-xl'>
      <nav className='max-w-4xl mx-auto flex flex-col sm:flex-row items-center py-4 px-4 sm:px-6 md:px-8'>
        <Link
          to='/'
          className='mr-auto text-2xl font-extrabold tracking-wide text-white hover:text-teal-300 transition mb-4 sm:mb-0'
        >
          IYO
        </Link>
        <ul className='flex flex-col sm:flex-row gap-4 sm:gap-10 text-lg font-semibold w-full sm:w-auto'>
          {[
            { to: '/', label: 'Home' },
            { to: '/materials', label: 'Materials' },
            { to: '/booking', label: 'Book Class' },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded transition-colors block text-center ${
                    isActive
                      ? 'text-teal-300 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-teal-300'
                      : 'text-white hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
