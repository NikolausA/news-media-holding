import { Card, Tag, Typography } from "antd";
import type { NewsPost } from "@shared/types/news";

const { Paragraph, Title } = Typography;

interface Props {
  post: NewsPost;
}

export const NewsCard = ({ post }: Props) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Title level={4}>{post.title}</Title>

      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>

      <div style={{ marginTop: 8 }}>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <Paragraph style={{ marginTop: 8 }}>
        Реакции: {post.reactions.likes + post.reactions.dislikes}
      </Paragraph>
    </Card>
  );
};
