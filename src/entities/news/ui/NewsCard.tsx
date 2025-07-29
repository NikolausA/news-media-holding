import { Card, Tag, Space, Typography } from "antd";
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
      styles={{ body: { paddingBottom: 8 } }}
      variant="borderless"
    >
      <Paragraph ellipsis={{ rows: 3 }}>{post.body}</Paragraph>

      <Space wrap size={[8, 8]}>
        {post.tags.map((tag) => (
          <Tag key={tag} style={{ cursor: "pointer" }}>
            {tag}
          </Tag>
        ))}
      </Space>

      <Space style={{ marginTop: 8 }}>
        <span
          onClick={handleLike}
          style={{ fontSize: 12, cursor: "pointer" }}
          title="Like"
        >
          ❤️ {post.reactions.likes}
        </span>
        <span
          onClick={handleDislike}
          style={{ fontSize: 12, cursor: "pointer" }}
          title="Dislike"
        >
          👎 {post.reactions.dislikes}
        </span>
      </Space>
    </Card>
  );
};
