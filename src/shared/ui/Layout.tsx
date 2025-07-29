import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        maxWidth: 960,
        margin: "0 auto",
        padding: "24px 16px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};
