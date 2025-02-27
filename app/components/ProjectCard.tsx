"use client"

import { Card } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  projectCount: number
  color?: string
  owner?: string
  members?: { image?: string; name: string }[]
  stats?: {
    resources?: number
    flows?: number
    datasets?: number
    dashboards?: number
    connectors?: number
  }
}

export function ProjectCard({
  title,
  projectCount,
  color = "bg-purple-100",
  owner,
  members = [],
  stats
}: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{projectCount} project{projectCount !== 1 ? 's' : ''}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.preventDefault()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {stats && (
        <div className="mt-4 space-y-2">
          {stats.resources !== undefined && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span>🔗</span> Resources
              </span>
              <span>{stats.resources}</span>
            </div>
          )}
          {stats.flows !== undefined && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span>↗️</span> Flows
              </span>
              <span>{stats.flows}</span>
            </div>
          )}
          {stats.datasets !== undefined && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span>📊</span> Datasets
              </span>
              <span>{stats.datasets}</span>
            </div>
          )}
          {stats.dashboards !== undefined && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span>📈</span> Dashboards
              </span>
              <span>{stats.dashboards}</span>
            </div>
          )}
          {stats.connectors !== undefined && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2">
                <span>🔌</span> Connectors
              </span>
              <span>{stats.connectors}</span>
            </div>
          )}
        </div>
      )}

      {(owner || members.length > 0) && (
        <div className="mt-6">
          {owner && <div className="text-sm text-gray-600">Owner: {owner}</div>}
          {members.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Members:</span>
              <div className="flex -space-x-2">
                {members.map((member, i) => (
                  <Avatar key={i} className="h-6 w-6 border-2 border-white">
                    <AvatarImage src={member.image} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )

  const projectId = title.toLowerCase().replace(/\s+/g, '-')
  
  return stats ? (
    <Link href={`/projects/${projectId}/flows`} className="block">
      <Card className={`${color} border-none p-6 relative transition-transform hover:scale-[1.02]`}>
        {cardContent}
      </Card>
    </Link>
  ) : (
    <Card className={`${color} border-none p-6 relative`}>
      {cardContent}
    </Card>
  )
} 