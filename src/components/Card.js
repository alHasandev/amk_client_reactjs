import React from "react";

// Import static assets
import { SIZE } from "../assets";

export default function Card({
  size = "",
  children = "",
  className = "",
  ...rest
}) {
  return (
    <div
      className={`${size} mx-auto w-full bg-white px-4 md:px-8 pt-6 pb-8 shadow rounded-sm ${className}`}
      {...rest}>
      {children}
    </div>
  );
}

export function CardMini({ children = "", className = "", ...rest }) {
  return (
    <div
      className={`mx-auto bg-white md:px-8 px-4 py-2 shadow rounded-sm ${className}`}
      {...rest}>
      {children}
    </div>
  );
}

export function CardSmall({ children = "", className = "", ...rest }) {
  return (
    <Card
      size={SIZE.SMALL}
      className={className}
      {...rest}
      children={children}
    />
  );
}

export function CardMedium({ children = "", className = "", ...rest }) {
  return (
    <Card
      size={SIZE.MEDIUM}
      className={className}
      {...rest}
      children={children}
    />
  );
}

export function CardLarge({ children = "", className = "", ...rest }) {
  return (
    <Card
      size={SIZE.LARGE}
      className={className}
      {...rest}
      children={children}
    />
  );
}

export function CardExtraLarge({ children = "", className = "", ...rest }) {
  return (
    <Card
      size={SIZE.EXTRA_LARGE}
      className={className}
      {...rest}
      children={children}
    />
  );
}
