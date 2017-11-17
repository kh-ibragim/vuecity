
<template>
<div id="profile">
  <Account /> 
</div>
</template>

<script>
  import Account from './Account'
  import axios from 'axios'
  export default {
    name: 'profile',
    beforeCreate () {
      if (localStorage.getItem('token') === null) {
        this.$router.push('/login')
      } else {
        var jwtDecode = require('jwt-decode')
        var decoded = jwtDecode(localStorage.getItem('token'))
        console.log(decoded.userId)
      }
      var config = {
        headers: {'Authorization': localStorage.getItem('token')}
      }
      return axios.get('http://localhost:3030/users/' + decoded.userId, config).then((response) => {
        localStorage.setItem('UserName', response.data.name)
        localStorage.setItem('UserEmail', response.data.email)
        localStorage.setItem('UserAge', response.data.age)
      })
      .catch((error) => { alert(error) })
    },
    created: function () {
      console.log('local token')
      console.log(localStorage.getItem('token'))
      // console.log(this.$store.state.token)
    },
    components: {
      Account
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
