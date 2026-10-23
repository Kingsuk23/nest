import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  " inline-flex justify-center item-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-default rounded-md text-base  cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-button-bg-default text-text-inverted hover:bg-button-bg-hover  disabled:bg-button-bg-disable disabled:text-text-disable focus-visible:bg-button-bg-hover px-4 py-2.5",

        outline:
          "border-2 border-border-default text-text-primary hover:bg-button-bg-secondary-hover focus-visible:bg-button-bg-secondary-hover  disabled:border-border-disable disabled:text-text-disable disabled:hover:bg-transparent px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
