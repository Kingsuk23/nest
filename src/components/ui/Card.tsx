import { cn } from "@/utils/cn";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {children}
    </div>
  );
};

Card.Header = ({ className, children }: CardProps) => {
  return <div className={cn("relative w-full", className)}>{children}</div>;
};

Card.Badge = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "absolute top-3 left-3 rounded-full px-2 py-1 text-xs  text-text-default text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.Content = ({ className, children }: CardProps) => {
  return (
    <div className={cn("flex flex-col gap-2 px-1", className)}>{children}</div>
  );
};

export default Card;
