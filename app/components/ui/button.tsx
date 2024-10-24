"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative border-none font-['Inter'] text-[14px] font-[500] leading-[16.94px] tracking-[0.03em] transition-all duration-100 ease-in-out overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#242220] text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-inputBorder hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-cardBorder text-secondary-foreground hover:bg-cardBorder",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        white: "bg-white text-[#242220] border border-[#E0E0E9]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      isLoading: {
        true: "text-transparent",
        false: "",
      },
      isGoogleOrApple: {
        true: "px-[23px] py-[19.7px] pl-[58px] rounded-[50px] text-[19px] leading-[20px]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isLoading: false,
      isGoogleOrApple: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isGoogleOrApple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, isGoogleOrApple = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, isLoading, isGoogleOrApple, className }),
          "transition-transform duration-100 ease-in-out",
          "hover:scale-[1.04] active:scale-[0.98]",
          "disabled:hover:scale-100 disabled:cursor-not-allowed",
          {
            "bg-white text-[#242220] border border-[#E0E0E9]": variant === "white",
            "px-[23px] py-[19.7px] pl-[58px] rounded-[50px] text-[19px] leading-[20px]": isGoogleOrApple,
          }
        )}
        ref={ref}
        {...props}
      >
        <span className={cn("inline-block transition-opacity duration-300", { "opacity-0": isLoading })}>
          {props.children}
        </span>
        {isLoading && (
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 w-5 h-5 border-2 rounded-full",
              "animate-[spin_1s_linear_infinite]",
              {
                "border-white/30 border-t-white": variant !== "white",
                "border-black/30 border-t-black": variant === "white"
              }
            )}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }