<script lang="ts">
  import { getContext } from 'svelte';
  import { LinkButton, Input } from 'ui';
  import { key, type AdminInputs } from '../inputs';

  const { getInputs } = getContext<{
    getInputs: () => AdminInputs;
  }>(key);
  const inputs = getInputs();
</script>

<form action="">
  <div class="space-y-3">
    <Input
      label="Display Name"
      type="text"
      bind:value={inputs.displayName}
      error="Display Name is required."
    />
    <Input label="Email" type="email" bind:value={inputs.email} error="E-mail is required." />
    <Input
      label="Password"
      type="password"
      bind:value={inputs.password}
      error="Password is required."
    />
  </div>

  <div class="mt-5 flex justify-center">
    <LinkButton href="#" primary>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="h-4 w-4"
      >
        <path
          fill-rule="evenodd"
          d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
          clip-rule="evenodd"
        />
      </svg>
      <span>Sign up</span>
    </LinkButton>
  </div>
</form>
