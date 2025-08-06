
import {writable} from "svelte/store";
import type {Post} from "$lib/types/post";

function generateFakePosts(count: number): Post[] {
    const fakePosts: Post[] = [];
    for (let i = 1; i <= count; i++) {
        fakePosts.push({
            id: i,
            title: `게시물 제목 ${i}`,
            author: `작성자 ${i}`,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
            content: `게시물 ${i}의 내용`
        });
    }
    return fakePosts;
}

const posts = writable<Post[]>(generateFakePosts(15));

export default posts;
