"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, RotateCw, Clock, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useParams } from "next/navigation"
import { ExpandableConnector } from "@/app/components/ExpandableConnector"
import { useState } from "react"

interface Dataset {
  name: string
  type: string
  icon: string
}

interface Connector {
  name: string
  icon: string
}

export default function FlowDetailsPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const flowId = params.flowId as string

  const [datasets, setDatasets] = useState<Dataset[]>([
    { name: "Test case 1", type: "CSV", icon: "📊" },
    { name: "Test case 2", type: "CSV", icon: "📊" },
    { name: "Test case 3", type: "XLS", icon: "📊" }
  ])

  const connectors: Connector[] = [
    { name: "Mouse Actions", icon: "🖱️" },
    { name: "Keyboard Actions", icon: "⌨️" },
    { name: "WebElement Interactions", icon: "🔤" },
    { name: "Wait Conditions", icon: "🕒" }
  ]

  const addTestCase = async () => {
    const newTestCase = { name: `Test case ${datasets.length + 1}`, type: "CSV", icon: "📊" }

    // Update UI
    setDatasets([...datasets, newTestCase])

    // Send to backend
    try {
      const response = await fetch("/api/testcases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestCase),
      })
      if (!response.ok) throw new Error("Failed to save test case")
    } catch (error) {
      console.error("Error adding test case:", error)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href={`/projects/${projectId}/flows`} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Projects</span>
            <span>/</span>
            <span>Flows</span>
            <span>/</span>
            <span>{flowId}</span>
          </div>
          <h1 className="text-2xl font-semibold">{flowId}</h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
          <RotateCw className="h-4 w-4" />
          Run
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Schedule
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-[300px_1fr_300px] gap-8">
        {/* Inputs Section */}
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Inputs</h2>
            <div className="relative">
              <Input type="text" placeholder="Search..." className="w-full pl-8" />
              <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                🔍
              </div>
            </div>
          </div>

          {/* Test Cases with Plus Button */}
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-sm">Test Cases</div>
            <Button variant="outline" size="icon" onClick={addTestCase}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Display Test Cases */}
          {datasets.map((dataset, index) => (
            <Card key={index} className="p-3">
              <div className="flex items-center gap-3">
                <span>{dataset.icon}</span>
                <div>
                  <div className="text-sm font-medium">{dataset.name}</div>
                </div>
              </div>
            </Card>
          ))}

          {/* Connectors */}
          <div className="font-medium text-sm mb-2 mt-4">Connectors</div>
          {connectors.map((connector, index) => (
            <ExpandableConnector key={index} name={connector.name} icon={connector.icon} />
          ))}
        </div>

        {/* Center Canvas */}
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-2">📄</div>
            <div className="text-sm text-gray-500">Use Template</div>
            <div className="text-xs text-gray-400">Some text can go here explaining what is template data</div>
          </div>
        </div>

        {/* Outputs Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Outputs</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Dashboards</h3>
              <Card className="p-4 text-center text-sm text-gray-500">
                <div className="mb-2">📊</div>
                No dashboards added yet
              </Card>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Charts</h3>
              <Card className="p-4 text-center text-sm text-gray-500">
                <div className="mb-2">📈</div>
                No charts added yet
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
