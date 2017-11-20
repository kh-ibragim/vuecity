<template>
    <!--section-->
    <div class="uk-section uk-section-muted uk-section uk-padding-remove-top uk-padding-remove-bottom ">
        <div class="uk-card uk-card-muted uk-card-small uk-grid-collapse  uk-margin  uk-width-1-1 sect uk-margin-remove" data-uk-grid>
            <div class="uk-card-media-right uk-overflow-hidden uk-width-1-1@s ">
                <div class="avatar">
                    <img  class="uk-border-circle" src="https://s-media-cache-ak0.pinimg.com/originals/6d/bd/ea/6dbdeacb3b7ad332be657c9ca64f4b54.jpg" alt="User image"/>
                </div>
            </div>
        </div>
        <!--edit profile   -->
        <div>
            <div class="uk-margin-remove" uk-grid>
               <div class="uk-width-1-5 uk-padding-remove-left">
                    <!-- <a class="uk-icon-button" uk-icon="icon: file-edit" title="Edit profile" uk-tooltip href="#modal-overflow" uk-toggle></a> -->
               </div>
               <div class="uk-width-3-5 uk-padding-remove-left  uk-text-center">
                    <p>{{ userName }}</p>
               </div>
                <div class="uk-width-expand uk-padding-remove-left uk-margin-remove-top">
                    <a class="uk-icon-button name-user" uk-icon="icon: grid" title="My profile" uk-tooltip uk-toggle="target: #offcanvas-reveal"></a>
               </div>
            </div>

            <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; flip: true; overlay: true">
                <div class="uk-offcanvas-bar">

                    <button class="uk-offcanvas-close" type="button" uk-close></button>

                    <h3><span class="uk-icon-button" uk-icon="icon: grid"></span> My profile</h3>

                    <p><span class="uk-icon-button" uk-icon="icon: user"></span> Name: {{ userName }}</p>
                    <p><span class="uk-icon-button" uk-icon="icon: mail"></span> Email: {{ userEmail }}</p>
                    <p><span class="uk-icon-button" uk-icon="icon: pencil"></span> Age: {{ userAge }}</p>
                    <p><span class="uk-icon-button" uk-icon="icon: users"></span> Sex: {{ userSex }}</p>
                    <p><span class="uk-icon-button" uk-icon="icon: social"></span> Interest: {{ userInterests }}</p>
                    <p><a class="uk-icon-button" uk-icon="icon: file-edit" href="#modal-overflow" uk-toggle></a> Edit profile</p>
                    <p><button class="uk-icon-button" uk-icon="icon: sign-out" v-on:click="logout"></button> Exit</p>

                </div>
            </div>

            <div id="modal-overflow" uk-modal>
                <div class="uk-modal-dialog">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                        <div class="uk-modal-header">
                            <h2 class="uk-modal-title">Edit profile</h2>
                        </div>
                        <div class="uk-modal-body" uk-overflow-auto>

                        <form >
                        <div class="uk-margin">
                        <div class="uk-inline full">
                            <span class="uk-form-icon" uk-icon="icon: user"></span>
                            <input id="icon_prefix" type="text" class="validate uk-input uk-form-width-large full radius" v-bind:placeholder="userName" pattern="[a-zA-Z0-9]+" required >
                            <label for="icon_prefix" data-error="Name должно содержать только символы из латинского алфавита и цифры"></label>
                        </div>
                        </div>

                        <div class="uk-margin">
                        <div class="uk-inline full">
                            <span class="uk-form-icon" uk-icon="icon: lock"></span>
                            <input id="password" type="password" pattern="(?=.*\d)\w+.{6,30}" class="validate uk-input uk-form-width-large full radius" placeholder="Password" required>
                            <label for="password" data-error="Пароль должен состоять минимально из 6 латинских символов и включать, по крайней мере одну букву и одну цифру"></label>
                        </div>
                        </div>

                        <div class="uk-margin">
                        <div class="uk-inline full">
                            <span class="uk-form-icon" uk-icon="icon: mail"></span>
                            <input id="email" type="email" class="validate uk-input uk-form-width-large full radius" v-bind:placeholder="userEmail" required >
                            <label for="email" data-error="Введите корректно свой email"></label>
                        </div>
                        </div>

                        <div class="uk-margin">
                        <div class="uk-inline full">
                            <span class="uk-form-icon" uk-icon="icon: pencil"></span>
                        <input id="age" type="number" min="16" max="120" class="validate uk-input uk-form-width-large full radius" v-bind:placeholder="userAge" required>
                        </div>
                        </div>
  
                        <div class="uk-margin white radius">
                        <div class="uk-form-controls full">
                            <label><input class="uk-radio" type="radio" name="sex" v-model="editUserSex"> Man </label>
                            <label><input class="uk-radio" type="radio" name="sex" v-model="editUserSex">  Female</label>
                        </div>
                        </div>
                        </form>
                </div>

                        <div class="uk-modal-footer uk-text-right">
                            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                            <button class="uk-button uk-button-primary" type="button">Save</button>
                        </div>
            </div>
        </div>


    </div>
</div>

</template>

<script>
import UIkit from 'uikit'
import axios from 'axios'

export default {
  data () {
    return {
      userName: '',
      userEmail: '',
      userAge: '',
      userSex: '',
      userInterests: '',
      editUserSex: ''
    }
  },
  mounted: function () {
    this.userName = localStorage.getItem('UserName')
    console.log('acccccccc' + this.userName)
    console.log(localStorage.getItem('UserName'))
  },
  beforeCreate () {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    } else {
      var jwtDecode = require('jwt-decode')
      var decoded = jwtDecode(localStorage.getItem('token'))
      console.log(decoded.userId)
      var config = {
        headers: {'Authorization': localStorage.getItem('token')}
      }
      return axios.get('http://localhost:3030/users/' + decoded.userId, config).then((response) => {
        localStorage.setItem('UserName', response.data.name)
        localStorage.setItem('UserEmail', response.data.email)
        localStorage.setItem('UserAge', response.data.age)
        localStorage.setItem('UserInterests', response.data.interests)
        console.log(response.data.interests)
        if (response.data.sex === 'true') {
          localStorage.setItem('UserSex', 'Man')
        } else {
          localStorage.setItem('UserSex', 'Female')
        }
        this.userName = localStorage.getItem('UserName')
        this.userEmail = localStorage.getItem('UserEmail')
        this.userAge = localStorage.getItem('UserAge')
        this.userSex = localStorage.getItem('UserSex')
        this.userInterests = localStorage.getItem('UserInterests')
        this.editUserSex = response.data.sex
      })
      .catch((error) => { alert(error) })
    }
  },
  name: 'Account',
  methods: {
    logout: function (event) {
      event.preventDefault()
      UIkit.offcanvas('#offcanvas-reveal').hide()
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
full{
width: 100%;
}


.radius{
    border-radius: 10rem;
}

.avatar{
  width: 17%;
  overflow: hidden;
  position: relative;
  margin: auto;
 
}

.name-user{
float: right;
}

.avatar:after{
  content: "";
  padding-bottom: 100%;
  display: block;
}

.avatar img{
position: absolute;
padding: 0rem;
min-height: 100%;
min-width: 100%;
object-fit: cover;
}



</style>
