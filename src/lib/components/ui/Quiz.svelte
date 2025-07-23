<script lang="ts">
    type Props = {
        title: string;
        minLength: number;
    }

    let name : string = $state("");
    let nameLength: number = $derived(name.length);
    let time : Date = new Date();

    const timePromise = new Promise<string>((resolve) => {
        setTimeout(() => resolve(`현재 시간 : ${time}`), 2000);
    });

    let {title, minLength}: Props = $props();
</script>

<div class="mt-8 p-6 bg-white rounded-lg shadow-md dark:db-gray-800">
  <h3 class="font-bold text-lg mb-4">
    사용자 프로필 (Rune Test)
  </h3>

  <!-- 이름 -->
  <div>
    <label for="Name" class="pr-2"> 이름 </label>
    <input id="name" bind:value={name}
           class="border rounded px-2 py-1 dark:bg-gray-700"/>
    <br/>
    <br/>
    <label for="Length" class="pr-2"> 이름의 길이 </label>
    <input id="nameLength" bind:value={nameLength}
           class="border rounded px-2 py-1 dark:bg-gray-700"/>
  </div>
</div>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center gap-4">
  <div>
    <h4 class="text-lg dark:text-gray-400">
      {title}
    </h4>
      <h4 class="text-lg dark:text-gray-400">
      {#if name.length >= minLength}
        안녕하세요 {name}님! 🤗
      {:else}
        이름을 {minLength}글자 이상 입력해주세요.
      {/if}
    </h4>
  </div>
</div>
