<script lang="ts">
	import { goto } from '$app/navigation';
	import postsStore from '$lib/stores/posts';
	import type { Post } from '$lib/types/post';

	let currentPage = $state(1);
	let itemsPerPage = $state(10);

	const posts = $state($postsStore);

	const totalPages = $derived(Math.ceil(posts.length / itemsPerPage));

	const paginatedPosts = $derived.by<Post[]>(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return posts.slice(startIndex, endIndex);
	});

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function viewPost(postId: number) {
		goto(`/board/${postId}`);
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4 text-center">게시판</h1>

	<div class="overflow-x-auto shadow-md sm:rounded-lg">
		<table class="w-full text-sm text-left text-gray-500">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3 text-center">ID</th>
					<th scope="col" class="px-6 py-3">제목</th>
					<th scope="col" class="px-6 py-3 text-center">작성자</th>
					<th scope="col" class="px-6 py-3 text-center">작성일</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedPosts as post (post.id)}
					<tr class="bg-white border-b hover:bg-gray-50 cursor-pointer" onclick={() => viewPost(post.id)}>
						<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
							{post.id}
						</td>
						<td class="px-6 py-4">{post.title}</td>
						<td class="px-6 py-4 text-center">{post.author}</td>
						<td class="px-6 py-4 text-center">{post.createdAt}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="flex justify-center items-center mt-6">
		<button
			onclick={prevPage}
			disabled={currentPage === 1}
			class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			이전
		</button>
		<span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-200">
			{currentPage} / {totalPages}
		</span>
		<button
			onclick={nextPage}
			disabled={currentPage === totalPages}
			class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-r-lg border-0 border-l border-gray-700 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			다음
		</button>
	</div>
</div>
