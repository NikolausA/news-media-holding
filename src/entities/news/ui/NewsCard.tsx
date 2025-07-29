import { Card, Tag, Typography } from "antd";
import type { NewsPost } from "@shared/types/news";
import { useAppDispatch } from "@shared/hooks/redux";
import { likePost, dislikePost } from "@entities/news/model/newsSlice";

const { Paragraph } = Typography;

interface Props {
  post: NewsPost;
}

export const NewsCard = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  const handleLike = () => dispatch(likePost(post.id));
  const handleDislike = () => dispatch(dislikePost(post.id));

  return (
    <Card
      title={post.title}
      style={{ marginBottom: 16, borderRadius: 8 }}
      styles={{
        body: { paddingBottom: 8 },
      }}
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
        <span
          onClick={handleLike}
          style={{ fontSize: "0.75rem", cursor: "pointer" }}
          title="Like"
        >
          ❤️ {post.reactions.likes}
        </span>
        <span
          onClick={handleDislike}
          style={{ fontSize: "0.75rem", cursor: "pointer" }}
          title="Dislike"
        >
          👎 {post.reactions.dislikes}
        </span>
      </div>
    </Card>
  );
};
