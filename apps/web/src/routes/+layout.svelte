<script lang="ts">
  import '../app.css';

  import Footer from './Footer.svelte';
  import HeaderNavigation from './HeaderNavigation.svelte';

  const navItems = [
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

<div class="flex h-full flex-col">
  <HeaderNavigation {navItems} />

  <div class="flex flex-1 flex-col">
    <main class="flex-1 px-4 pt-[68px] pb-16 md:pt-10">
      <slot />
    </main>

    <Footer />
  </div>
</div>
