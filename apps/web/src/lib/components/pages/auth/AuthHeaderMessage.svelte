<script lang="ts">
  import { page } from '$app/state';

  let clientHeight = $state(60);

  const isLoginPage = $derived(page.url.pathname === '/auth/login');
</script>

<div
  class="duration-450 ease-out-quint relative transition-[height]"
  style:height={`${clientHeight}px`}
>
  {#if isLoginPage}
    <div bind:clientHeight class="text-muted-foreground absolute inset-x-0 top-0 text-sm">
      <p class="text-center">Guest account</p>
      <dl>
        <div class="flex justify-center space-x-1">
          <dt>email:</dt>
          <dd>email@add.com</dd>
        </div>
        <div class="flex justify-center space-x-1">
          <dt>pass:</dt>
          <dd>password0</dd>
        </div>
      </dl>
    </div>
  {:else}
    <div bind:clientHeight class="text-muted-foreground absolute inset-x-0 top-0 text-sm">
      <p class="text-center">
        You can register as a member<br />
        with an irresponsible email and password.
      </p>
      <p class="text-center">No email will be sent.</p>
    </div>
  {/if}
</div>
