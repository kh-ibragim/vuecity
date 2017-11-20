<template>
<div>
<ul class="uk-flex-center " uk-tab>
    <li><a href="">My Events</a></li>
    <li><a href="">My Meetings</a></li>
    <li><a href="">My Institutions</a></li>
    <li><a href="">My Gossips</a></li>
</ul>

<ul class="uk-switcher uk-margin">
    <li><MyEvents /></li>
    <li><MyMeetings /></li>
    <li><MyInstitutions /></li>
    <li><MyGossips /></li>
</ul>

</div>
</template>


<script>
import MyEvents from './MyEvents.vue'
import MyMeetings from './MyMeetings.vue'
import MyInstitutions from './MyInstitutions.vue'
import MyGossips from './MyGossips.vue'

export default {
  name: 'My',
  components: {
    MyEvents,
    MyMeetings,
    MyInstitutions,
    MyGossips
  }
}
</script>
