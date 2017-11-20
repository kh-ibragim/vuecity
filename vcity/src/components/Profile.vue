
<template>
<div id="profile">
    <Account />
        <!--{/*primary info*/}-->
        <div class="uk-section uk-section-default uk-padding-remove ">       
            <!--{/*navigation tabs*/}-->
            <Navigation />
            <ul class="uk-switcher uk-margin-remove uk-padding-remove">
                <li class="uk-active">
                    <!--{/*life*/}-->
                    <Life />
                </li>
                <li>
                    <!--{/*meetings*/}-->
                    <Meetings />
                </li>
                <li>
                    <!--{/*my posts*/}  -->
                    <My />
                </li>
                <li>
                    <!--{/*messages*/}-->
                    <Messages />
                </li>
            </ul>
        </div>
</div>
</template>

<script>
  import Account from './Account'
  import Navigation from './Navigation.vue'
  import Life from './Life.vue'
  import Meetings from './Meetings.vue'
  import My from './My.vue'
  import Messages from './Messages.vue'

  export default {
    name: 'profile',
    created: function () {
      console.log('local token')
      console.log(localStorage.getItem('token'))
      console.log('store token' + this.$store.state.token)
    },
    components: {
      Account,
      Navigation,
      Life,
      Meetings,
      My,
      Messages
    }
  }
</script>

<style>

.full{
width: 100%;
}
.radius{
    border-radius: 10rem;
}
.smallimg{
height: 4.7em;
width: 5em;
}
.userimg{
  width: 9em;
  height: 7em;  
}
.radsuserimg{
    border-radius: 10rem;
}
.sect{
  padding-top: 1rem;
}
</style>
