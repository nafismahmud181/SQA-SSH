import { ProjectCard } from './components/ProjectCard'
import { Button } from '@/components/ui/button'

export default function Home() {
  const projectGroups = [
    {
      title: "Google SQA",
      projectCount: 3,
      color: "bg-purple-50",
    },
    {
      title: "AiDocbuilder SQA",
      projectCount: 1,
      color: "bg-orange-50",
    },
    {
      title: "Amazon SQA",
      projectCount: 2,
      color: "bg-green-50",
    },
  ]

  const detailedProjects = [
    {
      title: "Sarver Side",
      stats: {
        resources: 4,
        flows: 3,
        datasets: 8,
        dashboards: 1,
        connectors: 6,
      },
      color: "bg-orange-50",
      owner: "c.j.mccoy@gmail.com",
      members: [
        { name: "John Doe", image: "/avatar1.png" },
        { name: "Jane Smith", image: "/avatar2.png" },
      ],
    },
    {
      title: "Production Side",
      stats: {
        resources: 2,
        flows: 1,
        datasets: 7,
        dashboards: 4,
        connectors: 2,
      },
      owner: "c.a.glasser@outlook.com",
      members: [
        { name: "Alice Johnson", image: "/avatar3.png" },
      ],
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button size="icon" variant="secondary" className="rounded-full">
            +
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            Get Template Project
          </Button>
          <Button variant="outline">
            Get Tutorial Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        {projectGroups.map((group, i) => (
          <ProjectCard
            key={i}
            title={group.title}
            projectCount={group.projectCount}
            color={group.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {detailedProjects.map((project, i) => (
          <ProjectCard
            key={i}
            title={project.title}
            projectCount={1}
            stats={project.stats}
            owner={project.owner}
            members={project.members}
            // color="bg-white"
            color={project.color}
          />
        ))}
      </div>
    </div>
  )
}
