"use client";

import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

interface CallOutProps {
  CallOutState?: boolean;
  children: React.ReactNode;
  title: string;
  className?: string;
  Icon?: React.ReactNode;
  selectionStatus?: string;
}

const CallOut: React.FC<CallOutProps> = ({
  CallOutState = false,
  children,
  title,
  className,
  Icon,
  selectionStatus,
}) => {
  const [openCallOut, setOpenCallOut] = useState(CallOutState);

  useEffect(() => {
    setOpenCallOut(CallOutState);
  }, [CallOutState]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between cursor-pointer",
          className,
        )}
        onClick={() => setOpenCallOut((prev) => !prev)}
        aria-expanded={openCallOut}
      >
        <div className="flex items-center gap-x-2">
          {Icon}

          <span className="text-lg font-semibold text-text-default">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          {selectionStatus && (
            <span className="text-text-secondary truncate max-w-45 ">
              {selectionStatus}
            </span>
          )}

          {openCallOut ? (
            <ChevronUp width={20} height={20} className="text-icon-default" />
          ) : (
            <ChevronDown width={20} height={20} className="text-icon-default" />
          )}
        </div>
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
          openCallOut
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div
          className={cn(
            "min-h-0",
            openCallOut ? "overflow-visible pt-4" : "overflow-hidden",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CallOut;
