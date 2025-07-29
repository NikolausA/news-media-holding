import {
  Row,
  Col,
  Card,
  Skeleton,
  Spin,
  Alert,
  notification,
  Grid,
} from "antd";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { fetchNews, resetNews } from "@entities/news/model/newsSlice";
import { newsSelectors } from "@entities/news/model/selectors";
import { NewsCard } from "@entities/news/ui/NewsCard";

export const NewsList = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(newsSelectors.items);
  const isLoading = useAppSelector(newsSelectors.isLoading);
  const error = useAppSelector(newsSelectors.error);
  const hasMore = useAppSelector(newsSelectors.hasMore);
  const { ref, inView } = useInView({ threshold: 1 });
  const screens = Grid.useBreakpoint();

  const contentWrapperStyles = {
    maxWidth: 800,
    margin: "0 auto",
    padding: screens.xs ? "0 12px" : "0 16px", // паддинг по краям для мобильных
  };

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
        <Col span={24}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Card style={{ marginBottom: screens.xs ? 12 : 16 }} key={idx}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </Col>
      </Row>
    );
  }

  if (error) {
    return (
      <Alert
        message="Ошибка"
        description={error}
        type="error"
        showIcon
        style={screens.xs ? { margin: "0 12px" } : undefined}
      />
    );
  }

  return (
    <Row justify="center" style={contentWrapperStyles}>
      <Col span={24}>
        {items.map((post, idx) => (
          <div
            key={`${post.id}-${idx}`}
            style={{ marginBottom: screens.xs ? 12 : 16 }}
          >
            <NewsCard post={post} />
          </div>
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
