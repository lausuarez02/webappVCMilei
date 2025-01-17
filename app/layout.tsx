import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VCMilei - Advanced AI LEFTIE',
  description: 'Advanced AI LEFTIE',
  icons: {
    icon: '/logo.png', // favicon
    apple: '/logo.png', // Apple devices
    shortcut: '/logo.png', // Alternative favicon
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
