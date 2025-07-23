<script lang="ts">
import StatCard from "$lib/components/ui/StatCard.svelte";

let last : string = $state("임");
let first : string = $state("예은");
let full = $derived(`${first} ${last} `);

let activeUsers = $state(120);
let totalUsers = $state(220);
let currentUsers = $state(0);

type Activity =  {
    id : number;
    user: string;
    action: string;
}

let activities: Array<Activity> = $state([
    {
      id: 1,
      user: "Yeeun Lim",
      action: "Updated Profile."
    },
    {
        id:2,
        user: "Boyeon Shin",
        action: "Create new document."
    },
    ]);

const activityPromise = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Completed load logs."), 2000);
});
</script>

<h3 class="text-8xl">환영합니다. 🤗 </h3>
<p class="text-blue-400"> Admin Dashboard </p>

<div class="mt-8 p-6 bg-white rounded-lg shadow-md dark:db-gray-800">
  <h3 class="font-bold text-lg mb-4">
    사용자 프로필 (Rune Test)
  </h3>

  <!-- 이름 -->
  <div>
    <label for="firstName" class="pr-2"> First Name </label>
    <input id="firstName" bind:value={first}
        class="border rounded px-2 py-1 dark:bg-gray-700"/>

    <label for="lastName" class="pr-2"> Last Name </label>
    <input id="lastName" bind:value={last}
          class="border rounded px-2 py-1 dark:bg-gray-700"/>

    <p class="mt-4">
      Full Name: <span class="font-bold text-blue-500">
      { full }
    </span>
    </p>
  </div>
</div>

<!-- 통계 : prop 테스트 -->
<div class="mt-6 p-6 bg-white rounded-lg shadow-md dark:db-gray-800">
  <button class="px-4 py-2 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 active:scale-95 transition duration-200" onclick={() => currentUsers++} > 현재 사용자 추가 </button>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
    <StatCard title="총 방문자" value={totalUsers} icon="👥"/>
    <StatCard title="활성 사용자" value={activeUsers} icon="🤩"/>
    <StatCard title="현재 사용자" value={currentUsers} icon="🤗"/>
  </div>
</div>


<!-- 활동 로그 -->
<div class="mt-8 bg-white rounded-lg shadow-md dark:bg-gray-800 p-6">
  <h3 class="font-bold text-lg mb-4">
    최근 활동
  </h3>

  {#await activityPromise}
    <p class="text-gray-500 animate-bounce">
      불러오는 중...
    </p>
  {:then message}
    <p class="text-green-500 mb-4 font-semibold">
      {message}
    </p>
    <ul>
      {#each activities as activity (activity.id)}
        <li class="py-2 border-b dark:border-gray-700 last:border-b-0">
          <span class="font-semibold">
            {activity.user}
          </span>
          님이 {activity.action}.
        </li>
      {:else}
        <p>표시할 활동이 없습니다.</p>
      {/each}
    </ul>
  {:catch error}
    <p class="text-red-500">
      오류가 발생했습니다. : {error.message}
    </p>
  {/await}
</div>
