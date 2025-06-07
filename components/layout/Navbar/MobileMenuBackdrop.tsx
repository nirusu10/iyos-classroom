type MobileMenuBackDrop = {
  open: boolean
  setOpen(status: boolean): void
}

const MobileMenuBackDrop = ({ open, setOpen }: MobileMenuBackDrop) => {
  return (
    <div
      className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xl transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setOpen(false)}
      aria-hidden={!open}
    />
  )
}

export default MobileMenuBackDrop
