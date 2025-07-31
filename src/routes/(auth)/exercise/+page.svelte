<script lang="ts">
    let users = $state([
        {
            id: 1,
            name: "홍길동",
            email: "hong@example.com",
            active: true,
            createdAt: new Date("2024-01-15"),
        },
        {
            id: 2,
            name: "이순신",
            email: "lee@example.com",
            active: false,
            createdAt: new Date("2024-01-20"),
        },
    ]);

    let newUserName = $state("");
    let newUserEmail = $state("");
    let newUserActive = $state(true);

    // 필터 및 정렬 상태
    let filterActive = $state("all"); // 'all', 'active', 'inactive'
    let sortBy = $state("name"); // 'name', 'email', 'date'

    // 파생 상태 - 필터링 및 정렬된 사용자 목록
    let filteredAndSortedUsers = $derived(
        (() => {
            let result = [...users];

            // 필터링
            if (filterActive === "active") {
                result = result.filter((user) => user.active);
            } else if (filterActive === "inactive") {
                result = result.filter((user) => !user.active);
            }

            // 정렬
            result.sort((a, b) => {
                if (sortBy === "name") {
                  return a.name.localeCompare(b.name);
                } else if (sortBy === "email") {
                  return a.email.localeCompare(b.email);
                } else {
                    return (
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                }
            });

            return result;
        })(),
    );

    // 파생 상태 - 통계 정보
    let stats = $derived(
        (() => {
            const total = users.length;
            const active = users.filter((user) => user.active).length;
            return { total, active, inactive: total - active };
        })(),
    );

    // 사용자 추가 함수
    function addUser(event) {
        event.preventDefault();

        if (newUserName && newUserEmail) {
            users.push({
                id: Date.now(),
                name: newUserName,
                email: newUserEmail,
                active: newUserActive,
                createdAt: new Date(),
            });

            // 폼 리셋
            newUserName = "";
            newUserEmail = "";
            newUserActive = true;
        }
    }

    function toggleUserStatus(id) {
        const user = users.find((user) => user.id === id);
        if (user) {
            user.active = !user.active;
        }
    }

    function deleteUser(id) {
        users = users.filter((user) => user.id !== id);
    }
</script>

<div class="p-8 max-w-6xl mx-auto">
  <h1 class="text-2xl font-bold mb-6 text-gray-800">4단계: 고급 상태 관리와 상호작용</h1>

  <!-- 통계 카드 -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="p-4 bg-blue-50 rounded-lg">
      <div class="text-2xl font-bold text-blue-800">
        {stats.total}
      </div>
      <div class="text-blue-600">총 사용자</div>
    </div>
    <div class="p-4 bg-green-50 rounded-lg">
      <div class="text-2xl font-bold text-green-800">
        {stats.active}
      </div>
      <div class="text-green-600">활성 사용자</div>
    </div>
    <div class="p-4 bg-red-50 rounded-lg">
      <div class="text-2xl font-bold text-red-800">
        {stats.inactive}
      </div>
      <div class="text-red-600">비활성 사용자</div>
    </div>
  </div>

  <!-- 사용자 추가 폼 -->
  <form class="mb-8 p-6 bg-white rounded-lg shadow-md" onsubmit={addUser}>
    <h2 class="text-xl font-semibold mb-4">사용자 추가</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">
          이름
        </label>
        <input
          type="text"
          bind:value={newUserName}
          class="w-full border rounded-md p-2"
          placeholder="이름 입력"
          required
        />
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">이메일</label>
        <input
          type="email"
          bind:value={newUserEmail}
          class="w-full border rounded-md p-2"
          placeholder="이메일 입력"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">초기 상태</label>
        <select class="w-full border rounded-md p-2"
                bind:value={newUserActive}
        >
          <option value={true}>활성</option>
          <option value={false}>비활성</option>
        </select>
      </div>
    </div>
    <button
      type="submit"
      class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
    >
      사용자 추가
    </button>
  </form>

  <!-- 필터 및 정렬 컨트롤 -->
  <div class="mb-6 p-4 bg-white rounded-lg shadow-md">
    <div class="flex flex-wrap gap-4 items-center">
      <div>
        <label class="block text-sm font-medium mb-1">
          상태 필터
          <select
            class="border rounded-md p-2"
            bind:value={filterActive}
          >
            <option value="all">모든 사용자</option>
            <option value="active">활성 사용자</option>
            <option value="inactive">비활성 사용자</option>
          </select>
        </label>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">
          정렬 기준
          <select
            class="border rounded-md p-2"
            bind:value={sortBy}
          >
            <option value="name">이름순</option>
            <option value="email">이메일순</option>
            <option value="date">등록일순</option>
          </select>
        </label>
      </div>
    </div>
  </div>

  <!-- 사용자 목록 -->
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <h2 class="text-xl font-semibold p-4 bg-gray-50">
      사용자 목록 ({filteredAndSortedUsers.length}명)
    </h2>
    <div class="divide-y">
      {#each filteredAndSortedUsers as user (user.id)}
        <div class="p-4 flex justify-between items-center">
          <div>
            <div class="font-medium">{user.name}</div>
            <div class="text-gray-600 text-sm">{user.email}</div>
            <div class="text-gray-500 text-xs">
              등록일: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <span class={`px-2 py-1 text-xs rounded ${user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {user.active ? "활성" : "비활성"}
            </span>
            <button
              onclick={() => toggleUserStatus(user.id)}
              class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
            >
              토글
            </button>
            <button
              onclick={() => deleteUser(user.id)}
              class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
            >
              삭제
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

</div>
