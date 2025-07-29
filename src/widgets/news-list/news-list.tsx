import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchNews, resetNews } from "@entities/news/model/newsSlice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { NewsCard } from "@entities/news/ui/NewsCard";
import { Row, Col, Card, Alert, Skeleton, Spin, notification } from "antd";
import { newsSelectors } from "@entities/news/model/selectors";

export const NewsList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(newsSelectors.items);
  const isLoading = useAppSelector(newsSelectors.isLoading);
  const error = useAppSelector(newsSelectors.error);
  const hasMore = useAppSelector(newsSelectors.hasMore);

  const contentWrapperStyles = {
    maxWidth: 800,
    margin: "0 auto",
  };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNews());
    }

    return () => {
      dispatch(resetNews());
    };
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      dispatch(fetchNews());
    }
  }, [inView]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Ошибка загрузки",
        description: error,
      });
    }
  }, [error]);

  const isFirstLoad = items.length === 0 && isLoading;
  if (isFirstLoad) {
    return (
      <Row justify="center" style={contentWrapperStyles}>
        <Col>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card style={{ marginBottom: 16 }} key={idx}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </Col>
      </Row>
    );
  }

  if (error)
    return <Alert message="Ошибка" description={error} type="error" showIcon />;

  return (
    <Row justify="center" style={contentWrapperStyles}>
      <Col span={24}>
        {items.map((post, idx) => (
          <NewsCard key={`${post.id}-${idx}`} post={post} />
        ))}

        {isLoading && (
          <div style={{ textAlign: "center", padding: 16 }}>
            <Spin />
          </div>
        )}

        <div ref={ref} />
      </Col>
    </Row>
  );
};
