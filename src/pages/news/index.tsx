import { Typography, Affix } from "antd";
import { NewsList } from "@widgets/news-list/news-list";

const { Title } = Typography;

export const NewsPage = () => {
  return (
    <>
      <Affix offsetTop={0}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "16px 0",
            margin: 0,
          }}
        >
          Лента новостей
        </Title>
      </Affix>
      <NewsList />
    </>
  );
};
