<template>
  <div id="main-app" class="container">
    <appointment-list @remove='removeItem' :appointments='appointments' />
  </div>
</template>

<script>
import AppointmentList from "./components/Appointments";
import axios from "axios";
import _ from 'lodash';    
export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List",
      appointments: []
    };
  },
  mounted() {
    axios
      .get("./data/appointments.json")
      .then(response => (this.appointments = response.data));
    console.log(this.appointments);
  },
  methods: {
    removeItem: function(apt){
      this.appointments = _.without(this.appointments, apt);
    }
  },
  components: {
    AppointmentList
  }
};
</script>
