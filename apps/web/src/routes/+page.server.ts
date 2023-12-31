import { nhost } from '$lib/nhost';
import type { PageServerLoad } from './$types';

type Comment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  fileId: string | null;
  user: {
    id: string;
    displayName: string;
  };
};

const getCommentsQuery = `
  query {
    comments(order_by: { createdAt: desc }) {
      id
      createdAt
      updatedAt
      text
      fileId
      user {
        id
        displayName
      }
    }
  }
`;

export const load: PageServerLoad = async () => {
  const { data } = await nhost.graphql.request<{ comments: Comment[] }>(getCommentsQuery);
  return { comments: data?.comments ?? [] };
};
