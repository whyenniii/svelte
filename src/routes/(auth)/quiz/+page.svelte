<script lang="ts">
import Quiz from "$lib/components/ui/Quiz.svelte";

let name : string = $state("");
let nameLength: number = $derived(name.length);
let time : Date = new Date();

const timePromise = new Promise<string>((resolve) => {
    setTimeout(() => resolve(`현재 시간 : ${time}`), 2000);
});
</script>

<!-- 통계 : prop 테스트 -->
<div class="mt-6 p-6 bg-white rounded-lg shadow-md dark:db-gray-800">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
    <Quiz title="제목" minLength={2}/>
  </div>
</div>

<div class="mt-8 bg-white rounded-lg shadow-md dark:bg-gray-800 p-6">
  <h3 class="font-bold text-lg mb-4">
    <button class="px-4 py-2 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 active:scale-95 transition duration-200" onclick={() =>
    timePromise} > 데이터 로딩 </button>
  </h3>

  {#await timePromise}
    <p class="text-gray-500 animate-bounce">
      로딩 중...
    </p>
  {:then message}
    <p class="text-green-500 mb-4 font-semibold">
      {message}
    </p>
  {:catch error}
    <p class="text-red-500">
      오류가 발생했습니다. : {error.message}
    </p>
  {/await}
</div>

