import { Card, Tag, Typography } from "antd";
import type { NewsPost } from "@shared/types/news";

const { Paragraph } = Typography;

interface Props {
  post: NewsPost;
}

export const NewsCard = ({ post }: Props) => {
  return (
    <Card
      title={post.title}
      style={{ marginBottom: 16, borderRadius: 8 }}
      bodyStyle={{ paddingBottom: 8 }}
    >
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}
      >
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div
        style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}
      >
        <span style={{ fontSize: "0.75rem", cursor: "pointer" }} title="Like">
          ❤️ {post.reactions.likes}
        </span>
        <span
          style={{ fontSize: "0.75rem", cursor: "pointer" }}
          title="Dislike"
        >
          👎 {post.reactions.dislikes}
        </span>
      </div>
    </Card>
  );
};
