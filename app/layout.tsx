import '../styles/globals.css'

import '../styles/cursor.css'

import Nav from 'components/Nav'
import '../styles/syntax.css'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Nav />
      <body className="pt-16">{children}</body>
    </html>
  )
}
