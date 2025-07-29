import { Layout as AntLayout } from "antd";
import type { PropsWithChildren } from "react";

const { Content } = AntLayout;

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <AntLayout style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <Content
        style={{
          maxWidth: 960,
          width: "100%",
          margin: "0 auto",
          padding: "24px 16px",
          boxSizing: "border-box", // важно для контроля ширины с паддингами
        }}
      >
        {children}
      </Content>
    </AntLayout>
  );
};
