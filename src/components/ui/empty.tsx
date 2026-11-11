import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: React.ReactNode
  image?: React.ReactNode
}

function Empty({
  className,
  image,
  description,
  children,
  ...props
}: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-4 py-12 text-center",
        className
      )}
      {...props}
    >
      {image && <div className="text-muted-foreground/60">{image}</div>}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
}

export { Empty }
