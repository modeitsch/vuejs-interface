<template>
  <div id="main-app" class="container">
    <h4>{{title}}</h4>
    <font-awesome-icon icon='plus' />Add Appointment
  </div>
</template>

<script>

export default {
  name: 'MainApp',
    data: function() {
      return { 
      title: "Appointment List",
      };
    },

  };
</script>

