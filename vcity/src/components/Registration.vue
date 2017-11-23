<template>
<div id="registration">
  <section class="container">

<div class="uk-section checkin-container">
    <div class="uk-container">

        <form @submit="registration">

        <div class="uk-margin">
          <div class="uk-inline full">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input id="icon_prefix" type="text" class="validate uk-input uk-form-width-large full radius" placeholder="Name" pattern="[a-zA-Z0-9]+" v-model="name" required >
              <label for="icon_prefix" data-error="Name должно содержать только символы из латинского алфавита и цифры"></label>
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-inline full">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input id="password" type="password" pattern="(?=.*\d)\w+.{6,30}" class="validate uk-input uk-form-width-large full radius" placeholder="Password" v-model="password" required>
              <label for="password" data-error="Пароль должен состоять минимально из 6 латинских символов и включать, по крайней мере одну букву и одну цифру"></label>
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-inline full">
              <span class="uk-form-icon" uk-icon="icon: mail"></span>
              <input id="email" type="email" class="validate uk-input uk-form-width-large full radius" placeholder="Email" v-model="email" required >
              <label for="email" data-error="Введите корректно свой email"></label>
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-inline full">
              <span class="uk-form-icon" uk-icon="icon: pencil"></span>
          <input id="age" type="number" min="16" max="120" class="validate uk-input uk-form-width-large full radius" placeholder="Age" v-model="age" required>
          </div>
        </div>

        
        <div class="uk-margin white radius">
          <div class="uk-form-controls full">
      		<label><input class="uk-radio" type="radio" id="true" v-model="picked" value="true"> Man </label>
      		<label><input class="uk-radio" type="radio" id="false" v-model="picked" value="false" >  Female</label>
          </div>
        </div>

        <!-- <div class="uk-margin radius">
          <div class="uk-inline full">
            <select class="uk-select" v-for="item in allinterests" :key="item.id" multiple>
                <option>{{item.name}}</option>
            </select>
          </div>
        </div> -->

        <div class="uk-margin radius">
           <div class="uk-inline full" uk-form-custom>
                <input type="file">
                <button class="uk-button uk-button-secondary uk-button-medium full radius" type="button" tabindex="-1">Select photo</button>
          </div>
        </div>

        <div class="uk-margin radius">
          <div class="uk-inline full">
              <a class="uk-button uk-button-secondary uk-button-medium full radius" href="#modal-sections" uk-toggle>Choose interests</a>
              <div id="modal-sections" uk-modal>
                  <div class="uk-modal-dialog">
                      <button class="uk-modal-close-default" type="button" uk-close></button>
                      <div class="uk-modal-header">
                          <h2 class="uk-modal-title">Choose your interests</h2>
                      </div>
                      <div class="uk-modal-body">
                          <div v-for="item in allinterests" :key="item.id">
                            <input type="checkbox" v-bind:id="item.name" v-bind:value="item.name" v-model="checkedinterests">
                            <label v-bind:for="item.name">{{item.name}}</label>
                          </div>
                            <br>
                            <span>Отмеченные интересы: {{ checkedinterests }}</span>                    
                      </div>
                      <div class="uk-modal-footer uk-text-right">
                          <button class="uk-button uk-button-default uk-modal-close" type="button">Choose</button>
                          <!-- <button class="uk-button uk-button-primary" type="button">Save</button> -->
                      </div>
                  </div>
              </div>
          </div>
        </div>



        <div class="uk-margin">
          <div class="uk-inline full">
            <button class="uk-button uk-button-primary uk-button-medium full radius" type="submit">Registration
            </button>
          </div>
        </div>

      </form>

      <div class="uk-margin">
        <div class="uk-inline full">
            <router-link to="/login">
                <button class="uk-button uk-button-muted  uk-button-medium full radius" type="button" >Login</button>
            </router-link>
        </div>
      </div>

    </div>
</div>

  </section>
</div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'registration',
    data () {
      return {
        name,
        email: '',
        password: '',
        age: '',
        sex: '',
        allinterests: {},
        checkedinterests: [],
        picked: 'true'
      }
    },
    beforeCreate () {
      if (localStorage.getItem('token')) {
        this.$router.push('/profile')
      }
      return axios.get('http://localhost:3030/interests')
      .then((response) => {
        console.log(response.data.data)
        console.log(Object.keys(response.data.data))
        this.allinterests = response.data.data
      })
    },
    methods: {
      registration: function (e) {
        e.preventDefault()
        localStorage.setItem('token', null)
        return axios.post('http://localhost:3030/users/', {
          name: this.name,
          password: this.password,
          email: this.email,
          age: this.age,
          sex: this.picked,
          interests: this.checkedinterests
        }).then((response) => {
          console.log('Successful registration' + response.data.accessToken)
          localStorage.setItem('token', response.data.accessToken)
          this.$router.push('login')
        })
        .catch((error) => { alert(error) })
      }
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
