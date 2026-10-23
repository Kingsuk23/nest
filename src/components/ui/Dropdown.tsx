import { cn } from "@/utils/cn";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownProps {
  children: React.ReactNode;
  contentClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  triggerLabel: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  contentClassName,
  triggerLabel,
  leftIcon,
  rightIcon,
  className,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "px-4 py-2 rounded-md border outline-none border-border-mute  items-center gap-2 cursor-pointer hover:bg-bg-minimal",
          className,
        )}
      >
        {leftIcon && leftIcon}
        <span className="text-base  text-text-default text-nowrap">
          {triggerLabel}
        </span>
        {rightIcon && rightIcon}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          align="start"
          avoidCollisions
          collisionPadding={16}
          className={cn(
            "shadow-sm p-2 rounded-lg bg-white border border-neutral-200 z-50",
            contentClassName,
          )}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
