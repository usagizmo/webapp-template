<script lang="ts">
  import LinkButton from '$lib/features/ui/buttons/LinkButton.svelte';
  import NavigationItems from './NavigationItems.svelte';

  const items = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Admin',
      href: '/admin',
    },
    {
      label: 'Secret',
      href: '/secret',
    },
  ];
</script>

<header class="border-b border-[#e2e8f0] bg-slate-50 md:sticky md:top-0 md:z-20">
  <div
    class="relative mx-auto flex max-w-[1152px] flex-col items-center justify-center py-5 px-4 md:h-16 md:flex-row md:py-0"
  >
    <h1 class="text-center text-[26px] font-bold leading-tight tracking-tighter lg:text-[32px]">
      WebApp Template (web)
    </h1>
    <div
      class="absolute top-[134px] flex h-12 md:static md:top-0 md:ml-auto md:mr-8 md:h-full lg:absolute lg:inset-y-0 lg:left-1/2 lg:-translate-x-1/2"
    >
      <NavigationItems {items} />
    </div>
    <div class="mt-5 md:mt-0 lg:ml-auto">
      <LinkButton href="https://github.com/usagizmo/webapp-template" primary blank
        >GitHub</LinkButton
      >
    </div>
  </div>
</header>

<slot />
