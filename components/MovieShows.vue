<template>
    <div>
        {{ movie.name }}
        <div bg-blue-200 m-1 p-1 flex flex-row flex-wrap items-center v-for="showDate in movie.shows"
            :key="showDate + movie.id">
            <div mx-4 font-bold>
                {{ showDate.showdate }}
            </div>

            <div flex flex-row flex-wrap>
                <div rounded bg-red-200 p-1 m-1 cursor-pointer hover:bg-red-300 v-for="times in showDate.daytime"
                    :key="showDate.daytime + movie.id + times.time"
                    @click="showPlaces(movie.id, showDate.showdate, times, movie.name)">
                    {{ times }}
                </div>
            </div>

            <div v-if="show[showDate.showdate]">
                places
                <div v-for="(item, i) in places" :key="item" bg-blue-200 m-1 ml-12 w-fit>
                    row: {{ item[0].row }}

                    <div flex flex-row>
                        <div @click="
                            bookSeat(
                                $event,
                                movie.id,
                                item[0].row,
                                seat,
                                item.showdate,
                                times
                            )
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
        </div>
        <BookModal v-show="showModal" @close-modal="showModal = false" :name="movie.name" :booked="booked" />
    </div>
</template>

<script setup>
const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

let showDataArr = {};

Object.values(props.movie.shows).forEach((show) => {
    showDataArr[show.showdate] = false;
});

const show = ref(showDataArr);
const places = ref();
const date = ref();
const time = ref();
const movieName = ref();
const showModal = ref(false);
const booked = ref();

async function showPlaces(id, dat, tim, nam) {
    const { data: seats } = await useFetch("/api/showPlaces", {
        params: {
            movie_id: id,
            daytime: tim,
            showdate: dat,
        },
    }).catch((err) => {
        console.log("error showplaces API:", err);
    });
    show.value[dat] = true;
    places.value = seats.value;
    date.value = dat;
    time.value = tim;
    movieName.value = nam;
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
    showModal.value = true;
    refreshNuxtData();
}
</script>

