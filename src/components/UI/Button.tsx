interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "danger" | "outline";
  className?: string;
}

export default function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-btn btn-${variant} ${className}`}
    >
      {text}
    </button>
  );
}
