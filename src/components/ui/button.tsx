
import * as React from 'react'
import { cn } from '@/lib/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-[var(--brand-orange)] px-4 py-2 text-white text-sm font-medium hover:brightness-110 transition",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
