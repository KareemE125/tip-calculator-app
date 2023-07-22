import ReduxProvider from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'

const spaceMono = Space_Mono({ weight: "700", subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
