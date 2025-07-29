import { Card, Tag, Typography, Space, Grid } from "antd";
import type { NewsPost } from "@shared/types/news";
import { useAppDispatch } from "@shared/hooks/redux";
import { likePost, dislikePost } from "@entities/news/model/newsSlice";

const { Paragraph } = Typography;

interface Props {
  post: NewsPost;
}

export const NewsCard = ({ post }: Props) => {
  const dispatch = useAppDispatch();
  const screens = Grid.useBreakpoint();

  const handleLike = () => dispatch(likePost(post.id));
  const handleDislike = () => dispatch(dislikePost(post.id));

  return (
    <Card
      title={post.title}
      styles={{
        body: {
          paddingBottom: screens.xs ? 6 : 8,
        },
      }}
      variant="borderless"
      style={{
        width: "100%",
        marginBottom: screens.xs ? 12 : 16,
      }}
      headStyle={{
        fontSize: screens.xs ? 16 : 18,
      }}
    >
      <Paragraph
        ellipsis={{ rows: 3 }}
        style={{ fontSize: screens.xs ? 12 : 14 }}
      >
        {post.body}
      </Paragraph>

      <Space
        wrap
        size={[screens.xs ? 4 : 8, screens.xs ? 4 : 8]}
        style={{ marginBottom: screens.xs ? 4 : 8 }}
      >
        {post.tags.map((tag) => (
          <Tag key={tag} style={{ cursor: "pointer" }}>
            {tag}
          </Tag>
        ))}
      </Space>

      <Space style={{ marginTop: screens.xs ? 4 : 8 }}>
        <span
          onClick={handleLike}
          style={{ fontSize: screens.xs ? 10 : 12, cursor: "pointer" }}
          title="Like"
        >
          ❤️ {post.reactions.likes}
        </span>
        <span
          onClick={handleDislike}
          style={{ fontSize: screens.xs ? 10 : 12, cursor: "pointer" }}
          title="Dislike"
        >
          👎 {post.reactions.dislikes}
        </span>
      </Space>
    </Card>
  );
};
