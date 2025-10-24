import type { Metadata } from 'next'
import ThemeProvider from './ThemeProvider'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin Panel View',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
