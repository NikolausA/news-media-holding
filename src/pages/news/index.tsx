import { Typography, Affix, Grid } from "antd";
import { NewsList } from "@widgets/news-list/news-list";

const { Title } = Typography;

export const NewsPage = () => {
  const screens = Grid.useBreakpoint();

  return (
    <>
      <Affix offsetTop={0}>
        <div
          style={{
            background: "#fff",
            padding: screens.xs ? "12px 8px" : "16px 0",
            margin: 0,
            textAlign: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)", // отделение при скролле
            zIndex: 10,
          }}
        >
          <Title
            level={screens.xs ? 4 : 2}
            style={{
              margin: 0,
            }}
          >
            Лента новостей
          </Title>
        </div>
      </Affix>

      <NewsList />
    </>
  );
};
