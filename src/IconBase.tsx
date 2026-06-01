import { forwardRef, type ReactNode, type SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "stroke" | "fill"> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  title?: string;
  variant?: "stroke" | "fill";
}

interface IconBaseProps extends IconProps {
  children: ReactNode;
}

export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(function IconBase(
  {
    size = 24,
    color,
    strokeWidth = 1.5,
    title,
    variant = "stroke",
    children,
    "aria-hidden": ariaHidden,
    "aria-label": ariaLabel,
    role,
    ...rest
  },
  ref,
) {
  const resolvedColor = color ?? "currentColor";
  const isStroke = variant === "stroke";
  const labelled = Boolean(title || ariaLabel);
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isStroke ? "none" : resolvedColor}
      stroke={isStroke ? resolvedColor : "none"}
      strokeWidth={isStroke ? strokeWidth : undefined}
      strokeLinecap={isStroke ? "round" : undefined}
      strokeLinejoin={isStroke ? "round" : undefined}
      xmlns="http://www.w3.org/2000/svg"
      role={role ?? (labelled ? "img" : undefined)}
      aria-hidden={ariaHidden ?? (labelled ? undefined : true)}
      aria-label={ariaLabel}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
});
