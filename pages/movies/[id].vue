<template>
    <div class="font-sans flex flex-row min-h-[100vh] bg-red-500 p-3">
        <div v-for="item in data" :key="data.id"
            class="movie h-fit max-h-300 bg-slate-300 p-0 m-2 w-full min-w-[250px] max-w-[300px] sm:w-2/5 md:w-3/12 flex flex-col rounded-md drop-shadow-md">
            <nuxt-link text-slate-50 h-fit to="/">
                <div
                    class="rounded bg-black text-slate-50 h-fit p-2 w-auto mb-3 hover:bg-red-900 hover:-translate-x-2 transition-all duration-200 easy-out mt-2">
                    back to all movies
                </div>
            </nuxt-link>
            <img :src="item.image" alt="movie poster" w-full m-x-auto mt-0 h-100
                class="bg-cover bg-center rounded-t-md" /><br />
            <!-- {{ item.id }} -->
            <h2 font-mono px-2 m-0 v-html="item.name"></h2>

            <span m-2> {{ item.genres[Object.keys(item.genres)[0]] }} <br /> </span>
            <div class="p-2 flex items-start justify-start overflow-y-auto rounded-b-md" v-html="item.description">
            </div>
        </div>
        <div>
            <div v-for="item in shows[pageID].shows" :key="item.showdate" class="flex flex-row p-2 m-2 items-center">
                <span mr-6> {{ item.showdate }}: </span>
                <div v-for="time in item.daytime" :key="time" @click="showPlaces(pageID, item.showdate, time)"
                    class="mr-2 p-1 border hover:bg-yellow-300 cursor-pointer">
                    {{ time }}
                </div>
            </div>

            <div>
                <div v-for="(item, i) in places" :key="item" bg-blue-200 m-1 ml-12 w-fit>
                    row: {{ item[0].row }}

                    <div flex flex-row>
                        <div @click="
                            bookSeat($event, pageID, item[0].row, seat, item.showdate, time)
                        " v-for="seat in item[1]" :class="{
    'bg-green-500': seat.is_free,
    'pointer-events-none': !seat.is_free,
}" :key="seat" class="flex flex-row text-xs items-center p-0.5 hover:bg-black hover:text-white cursor-pointer">
                            {{ seat.seat }}
                            <!-- {{ seat.is_free }} -->
                        </div>
                    </div>
                </div>
            </div>

            <div v-html="data[0].additional" class="movieInfo leading-3 xl:text-xl"></div>
        </div>
        <BookModal v-show="showModal" @close-modal="showModal = false" :name="data[0].name" :booked="booked" />
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



const places = ref([]);
const date = ref();
const time = ref();
const showModal = ref(false)
const booked = ref()

const pageID = useRoute().params.id;
const routeParams = useRoute().params;

const { data } = await useFetch("/api/movies", {
    params: { movie_id: pageID },
}).catch((err) => {
    console.log("error API:", err);
});

const { data: shows } = await useFetch("/api/movieShows", {
    params: {
        movie_id: pageID,
    },
}).catch((err) => {
    console.log("error API:", err);
});

async function showPlaces(id, dat, tim) {
    const { data: seats } = await useFetch("/api/showPlaces", {
        params: {
            movie_id: pageID,
            daytime: tim,
            showdate: dat,
        },
    }).catch((err) => {
        console.log("error showplaces API:", err);
    });
    places.value = seats.value;
    date.value = dat;
    time.value = tim;
}
async function bookSeat(e, pageID, row, seat) {
    e.target.classList.add("bg-red-900", "text-white", "pointer-events-none");
    e.target.setAttribute("disabled", "");
    const { data: booking } = await useFetch("/api/bookSeat", {
        method: "POST",
        body: {
            movie_id: pageID,
            row: row,
            seat: seat.seat,
            showdate: date.value,
            daytime: time.value,
        },
    }).catch((err) => {
        console.log("error showplaces API:", err);
    });
    console.log("BOOKED: ", booking.value);
    booked.value = booking.value;
    // alert(
    //     `
    //     You booked a ticket:
    //     row:${booking.value.row}, 
    //     seat:${booking.value.seat},
    //     on ${booking.value.showdate} at ${booking.value.daytime}
    //     `
    // );
    showModal.value = true;
    refreshNuxtData();
}
</script>

<style lang="stylus" scoped>
.movieInfo {
    // background: red;
    /deep/ ul{
        li {
            @apply flex flex-row items-center;
            p{
                // @apply text-red-500
            }
        }
    }
}

/deep/ .rating {
    .key {
    margin-left: 0;
    padding-left: 0;
}
    p{
        @apply text-gray-800 flex-row leading-4
    }
}
/deep/ .val {
    @apply flex flex-row items-center p-1 ml-2 leading-5;
}
</style>
