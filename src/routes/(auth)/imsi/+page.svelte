<script lang="ts">
    let name = $state("");
</script>

<div class="bg-white rounded-lg shadow-md p-8">
  <!-- 이름 입력 필드 -->
  <div class="mb-4">
    <label
      for="name"
      class="block mb-2 font-bold text-gray-700"
    > 이름을 입력하세요:</label
    >
    <input
      id="name"
      type="text"
      bind:value={name}
      placeholder="여기에 이름을 입력하세요"
      class="w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />

    {name}
  </div>
</div>
