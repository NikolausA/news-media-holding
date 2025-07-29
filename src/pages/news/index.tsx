import { getNews } from "@shared/api/news-api";
import { useEffect } from "react";

export const NewsPage = () => {
  useEffect(() => {
    getNews({ limit: 10, skip: 0 })
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h1>News</h1>
    </div>
  );
};
