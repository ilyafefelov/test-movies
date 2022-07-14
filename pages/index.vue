<template>
    <div>
        <Nav ref="nav"></Nav>

        <!-- results:{{ nav?.searchEl.searchResult }} -->
        <div v-if="nav?.searchEl.searchResult" font-sans flex flex-row flex-wrap justify-center
            class="movie-cont bg-red-600 p-4">
            <div v-if="nav?.searchEl.searchResult.length < 1"> Can't find a movie with this criteria! ;(</div>
            <div v-for="item in nav?.searchEl.searchResult" :key="data.id" class="movie h-fit max-h-200 bg-white bg-op-90 p-0 pb-4  m-2 w-full md:w-3/5 lg:w-4/12 xl:w-4/12 flex flex-col rounded-md
            drop-shadow-md hover:drop-shadow-xl transition duration-200 easy-in hover:-translate-y-2">

                <nuxt-link :to="{ path: `/movies/${item.id}` }">
                    <img :src="item.image" alt="movie poster" w-full m-x-auto mt-0 h-100
                        class="bg-cover object-cover bg-center rounded-t-sm" /><br />
                </nuxt-link>
                <nuxt-link text-purple-900 no-underline :to="{ path: `/movies/${item.id}` }">
                    <h2 font-mono px-2 m-0 v-html="item.name"></h2>
                </nuxt-link>

                <!-- {{ item.id }} -->

                <span m-2> {{ item.genres[Object.keys(item.genres)[0]] }} <br /> </span>
                <div class="p-2 flex items-start justify-start overflow-y-auto rounded-b-sm" v-html="item.description">
                </div>
                <!-- <details class="p-4 mt-2 text-sm hover:bg-red-300 cursor-pointer bg-red-200 rounded-b-md">
                <summary>Більше Про Кино</summary>
                <div v-html="item.additional" class="h-42 overflow-y-scroll text-base prose prose-truegray xl:text-xl">
                </div>
            </details> -->
            </div>

        </div>
        <div v-if="!nav?.searchEl.searchResult" font-sans flex flex-row flex-wrap justify-center
            class="movie-cont bg-red-600 p-4">

            <div v-for="item in data" :key="data.id" class="movie h-fit max-h-200 bg-white  bg-op-90 p-0  pb-4 m-2 w-full md:w-3/5 lg:w-4/12 flex flex-col rounded-md
            drop-shadow-md hover:drop-shadow-xl transition duration-200 easy-in hover:-translate-y-2">

                <nuxt-link :to="{ path: `/movies/${item.id}` }">
                    <img :src="item.image" alt="movie poster" w-full m-x-auto mt-0 h-100
                        class="bg-cover object-cover bg-center rounded-t-sm" /><br />
                </nuxt-link>
                <nuxt-link text-purple-900 no-underline :to="{ path: `/movies/${item.id}` }">
                    <h2 font-mono px-2 m-0 v-html="item.name"></h2>
                </nuxt-link>

                <!-- {{ item.id }} -->

                <span m-2> {{ item.genres[Object.keys(item.genres)[0]] }} <br /> </span>
                <div class="p-2 flex items-start justify-start overflow-y-auto rounded-b-sm" v-html="item.description">
                </div>
                <!-- <details class="p-4 mt-2 text-sm hover:bg-red-300 cursor-pointer bg-red-200 rounded-b-md">
                <summary>Більше Про Кино</summary>
                <div v-html="item.additional" class="h-42 overflow-y-scroll text-base prose prose-truegray xl:text-xl">
                </div>
            </details> -->
            </div>
        </div>



    </div>


    <!-- </div> -->
</template>

<script setup>

const nav = ref()


const { data } = await useFetch("/api/movies").catch((err) => {
    console.log("error API:", err);
});



</script>

<style lang="stylus" scoped>
.movie{
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 268px;
    img{
        width: 100%;
    }

    /* SOLUTION */
    /* flex: 1; */

}
</style>
