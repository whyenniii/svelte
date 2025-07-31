import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

type Theme = "light" | "dark";

export const theme: Writable<Theme> = writable("light");

export function toggleTheme() {
    theme.update((current) => {
        return current == "light" ? "dark" : "light";
    })
}
