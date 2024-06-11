<script lang="ts">
  import { ROUTE } from '$lib/routes';
  import { userStore } from '$lib/features/user/userStore.svelte';
  import HeaderNavigationItems from './HeaderNavigationItems.svelte';
  import { buttonVariants } from '$lib/variants/buttonVariants';

  const navItems = $derived(
    [
      {
        label: 'Home',
        href: ROUTE.HOME,
      },
      {
        label: 'Admin',
        href: userStore.user ? ROUTE.ADMIN : ROUTE.ADMIN_LOGIN,
      },
    ].concat(userStore.user ? [{ label: 'Secret', href: ROUTE.SECRET }] : []),
  );
</script>

<header class="border-b border-slate-200 bg-slate-50 px-4 md:sticky md:top-0 md:z-20">
  <div
    class="relative mx-auto flex max-w-[1120px] flex-col items-center justify-center py-5 md:h-16 md:flex-row md:py-0"
  >
    <h1
      class="font-ui text-center text-[26px] font-bold leading-tight tracking-tighter lg:text-[32px]"
    >
      WebApp Template (web)
    </h1>
    <div
      class="absolute top-[134px] flex h-12 md:static md:top-0 md:mr-8 md:ml-auto md:h-full lg:absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2"
    >
      <HeaderNavigationItems {navItems} />
    </div>
    <div class="mt-5 md:mt-0 lg:ml-auto">
      <a
        class={buttonVariants({ primary: true })}
        href="https://github.com/usagizmo/webapp-template"
        target="_blank"
        rel="noopener noreferrer">GitHub</a
      >
    </div>
  </div>
</header>
