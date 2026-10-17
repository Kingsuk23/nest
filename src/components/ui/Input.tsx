import { cn } from "@/utils/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-border-mute placeholder:text-text-mute rounded-lg px-4 py-2 text-base disabled:bg-input-bg-disable disabled:text-text-disable disabled:pointer-events-none aria-invalid:border-border-danger outline-none focus-visible:ring-2 focus-visible:ring-neutral-200",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
