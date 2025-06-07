const MobileMenuButton = ({ onClick, open }: { onClick(): void; open: boolean }) => {
  return (
    <button
      className='sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-white bg-blue-700/80 transition fixed top-3 right-6 z-[60]'
      aria-label={open ? 'Close menu' : 'Open menu'}
      onClick={onClick}
    >
      <div className='relative w-7 h-7 flex flex-col justify-center items-center'>
        <span className={`absolute h-0.5 w-7 bg-white rounded top-2`}></span>
        <span className={`absolute h-0.5 w-7 bg-white rounded top-3.5`}></span>
        <span className={`absolute h-0.5 w-7 bg-white rounded top-5`}></span>
      </div>
    </button>
  )
}

export default MobileMenuButton
