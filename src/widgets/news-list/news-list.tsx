import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchNews } from "@entities/news/model/newsSlice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { NewsCard } from "@entities/news/ui/NewsCard";
import { Spin, Alert } from "antd";

export const NewsList = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, hasMore } = useAppSelector(
    (state) => state.news
  );

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNews());
    }
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      dispatch(fetchNews());
    }
  }, [inView]);

  if (error)
    return <Alert message="Ошибка" description={error} type="error" showIcon />;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      {items.map((post) => (
        <NewsCard key={post.id} post={post} />
      ))}

      {isLoading && (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Spin />
        </div>
      )}

      <div ref={ref} />
    </div>
  );
};
