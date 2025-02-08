import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        tertiary:
          "border-transparent bg-primary/10 text-primary shadow hover:bg-primary/20",
        created:"border-transparent bg-gray-400 text-primary-foreground shadow hover:bg-gray-500/80",
        waiting_for_approval:"border-transparent bg-yellow-500 text-primary-foreground shadow hover:bg-yellow-500/80",
        purchase_order_sent:"border-transparent bg-blue-500 text-primary-foreground shadow hover:bg-blue-500/80",
        partially_vendor_assigned:"border-transparent bg-orange-500 text-primary-foreground shadow hover:bg-orange-500/80",
        vendor_assigned:"border-transparent bg-purple-400 text-primary-foreground shadow hover:bg-purple-500/80",
        approved:"border-transparent bg-green-600 text-primary-foreground shadow hover:bg-green-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
