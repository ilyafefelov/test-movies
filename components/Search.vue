<template>
    <div class="sm:ml-3 w-full sm:w-fit flex flex-wrap flex-column sm:flex-row items-center">
        <div h-6 font-mono my-2 mr-3 flex>
            <span w-15> Search: </span>
            <input w-36 v-model="name" ml-2 type="text" />
        </div>

        <div h-6 font-mono mr-3 flex>
            <span class="w-[3.1em]"> Genre: </span>
            <select w-24 ml-2 v-model="genres" name="genres" id="">
                <option value="null">ALL</option>
                <option value="0">ACTION</option>
                <option value="1">ADVENTURE</option>
                <option value="2">COMEDY</option>
                <option value="3">DRAMA</option>
                <option value="4">HORROR</option>
                <option value="5">WESTERN</option>
            </select>
        </div>
        <div h-6 font-mono flex>
            <span w-5> id: </span>
            <input w-24 v-model="movieID" ml-2 type="text" />
        </div>
    </div>
</template>

<script setup>
const name = ref();
const movieID = ref();
const genres = ref();
const search = ref();
const searchResult = ref();

watch(
    [name, genres, movieID],
    async ([newA, newB, newC], [prevA, prevB, prevC]) => {
        const { data } = await useFetch("/api/movies", {
            params: {
                name: newA ? newA : null,
                genres: newB ? newB : null,
                movie_id: newC ? newC : null,
            },
        });
        search.value = data;
        searchResult.value = search.value.value;
        // if (newA == ('' || undefined) && newB == ('null' || undefined)) searchResult.value = null;
        if ((newA == '' || newA == undefined) && (newB == 'null' || newB == undefined) && (newC == '' || newC == undefined)) searchResult.value = null;

    }
);

defineExpose({ searchResult });
</script>

<style lang="stylus" scoped></style>
