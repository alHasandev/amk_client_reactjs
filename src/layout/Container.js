import React from "react";

export default function Container({ children = "", className = "", ...rest }) {
  return (
    <section className={`max-w-screen-xl mx-auto ${className}`} {...rest}>
      {children}
    </section>
  );
}
