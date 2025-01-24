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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
