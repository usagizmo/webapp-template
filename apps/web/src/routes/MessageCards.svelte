<script lang="ts">
  import { fade } from 'svelte/transition';
  import { LinkButton, CircleCheckIcon, CircleCloseIcon } from 'ui';

  let hoveredId = '';

  const cards = [
    {
      id: '1',
      me: true,
      name: 'Guest 1',
      date: new Date(),
      message:
        'Only browsing has been implemented yet. Eventually I will allow guest users to write.Only browsing has been implemented yet. Eventually I will allow guest users to write.',
      image: 'https://image.url',
    },
    {
      id: '2',
      name: 'Quest',
      date: new Date(),
      message: 'This is second comment',
    },
    {
      id: '3',
      me: true,
      name: 'Guest 1',
      date: new Date(),
      message: 'This is first comment',
    },
    {
      id: '4',
      name: 'Quest',
      date: new Date(),
      message: 'This is first comment',
    },
  ];

  $: format = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };
</script>

<div class="divide-y divide-slate-200">
  {#each cards as { id, name, me, date, message, image }}
    <div
      class="py-2.5"
      on:mouseenter={() => (hoveredId = id)}
      on:mouseleave={() => (hoveredId = '')}
    >
      <div class="relative">
        <div class="flex items-center">
          <p class="font-bold">{name}</p>
          {#if me}
            <figure class="ml-0.5">
              <CircleCheckIcon />
            </figure>
          {/if}
          <p class="ml-2 text-sm font-medium text-zinc-500">{format(date)}</p>
        </div>
        <div class="mt-0.5 flex">
          <p>{message}</p>
          {#if image}
            <div class="relative ml-2.5 flex-shrink-0">
              <figure class=" h-[120px] w-[200px] overflow-hidden rounded-md bg-[#d9d9d9]">
                <!-- <img /> -->
              </figure>
              {#if me && hoveredId === id}
                <button class="absolute right-[-8px] top-[-8px]" transition:fade={{ duration: 75 }}>
                  <CircleCloseIcon />
                </button>
              {/if}
            </div>
          {/if}
        </div>

        {#if me && hoveredId === id}
          <div class="absolute right-0 bottom-0" transition:fade={{ duration: 75 }}>
            <LinkButton href="#" warn>Delete</LinkButton>
            <LinkButton href="#">Edit</LinkButton>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
