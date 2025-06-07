import Navbar from '@/components/layout/Navbar/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <div className='container mx-auto md:px-12 xl:px-40'>{children}</div>
      </body>
    </html>
  )
}
