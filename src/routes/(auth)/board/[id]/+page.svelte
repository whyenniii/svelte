<script lang="ts">
	import { page } from '$app/stores';
	import postsStore from '$lib/stores/posts';
	import type { Post } from '$lib/types/post';

	let post: Post | undefined;

	const postId = Number($page.params.id);
	postsStore.subscribe(posts => {
		post = posts.find(p => p.id === postId);
	});
</script>

<div class="container mx-auto p-4">
	{#if post}
		<div class="bg-white shadow-md rounded-lg p-6">
			<h1 class="text-3xl font-bold mb-2">{post.title}</h1>
			<div class="text-gray-600 mb-4">
				<span>작성자: {post.author}</span>
				<span class="ml-4">작성일: {post.createdAt}</span>
			</div>
			<hr class="my-4"/>
			<div class="prose max-w-none">
				<p>{post.content}</p>
			</div>
		</div>
	{:else}
		<p class="text-center text-red-500">게시물을 찾을 수 없습니다.</p>
	{/if}

	<div class="mt-6 text-center">
		<a href="/board" class="text-blue-500 hover:underline">목록으로 돌아가기</a>
	</div>
</div>
