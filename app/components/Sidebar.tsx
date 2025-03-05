"use client"

import Link from 'next/link'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { name: 'Projects', icon: '📁', href: '/' },
  { name: 'Schedules', icon: '📅', href: '/schedules' },
  { name: 'Facets', icon: '🔷', href: '/facets' },
  { name: 'Connectors', icon: '🔌', href: '/connectors' },
  { name: 'Marketplace', icon: '🛍️', href: '/marketplace' },
  { name: 'Chat', icon: '💬', href: '/chat' },
  { name: 'Screenshot', icon: '📸', href: '/screenshot' },
]

interface SidebarProps {
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function Sidebar({ isExpanded, onExpandedChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div 
      className={cn(
        "h-full bg-[#1a1528] text-white p-6 relative transition-all duration-300",
        isExpanded ? "w-64" : "w-20"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 bg-[#1a1528] text-white hover:bg-[#2a2038] rounded-full"
        onClick={() => onExpandedChange(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "flex items-center mb-12",
        isExpanded ? "justify-center" : "justify-center"
      )}>
        <Logo />
      </div>
      
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              pathname === item.href 
                ? "bg-white/20 text-white" 
                : "text-gray-300 hover:bg-white/10 hover:text-white",
              !isExpanded && "justify-center"
            )}
            title={!isExpanded ? item.name : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className={cn(
        "absolute bottom-8 left-4 right-4",
        !isExpanded && "left-0 right-0 px-4"
      )}>
        <div className={cn(
          "flex items-center gap-3 px-3 py-2",
          !isExpanded && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0" />
          {isExpanded && (
            <div>
              <div className="text-sm font-medium">John Smith</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 