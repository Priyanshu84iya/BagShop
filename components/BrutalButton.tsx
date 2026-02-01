import React from "react";

interface BrutalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function BrutalButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
}: BrutalButtonProps) {
  const variantStyles = {
    primary: "bg-brutal-yellow hover:bg-brutal-yellow",
    secondary: "bg-brutal-cyan hover:bg-brutal-cyan",
    danger: "bg-brutal-pink hover:bg-brutal-pink",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        brutal-button
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
