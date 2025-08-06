<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
  children: Snippet;
  onclose: () => void;
};
let { children, onclose }: Props = $props();

let dialog: HTMLDivElement;

// Escape 키를 눌렀을 때 모달을 닫는 함수
function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
        onclose();
    }
}

// 모달 배경을 클릭했을 때만 모달을 닫는 함수
function handleBackdropClick(event: MouseEvent) {
    if (event.currentTarget === event.target) {
        onclose();
    }
}

// 모달이 마운트될 때 다이얼로그에 포커스를 줍니다.
$effect(() => {
  if (dialog) {
      dialog.focus();
  }
});
</script>

<!-- 모달 배경 -->
<div
  class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
  role="dialog"
  aria-modal="true"
  tabindex="-1"
  bind:this={dialog}
>
  <!-- 모달 콘텐츠 -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
    role="document"
  >
    {@render children()}
  </div>
</div>
