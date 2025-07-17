<script lang="ts">
import "@/app.css";

const { children } = $props();
</script>

<div class="flex h-screen bg-slate-50 text-gray-800
          dark:bg-gray-900 dark:text-gray-200">
  <!-- Sidebar -->
  <aside class="flex-shrink-0 w-64 bg-white border-r
                dark:bg-gray-800 dark:text-gray-200">
    <div class="flex items-center justify-center
                h-16 font-bold text-xl border-b
                dark:bg-gray-700 dark:text-gray-200">
      Admin
    </div>
    <nav class="p-4">
      <ul>
        <li>
          <a href="/static"
             class="block px-4 py-2 rounded-lg hover:bg-slate-100
                    dark:hover:bg-gray-700">
            HOME
          </a>
        </li>
        <li>
          <a href="/static"
             class="block px-4 py-2 rounded-lg hover:bg-slate-100
                    dark:hover:bg-gray-700">
            USER
          </a>
        </li>
      </ul>
    </nav>
  </aside>

  <div class="flex flex-col flex-1">
    <!--Header-->
    <header class="flex items-center
                   h-16 bg-white border-b px-8
                 dark:bg-gray-800 dark:text-gray-200">
      <h1 class="text-lg font-semibold">
        Dashboard
      </h1>
    </header>
    <main class="flex-1 p-8 overflow-y-auto">
      {@render children()}
    </main>
  </div>
<!--  <div class="flex flex-col flex-1">-->
<!--    &lt;!&ndash;Footer&ndash;&gt;-->
<!--    <footer>-->
<!--      <h1 class="text-lg font-semibold">-->
<!--        국립한밭대학교 무선통신소프트웨어연구실-->
<!--      </h1>-->
<!--    </footer>-->
<!--  </div>-->
</div>
