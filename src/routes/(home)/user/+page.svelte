<script lang="ts">
    import { applyAction, enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import Modal from "$lib/components/ui/Modal.svelte";
    import type { User } from "$lib/types/user.ts";
    import type { ActionData, PageData } from "../../../../.svelte-kit/types/src/routes";

    let {
        data,
        form,
    }: {
        data: PageData;
        form: ActionData;
    } = $props();

    let newUserName: string = $state("");
    let newUserEmail: string = $state("");

    let showDeleteModal = $state(false);
    let userToDelete: User | null = $state(null);

    function openDeleteModal(user: User) {
        userToDelete = user;
        showDeleteModal = true;
    }

    function closeModal() {
        showDeleteModal = false;
        userToDelete = null;
    }
</script>

<div class="p-8">
  <h1 class="text-2xl font-bold mb-6">사용자 관리</h1>

  <!-- 사용자 추가 폼 -->
  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      return async ({ result }) => {
        await applyAction(result);
        if (result.type === 'success') {
          newUserName = "";
          newUserEmail = "";
          await invalidateAll();
        }
      };
    }}
    class="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-end gap-4"
  >
    <div>
      <label
        for="name"
        class="block text-sm font-medium"
      >이름</label>
      <input
        bind:value={newUserName}
        id="name"
        name="name"
        type="text"
        class="mt-1 block w-full border rounded-md p-2 dark:bg-gray-700"
      />
    </div>
    <div>
      <label
        for="email"
        class="block text-sm font-medium"
      >이메일</label>
      <input
        bind:value={newUserEmail}
        id="email"
        name="email"
        type="email"
        class="mt-1 block w-full border rounded-md p-2 dark:bg-gray-700"
      />
    </div>
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
    >추가
    </button>
  </form>

  {#if form?.success && form?.message}
    <div
      class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      { form.message }
    </div>
  {/if}

  <!-- 사용자 목록 테이블 -->
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
    <table class="w-full text-left">
      <thead class="bg-slate-100 dark:bg-slate-700">
      <tr>
        <th class="p-4">ID</th>
        <th class="p-4">이름</th>
        <th class="p-4">이메일</th>
        <th class="p-4">작업</th>
      </tr>
      </thead>
      <tbody>
      {#each data.users as user (user.id)}
        <tr class="border-b dark:border-gray-700">
          <td class="p-4">{user.id}</td>
          <td class="p-4 font-medium">{user.name}</td>
          <td class="p-4">{user.email}</td>
          <td class="p-4">
            <button
              onclick={() => openDeleteModal(user)}
              class="text-red-500 hover:underline"
            >삭제
            </button>
          </td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
</div>

<!-- 삭제 확인 모달 -->
{#if showDeleteModal && userToDelete}
  <Modal onclose={closeModal}>
    <h3 class="text-lg font-bold mb-4">삭제 확인</h3>
    <p>"<span class="font-semibold">{userToDelete.name}</span>" 사용자를 정말로 삭제하시겠습니까?</p>
    <div class="mt-6 flex justify-end gap-4">
      <button
        onclick={closeModal}
        class="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
      >취소
      </button>
      <form
        method="POST"
        action="?/delete"
        use:enhance={() => {
          closeModal();
          return async ({ result }) => {
            await applyAction(result);
            if (result.type === 'success') {
              await invalidateAll();
            }
          };
        }}
      >
        <input
          type="hidden"
          name="id"
          value={userToDelete.id}
        />
        <button
          type="submit"
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >삭제
        </button>
      </form>
    </div>
  </Modal>
{/if}
