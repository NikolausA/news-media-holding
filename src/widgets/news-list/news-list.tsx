import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchNews, resetNews } from "@entities/news/model/newsSlice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { NewsCard } from "@entities/news/ui/NewsCard";
import { Alert, Card, notification, Skeleton, Spin } from "antd";

export const NewsList = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, error, hasMore } = useAppSelector(
    (state) => state.news
  );

  const { ref, inView } = useInView({
    threshold: 1,
  });

  // Первая загрузка
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNews());
    }

    return () => {
      dispatch(resetNews()); // если нужно сбрасывать при размонтировании
    };
  }, []);

  // Бесконечная прокрутка
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      dispatch(fetchNews());
    }
  }, [inView]);

  // Уведомление об ошибке
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка загрузки",
        description: error,
      });
    }
  }, [error]);

  // 👉 Показываем скелетон при первой загрузке
  const isFirstLoad = items.length === 0 && isLoading;
  if (isFirstLoad) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Card style={{ marginBottom: 16 }} key={idx}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Card>
        ))}
      </div>
    );
  }

  // 👉 Ошибка
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
