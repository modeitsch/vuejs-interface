<template>
  <div id="main-app" class="container">
    <add-appointment @add="addAppointment" />
    <appointment-list @remove="removeItem" :appointments="appointments" @edit="editItem" />
  </div>
</template>

<script>
import AddAppointment from "./components/AddAppointment";
import AppointmentList from "./components/Appointments";
import axios from "axios";
import _ from "lodash";
export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List",
      appointments: [],
      aptIndex: 0
    };
  },
  mounted() {
    axios.get("./data/appointments.json").then(
      response =>
        (this.appointments = response.data.map(item => {
          item.aptIndex = this.aptIndex;
          this.aptIndex++;
          return item;
        }))
    );
  },
  methods: {
    addAppointment: function(apt) {
      apt.aptId = this.aptIndex;
      this.aptIndex++
      this.appointments.push(apt);
    },

    removeItem: function(apt) {
      this.appointments = _.without(this.appointments, apt);
    },
    editItem: function(id, field, text) {
      const aptIndex = _.findIndex(this.appointments, {
        aptId: id
      });
      this.appointments[aptIndex][field] = text;
    }
  },
  components: {
    AppointmentList,
    AddAppointment
  }
};
</script>
