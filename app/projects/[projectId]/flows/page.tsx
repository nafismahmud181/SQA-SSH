"use client"

import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MoreVertical, Search } from "lucide-react"
import Link from "next/link"
import { Modal } from "@/app/components"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation"

interface FlowCard {
  title: string
  lastRun?: string
  nextRun?: string
  createdAt: string
  modifiedAt: string
}

export default function FlowsPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.projectId as string

  const [isModalOpen, setModalOpen] = useState(false)
  const [newFlowName, setNewFlowName] = useState("")
  const [flows, setFlows] = useState<FlowCard[]>([
    {
      title: "Login Test",
      lastRun: "--",
      nextRun: "--",
      createdAt: "Aug 5, 22 - 8:58 AM",
      modifiedAt: "Aug 5, 22 - 9:51 AM"
    },
    {
      title: "Transaction Test`",
      lastRun: "Aug 5, 22 - 8:58 AM",
      nextRun: "--",
      createdAt: "Aug 5, 22 - 8:58 AM",
      modifiedAt: "Aug 5, 22 - 9:51 AM"
    }
  ])

  const handleCreateFlow = () => {
    // Create new flow with current timestamp
    const now = new Date()
    const formattedDate = now.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    const newFlow: FlowCard = {
      title: newFlowName,
      lastRun: "--",
      nextRun: "--",
      createdAt: formattedDate,
      modifiedAt: formattedDate
    }

    // Add new flow to the list
    setFlows(prevFlows => [...prevFlows, newFlow])

    // Reset form and close modal
    setModalOpen(false)
    setNewFlowName("")
  }

  const handleFlowClick = (flowTitle: string) => {
    const flowId = flowTitle.toLowerCase().replace(/\s+/g, '-')
    router.push(`/projects/${projectId}/flows/${flowId}`)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Projects</span>
            <span>/</span>
            <span>Supply Chain</span>
          </div>
          <h1 className="text-2xl font-semibold">Supply Chain Flows</h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setModalOpen(true)}>
          + Add Flow
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        title="New Flow"
        description="Create a new flow by entering a name below."
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Flow Name
            </label>
            <Input
              id="name"
              placeholder="Enter flow name"
              value={newFlowName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewFlowName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700" 
              onClick={handleCreateFlow}
              disabled={!newFlowName.trim()}
            >
              Create
            </Button>
          </div>
        </div>
      </Modal>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </div>

      {/* Flow Cards */}
      <div className="grid grid-cols-2 gap-6">
        {flows.map((flow, index) => (
          <Card 
            key={index} 
            className="p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleFlowClick(flow.title)}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">{flow.title}</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  e.stopPropagation() // Prevent card click when clicking the menu
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
        ))}
      </div>
    </div>
  )
} 