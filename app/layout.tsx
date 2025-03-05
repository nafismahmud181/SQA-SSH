import './globals.css'
import { Inter } from 'next/font/google'
import { ClientLayout } from './components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SQA-SSH Dashboard',
  description: 'Project management dashboard for SQA-SSH',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
