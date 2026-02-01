import React from "react";

interface BrutalInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
  name?: string;
}

export default function BrutalInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  multiline = false,
  rows = 4,
  name,
}: BrutalInputProps) {
  const baseClassName = `brutal-input ${className}`;

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        name={name}
        className={baseClassName}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      className={baseClassName}
    />
  );
}
