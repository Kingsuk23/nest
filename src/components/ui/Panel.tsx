import { cn } from "@/utils/cn";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-bg-default shadow-small w-full md:p-6 p-4 rounded-xl flex flex-col gap-4 min-w-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
