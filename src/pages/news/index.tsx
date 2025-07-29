// import { getNews } from "@shared/api/news-api";
// import { useEffect } from "react";
import { NewsList } from "@widgets/news-list/news-list";

export const NewsPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Лента новостей</h1>
      <NewsList />
    </div>
  );
};
