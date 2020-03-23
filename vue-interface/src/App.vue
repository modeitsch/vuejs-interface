<template>
  <div id="main-app" class="container">
    <div class="row justify-content-center">
      <add-appointment @add="addItem"/>
      <search-appointments
        @searchRecords="searchAppointments"
        :myKey="filterKey"
        :myDir="filterDir"
        @requestKey="changeKey"
        @requestDir="changeDir"
      />
      <appointment-list :appointments="filteredApts" @remove="removeItem" @edit="editItem"/>
    </div>
  </div>
</template>


<script>
import AddAppointment from "./components/AddAppointment";
import SearchAppointments from "./components/SearchAppointments";
import AppointmentList from "./components/Appointments";
import axios from "axios";
import _ from "lodash";
export default {
  name: "MainApp",
  data: function() {
    return {
      title: "Appointment List",
      appointments: [],
      filterKey: "petName",
      filterDir: "asc",
      aptIndex: 0,
      searchTerm: ""
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
  computed: {
    searchedApts: function() {
      return this.appointments.filter(item => {
        return (
          item.petName.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          item.petOwner.toLowerCase().match(this.searchTerm.toLowerCase()) ||
          item.aptNotes.toLowerCase().match(this.searchTerm.toLowerCase())
        );
      });
    },
    filteredApts: function() {
      return _.orderBy(
        this.searchedApts,
        item => {
          return item[this.filterKey].toLowerCase();
        },
        this.filterDir
      );
    }
  },
  methods: {
    changeKey: function(value){
      this.filterKey = value
    },
    changeDir: function(value){
      this.filterDir = value
    },
    searchAppointments: function(terms) {
      this.searchTerm = terms;
    },
    addItem: function(apt) {
      apt.aptId = this.aptIndex;
      this.aptIndex++;
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
    AddAppointment,
    SearchAppointments
  }
};
</script>
