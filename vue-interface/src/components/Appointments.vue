<template>
  <div class="col-12 col-md-10 col-lg-7">
    <div class="list-group list-group-flush">
      <div
        class="list-group-item d-flex align-items-start"
        v-for="item in appointments"
        v-bind:key="item.aptIndex"
      >
        <button @click="$emit('remove', item)" class="mr-2 btn btn-sm btn-danger">
          <font-awesome-icon icon="trash"/>
        </button>
        <div class="w-100">
          <div class="d-flex justify-content-between">
            <span class="h4 text-primary" 
            contenteditable="contenteditable" 
            @blur="$emit('edit', item.aptIndex, 'petName', $event.target.innerText)"
            >{{item.petName}}</span>
            <span class="float-right">{{formattedDate(item.aptDate)}}</span>
          </div>
          <div class="owner-name">
            <span class="font-weight-bold text-primary mr-1">Owner:</span>
            <span
             contenteditable="contenteditable" 
            @blur="$emit('edit', item.aptIndex, 'petOwner', $event.target.innerText)"
            >{{item.petOwner}}</span>
          </div>
          <div
            contenteditable="contenteditable" 
            @blur="$emit('edit', item.aptIndex, 'aptNotes', $event.target.innerText)"
          >{{item.aptNotes}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "AppointmentList",
  props: ["appointments"],
  methods: {
      formattedDate: function(date) {
          return moment (new Date(date)).format('MM-DD-YYh:mm a');
      },

  },
};
</script>
