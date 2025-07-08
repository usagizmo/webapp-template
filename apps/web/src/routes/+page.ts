import { commentStore } from '$lib/stores';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  // Wait for layout load to complete (ensuring supabaseStore is initialized)
  await parent();

  await commentStore.loadComments();
};
