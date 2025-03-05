import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative h-20 w-56">
      <Image
        src="/logo.png"
        alt="SQA-SSH Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  )
} 