<script lang="ts">
  type Props = {
      title: string;
      value: number | string;
      icon?: string;
  }

  let { title, value, icon = "😗", onclick}: Props = $props();
  $effect(() => {
      console.info(`[Effect] StatCard '${title}'의 값이 '${value}'로 업데이트`);
  });
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-5 flex items-center gap-4">
  <div class ="text-3xl bg-slate-100 dark:bg-gray-700 p-3 rounded-full">
    {icon}
  </div>
  <div >
    <h4 class="text-sm text-gray-500 dark:text-gray-400">
      {title}
    </h4>
    <p class="text-3xl font-bold">
      {value}
    </p>
  </div>
</div>
