<template>
<div id="login">
  <section class="container">

        <div class="uk-section  uk-section-large checkin-container">
            <div class="uk-container">
                    <form @submit="login"> 

                    <div class="uk-margin">
                        <div class="uk-inline full uk-form-password">
                            <span class="uk-form-icon" uk-icon="icon: mail"></span>
                            <input id="icon_prefix" type="text" required class="validate uk-input uk-form-width-large full radius" placeholder="Email" v-model="email">
                        </div>
                    </div>

                    <div class="uk-margin">
                        <div class="uk-inline full">
                            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                            <input id="password" type="password" required class="validate uk-input uk-form-width-large full radius" placeholder="Password" v-model="password">
                        </div>
                    </div>
            
                    <div class="uk-margin">
                        <div class="full">
                          <button class="uk-button uk-button-primary uk-button-medium full wave radius" type="submit">Login
  		                    </button>
                        </div>
                    </div>

                  </form>

                  
                    <div class="uk-margin">
                      <div class="full">
                        <router-link to="/registration"><button class="uk-button uk-button-muted uk-button-medium full wave radius"  type="button">Registration</button></router-link>
                      </div>
                    </div>
              
         </div>
        </div>  


  </section>
</div>
</template>

<script>
  import axios from 'axios'
  import feathers from 'feathers/client'
  import socketio from 'feathers-socketio/client'
  import io from 'socket.io-client'

  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    beforeCreate () {
      console.log('local store' + localStorage.getItem('token'))
      if (localStorage.getItem('token')) {
        this.$router.push('/profile')
      }
    },
    methods: {
      login: function (e) {
        e.preventDefault()
        localStorage.setItem('token', null)
        return axios.post('http://localhost:3030/authentication', {
          strategy: 'local',
          email: this.email,
          password: this.password
        }).then((response) => {
          console.log('after axios request' + response.data.accessToken)
          localStorage.setItem('token', response.data.accessToken)
          this.$router.push('profile')
        })
        .catch((error) => { alert(error) })
        // const socket = io('http://localhost:3030')
        // socket.emit('authenticate', {
        //   strategy: 'local',
        //   email: this.email,
        //   password: this.password
        // }, function (message, data) {
        //   console.log(data.accessToken)
        //   localStorage.setItem('token', data.accessToken)
        // })
        // console.log('local ' + localStorage.getItem('token'))
        // this.$store.commit('LOGIN', localStorage.getItem('token'))
        // this.$router.push('profile')
      }
    },
    mounted () {
      const app = feathers().configure(socketio(io('http://localhost:3030')))
      app.service('authentication').on('created', (message) => {
        console.log(message)
      })
    }
  }
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.full{
width: 100%;
}

.wave {
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  vertical-align: middle;
  z-index: 1;
  transition: .3s ease-out;
}

.radius{
    border-radius: 10rem;
}

</style>
