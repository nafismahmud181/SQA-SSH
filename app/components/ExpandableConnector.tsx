"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Action {
  id: string
  name: string
  description: string
}

const mouseActions: Action[] = [
  { id: "102", name: "click()", description: "Clicks on an element." },
  { id: "103", name: "doubleClick()", description: "Performs a double-click." },
  { id: "104", name: "contextClick()", description: "Performs a right-click (context menu)." },
  { id: "105", name: "moveToElement()", description: "Moves the mouse to an element (used for hover)." },
  { id: "111", name: "dragAndDrop()", description: "Drags an element and drops it onto another." },
]

const keyboardActions: Action[] = [
  { id: "201", name: "sendKeys(Keys.ENTER)", description: "Simulates pressing the ENTER key." },
  { id: "202", name: "sendKeys(Keys.TAB)", description: "Simulates pressing the TAB key." },
  { id: "203", name: "sendKeys(Keys.BACK_SPACE)", description: "Simulates pressing the Backspace key." },
  { id: "204", name: "sendKeys(Keys.ARROW_DOWN)", description: "Presses the Down Arrow key." },
]

const webElementActions: Action[] = [
  { id: "301", name: "sendKeys(\"text\")", description: "Types text into an input field." },
  { id: "302", name: "clear()", description: "Clears an input field." },
  { id: "303", name: "submit()", description: "Submits a form." },
]

const waitConditions: Action[] = [
  { id: "401", name: "WebDriverWait", description: "Waits for an element to be visible." },
]

interface ConnectorProps {
  name: string
  icon: string
}

export function ExpandableConnector({ name, icon }: ConnectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getActionsList = () => {
    switch (name) {
      case "Mouse Actions":
        return mouseActions
      case "Keyboard Actions":
        return keyboardActions
      case "WebElement Interactions":
        return webElementActions
      case "Wait Conditions":
        return waitConditions
      default:
        return []
    }
  }

  const isExpandable = ["Mouse Actions", "Keyboard Actions", "WebElement Interactions", "Wait Conditions"].includes(name)
  const actions = getActionsList()

  return (
    <div className="space-y-2">
      <Card 
        className={`p-3 ${isExpandable ? 'cursor-pointer hover:bg-gray-50' : ''} transition-colors`}
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {isExpandable && (
            <span className="text-gray-500">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          )}
          <span>{icon}</span>
          <div className="text-sm font-medium">{name}</div>
        </div>
      </Card>

      {isExpanded && actions.length > 0 && (
        <Card className="ml-6 border-l-2 border-purple-500">
          <div className="divide-y">
            {actions.map((action) => (
              <div 
                key={action.id} 
                className="p-3 hover:bg-gray-50"
              >
                <div className="flex gap-2">
                  <span className="text-xs text-gray-500 font-mono min-w-[40px]">{action.id}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium font-mono">{action.name}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
} 