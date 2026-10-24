"use client";

import { cn } from "@/utils/cn";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export default function ActiveLink({
  href,
  children,
  className,
  activeClassName = "",
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href.toString();

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
}
