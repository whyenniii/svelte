import { dev } from "$app/environment";
import type { User } from "$lib/types/user";
import type { Actions } from "./$types";

type AppDatabase = {
    users: User[];
}

declare global {
    var __db: AppDatabase | undefined;
}
const db = globalThis.__db ?? {
    users: [
        {
            id: 1,
            name: "홍길동",
            email: "hong@example.com",
            active: true,
            createdAt: new Date("2025-07-15"),
        },
        {
            id: 2,
            name: "이순신",
            email: "lee@example.com",
            active: false,
            createdAt: new Date("2025-07-20"),
        },
    ] as User[],
};

if (dev) {
    globalThis.__db = db;
}

export function load() {
    console.info(`서버의 load 함수 실행됨! (터미널에서 확인)`);
    return {
        users: db.users,
    };
}
export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        console.log("서버의 create 함수 실행됨! (터미널에서 확인)");
        console.log("전달된 데이터:", { name, email });

        if (!name || !email) {
            return {
                success: false,
                message: "이름과 이메일을 모두 입력해주세요.",
            };
        }

        db.users.push({
            id: db.users.length + 1,
            name,
            email,
            active: true,
            createdAt: new Date("2025-08-06"),
        });

        return {
            success: true,
            message: "사용자 추가 성공!",
        };
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get("id"));
        const index = db.users.findIndex((u: User) => u.id === id);

        if (index > -1) {
            db.users.splice(index, 1);
        }

        return {
            success: true,
            message: "사용자 삭제 성공!",
        };
    },
};
