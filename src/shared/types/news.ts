export interface NewsPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface NewsResponse {
  posts: NewsPost[];
  total: number;
  skip: number;
  limit: number;
}
