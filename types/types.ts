export type Posts = {
  data: Post[];
};

export type Post = {
  id: string;
  attributes: {
    title: string;
    auth_text: string;
    user?: {
      data: {
        id: string;
        attributes: { username: string; email: string };
      };
    };
    createdAt?: string;
  };
};
