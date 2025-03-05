"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoreVertical, ChevronDown, ChevronRight } from "lucide-react"

interface FlowCard {
  title: string
  lastRun?: string
  nextRun?: string
  createdAt: string
  modifiedAt: string
}

interface MouseAction {
  id: string
  name: string
  description: string
}

const mouseActions: MouseAction[] = [
  { id: "102", name: "click()", description: "Clicks on an element." },
  { id: "103", name: "doubleClick()", description: "Performs a double-click." },
  { id: "104", name: "contextClick()", description: "Performs a right-click (context menu)." },
  { id: "105", name: "moveToElement()", description: "Moves the mouse to an element (used for hover)." },
  { id: "111", name: "dragAndDrop()", description: "Drags an element and drops it onto another." },
]

interface ExpandableFlowCardProps {
  flow: FlowCard
  onClick: (title: string) => void
}

export function ExpandableFlowCard({ flow, onClick }: ExpandableFlowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    if (flow.title === "Mouse Actions") {
      setIsExpanded(!isExpanded)
    } else {
      onClick(flow.title)
    }
  }

  return (
    <div className="space-y-2">
      <Card 
        className="p-6 cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            {flow.title === "Mouse Actions" && (
              <span className="text-gray-500">
                {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </span>
            )}
            <h3 className="text-xl font-semibold">{flow.title}</h3>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <div className="text-sm text-gray-500">Last Run</div>
            <div className="text-sm">{flow.lastRun}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Next Run</div>
            <div className="text-sm">{flow.nextRun}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Created At</div>
            <div className="text-sm">{flow.createdAt}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Modified At</div>
            <div className="text-sm">{flow.modifiedAt}</div>
          </div>
        </div>
      </Card>

      {/* Expandable Actions List */}
      {isExpanded && flow.title === "Mouse Actions" && (
        <Card className="p-4 ml-4 border-l-2 border-purple-500">
          <div className="space-y-3">
            {mouseActions.map((action) => (
              <div key={action.id} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
                <div className="text-sm text-gray-500 min-w-[45px]">{action.id}</div>
                <div>
                  <div className="text-sm font-medium">{action.name}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
} 