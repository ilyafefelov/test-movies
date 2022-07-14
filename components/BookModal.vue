<template>
  <div class="modal-overlay bg-base-300 cursor-pointer overlay-auto" @click="$emit('close-modal')">
    <div class="flex-col modalForm cursor-default" @click.stop>


      <div bg-grey-200 flex flex-col items-start ml-5 mr-3 p-4>
        <div mb-4>

          You succesfully booked a ticket for <span font-semibold v-html="name"></span>
        </div>
        <span>
          row: {{ booked?.row }}

        </span>
        <span>
          seat: {{ booked?.seat }}

        </span>
        <span>
          date: {{ booked?.showdate }}

        </span>
        <span>
          time: {{ booked?.daytime }}

        </span>
        <span p-2 bg-grey-100 font-bold>
          Your booking code is:
          {{ booked?.ticketkey }}
        </span>
      </div>
      <div class="close bg-white hover:bg-red-300 justify-center items-center flex bg-opacity-50 w-auto h-full "
        @click="$emit('close-modal')">
        <h2 class="text-black cursor-pointer">
          Close
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: {
      type: String,

    },
    booked: {
      type: Array,

    },
  },
  methods: {},
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  overflow: auto;
  /* background-color: #570041fb; */
}

.modalForm {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.884);
  height: min-content;
  /* min-width: 700px; */
  margin-top: 10%;
  margin-top: 14vh;
  padding: 1em 0;
  border-radius: 20px;
  border-radius: 4px;
}

@screen sm {
  .modalForm {
    margin-top: 14vh;
    min-width: 700px;
  }
}

.close {
  position: relative;
  /* top: -0.275em; */
  margin-right: 0em;
  /* right: 3%; */
}

@screen sm {
  .close {
    top: -0.475em;
  }
}

@screen md {
  .close {
    top: -3.725em;
  }
}
</style>
