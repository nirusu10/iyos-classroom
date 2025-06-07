'use client'

import { useEffect, useState } from 'react'
import LogoLink from './LogoLink'
import DesktopNavLinks from './DesktopNavLinks'
import MobileMenuButton from './MobileMenuButton'
import MobileNavLinks from './MobileNavLinks'
import MobileMenuBackDrop from './MobileMenuBackdrop'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Materials', path: '/materials' },
  { name: 'Booking', path: '/booking' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (!isDrawerOpen) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [isDrawerOpen])

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev)
  }

  return (
    <header className='bg-blue-600 sticky top-0 z-50'>
      <nav>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <LogoLink />
          {/* Desktop Nav  - only shows on sizes > 640px */}
          <DesktopNavLinks links={navLinks} />
        </div>
        <MobileMenuButton onClick={handleDrawerToggle} open={isDrawerOpen} />
        <MobileMenuBackDrop open={isDrawerOpen} setOpen={setIsDrawerOpen} />
        <MobileNavLinks links={navLinks} open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      </nav>
    </header>
  )
}

export default Navbar
