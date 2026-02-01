import React from "react";

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function BrutalCard({
  children,
  className = "",
  onClick,
  hoverable = true,
}: BrutalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        brutal-card
        ${hoverable ? "" : "hover:transform-none hover:shadow-brutal"}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
