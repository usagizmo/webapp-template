<script lang="ts">
  import ModeSwitcherButton from '@repo/shared/components/ModeSwitcherButton.svelte';
  import { Button } from '@repo/shared/components/ui/button';

  import { userStore } from '$lib/stores';

  import HeaderNavigationItems from './HeaderNavigationItems.svelte';

  const navItems = $derived(
    [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: userStore.user ? 'Dashboard' : 'Login',
        href: userStore.user ? '/dashboard' : '/auth/login',
      },
    ].concat(userStore.user ? [{ label: 'Secret', href: '/secret' }] : []),
  );
</script>

<header class="bg-sidebar border-b px-4 md:sticky md:top-0 md:z-20">
  <div
    class="relative mx-auto flex max-w-[1120px] flex-col items-center justify-center py-5 md:h-16 md:flex-row md:py-0"
  >
    <h1 class="text-center text-2xl font-bold leading-tight tracking-tighter lg:text-3xl">
      WebApp Template (web)
    </h1>
    <div
      class="absolute top-[134px] flex h-12 md:top-0 md:ml-auto md:h-full md:max-lg:static md:max-lg:mr-8 lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2"
    >
      <HeaderNavigationItems {navItems} />
    </div>
    <div class="mt-5 flex items-center gap-2 md:mt-0 lg:ml-auto">
      <ModeSwitcherButton />
      <Button
        href="https://github.com/usagizmo/webapp-template"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </Button>
    </div>
  </div>
</header>
