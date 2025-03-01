"use client"

import { Sidebar } from './Sidebar'
import { AuthProvider } from "@/contexts/AuthContext"
import { useState } from 'react'
import { cn } from "@/lib/utils"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <div className="fixed left-0 top-0 z-30 h-full">
          <Sidebar 
            isExpanded={isSidebarExpanded} 
            onExpandedChange={setIsSidebarExpanded}
          />
        </div>
        <main className={cn(
          "flex-1 transition-all duration-300",
          isSidebarExpanded ? "pl-64" : "pl-20"
        )}>
          <div className="h-full p-8">
            {children}
          </div>
        </main>
      </div>
    </AuthProvider>
  )
} 