<template>
    <div flex flex-row flex-wrap items-center justify-between p-2 class="nav mx-1 sm:mx-8">
        <div flex flex-row items-center>
            <h1 class="relative mt-6 text-3xl sm:text-5xl w-full sm:w-56" font-sans>
                {{ showSearch ? "Movies" : "Screenings" }}
            </h1>
            <div ml-12 flex flex-row>
                <nuxt-link class="bg-gray-100 rounded-sm hover:bg-red-300 p-2 text-md font-sans no-underline mx-2"
                    to="/">
                    Home
                </nuxt-link>
                <nuxt-link class="bg-gray-100 rounded-sm hover:bg-red-300 p-2 text-md font-sans no-underline mx-2"
                    to="/shows">Screenings</nuxt-link>
                <nuxt-link target="_blank"
                    class="border font-bold text-blue-500 rounded hover:bg-blue-100 hover:text-blue-800 p-2 text-md font-sans no-underline mx-2"
                    to="https://github.com/ilyafefelov/test-movies">
                    &#60;Code&#47;&#62;
                </nuxt-link>
            </div>
        </div>

        <Search v-if="showSearch" p-2 ref="searchEl"></Search>
    </div>
</template>
    
<script setup>
const searchEl = ref()
const showSearch = ref(true)
const rout = useRouter()

rout.currentRoute.value.path === "/" ? showSearch.value = true : showSearch.value = false

defineExpose({
    searchEl
})
</script>

