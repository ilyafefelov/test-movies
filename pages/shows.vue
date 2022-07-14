<template>
    <div>
        <Nav></Nav>
        <div pt-2 v-for="(movie, id, i) in data" :key="id">
            <MovieShows :movie="movie"></MovieShows>

            <!-- <BookModal v-show="showModal" @close-modal="showModal = false" :name="movieName" :booked="booked" /> -->
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    pageTransition: {
        name: "slide-left",
        mode: "in-out", // default is out-in
        appear: true, // default is false
    },
});

const { data } = await useFetch("/api/movieShows").catch((err) => {
    console.log("error API:", err);
});


</script>

<style lang="stylus" scoped></style>
