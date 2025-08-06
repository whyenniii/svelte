let theme = $state("light");

if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
        theme = saved;
    }
}
export function getTheme() {
    return theme;
}

export function toggleTheme() {
    theme = theme == "light"? "dark" : "light";

    if (typeof window !== "undefined") {
        localStorage.setItem(theme, theme);
    }
}
