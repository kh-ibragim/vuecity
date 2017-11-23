<template>
            <!-- <div  class="uk-margin-remove" >
                <div class="uk-width-1-1@s uk-margin-remove">
                    <div><GoogleMap /></div>
                </div>
            </div> -->
        <div  class="uk-margin-remove" data-uk-grid>
            <div class="uk-width-large@l uk-width-medium@m uk-padding-remove uk-margin-top uk-margin-bottom uk-margin-right selected ss uk-background-muted">
                <template v-if="!markcl">
                    <div class="uk-container uk-text-center">
                        <a class="uk-icon uk-icon-muted" uk-icon="icon: plus; ratio: 5" title="Create new event" uk-tooltip href="#modal-create-event" uk-toggle style="margin-top: 8em"></a>

                        <div id="modal-create-event" class="uk-modal-full" uk-modal>
                            <div class="uk-modal-dialog">
                                <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
                                    <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                                        <div class="uk-background-cover uk-background-muted" uk-height-viewport>
                                            <div class="uk-text-center">
                                            <div class="test-upload" style="margin-top: 10%" uk-form-custom>
                                                <input type="file" multiple>
                                                <a class="uk-icon" uk-icon="icon: cloud-upload; ratio: 3" uk-tooltip></a>
                                            </div>
                                            </div>
                                        </div>
                                            <div class="uk-padding-large">


                                        <form class="uk-form-horizontal uk-margin-small uk-card  uk-card-default uk-card-body" @submit="createEvent">

                                            <div class="uk-margin">
                                                <label class="uk-form-label" for="form-horizontal-text"><span class="uk-icon-button" uk-icon="icon: bell"></span> Name</label>
                                                <div class="uk-form-controls">
                                                    <input class="uk-input validate" id="name" type="text" required placeholder="Event Name" v-model="occasionName">
                                                </div>
                                            </div>

                                            <div class="uk-margin">
                                                <label class="uk-form-label" for="form-horizontal-text"><span class="uk-icon-button" uk-icon="icon: calendar"></span> Date</label>
                                                <div class="uk-form-controls">
                                                    <input class="uk-input validate" id="name" type="text" required placeholder="Event Date" v-model="occasionDate">
                                                </div>
                                            </div>

                                            <div class="uk-margin">
                                                <label class="uk-form-label" for="form-horizontal-text"><span class="uk-icon-button" uk-icon="icon: commenting"></span> Description</label>
                                                <div class="uk-form-controls">
                                                    <textarea class="uk-textarea validate" rows="5" required placeholder="Meeting Description" v-model="occasionDescription"></textarea>
                                                </div>
                                            </div>


                                            <!-- <div class="uk-margin">
                                                <div class="uk-form-label"><span class="uk-icon-button" uk-icon="icon: location"></span> Show your location</div>
                                                <div class="uk-form-controls uk-form-controls-text">
                                                    <label><input class="uk-radio" type="radio" checked name="radio1"> Yes</label><br>
                                                    <label><input class="uk-radio" type="radio" name="radio1" disabled> No</label>
                                                </div>
                                            </div>

                                            <div class="uk-margin">
                                                <div class="uk-form-label"><span class="uk-icon-button" uk-icon="icon: users"></span>  Anonymous event</div>
                                                <div class="uk-form-controls uk-form-controls-text">
                                                    <label><input class="uk-radio" type="radio" checked name="radio2"> No</label><br>
                                                    <label><input class="uk-radio" type="radio" name="radio2" disabled> Yes</label>
                                                </div>
                                            </div> -->

                                        
                                            <div class="uk-margin">
                                                <div>
                                                    <button class="uk-button uk-button-danger uk-button-medium" type="submit">Create event</button>
                                                </div>
                                            </div>
                                        </form>

                                      </div>
                                    </div>
                            </div>
                        </div>



                    </div>
                </template>
                <template v-else>
                    <div class="uk-container uk-margin-top">
                        <div class="uk-margin uk-card uk-card-default uk-card-body selectedMarker">
                            <h3 class="uk-margin-remove-bottom">{{ occasionName }}</h3>
                            <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                            <hr>
                            {{ occasionDescription }}  <br/>
                            <hr>
                            <button class="uk-button uk-button-danger full">Respond</button> 
                            <button class="uk-button uk-button-text uk-align-right"><span uk-icon="icon: user"><p>12</p></span></button>
                        </div>
                    </div>                  
                </template>
            </div>
            <div class="uk-width-expand@l uk-width-expand@m uk-padding-remove uk-margin-top uk-margin-bottom">
                <div  class="uk-width-1-1@s uk-margin-remove">
                    <v-map ref="map" style="height: 31.6em;" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom">
                    <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
                    <v-marker :lat-lng="[userPositionLat, userPositionLng]" :icon="icon"></v-marker>
                    <v-circle :lat-lng="[userPositionLat, userPositionLng]" :radius="circle.radius" :color="'#EE82EE'" :fillColor="'#DDA0DD'"></v-circle>
                    <v-marker :lat-lng="[45, 34.1]" v-on:l-click="clickMarker"></v-marker>
                    <!-- <v-marker v-for="star in stars" :lat-lng="star" :key="star.name">
                        <v-popup :content="star.name +'<br/>'+ star.describe"></v-popup>
                    </v-marker> -->
                    <v-marker v-for="allEvent in allEventMarker" :lat-lng="allEvent.location" :key="allEvent._id" v-on:l-click="clickMarker(allEvent._id)">
                        <v-popup :content="allEvent.name +'<br/>'+ allEvent.description"></v-popup>
                    </v-marker>
                    </v-map>
                </div>
            </div>
        </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'
import axios from 'axios'

L.Icon.Default.imagePath = '../static/images/'
var userIcon = L.icon({
  iconUrl: '../static/images/marker.png',
  iconSize: [50, 55],
  iconAnchor: [34, 54],
  popupAnchor: [-9, -45],
  shadowUrl: '../static/images/marker-shadow.png',
  shadowSize: [80, 55],
  shadowAnchor: [34, 54]
})
var config = {
  headers: {'Authorization': localStorage.getItem('token')}
}
export default {
  name: 'Life',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-popup': Vue2Leaflet.Popup,
    'v-marker': Vue2Leaflet.Marker,
    'v-circle': Vue2Leaflet.LCircle
  },
  data () {
    return {
      markcl: false,
      occasionName: '',
      occasionDescription: '',
      occasionDate: '',
      zoom: 14,
      minZoom: 3,
      maxZoom: 20,
      icon: userIcon,
      userID: localStorage.getItem('UserID'),
      userPositionLat: '',
      userPositionLng: '',
      stars: [
        { name: 'Party', describe: 'Party for all', lat: 45, lng: 34.1 },
        { name: 'Event', describe: 'Meeting', lat: 45, lng: 34.2 },
        { name: 'Gossip', describe: 'New bus', lat: 45, lng: 34.15 },
        { name: 'Party', describe: 'Party for woman', lat: 45, lng: 34.11 }
      ],
      allEventMarker: [],
      circle: {
        center: L.latLng(45, 34.2),
        radius: 1500
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    axios.get('http://localhost:3030/events', config).then((response) => {
      console.log(response.data.data)
      this.allEventMarker = response.data.data
      // var index
      // for (index = 0; index < response.data.data.length; ++index) {
      //   console.log(response.data.data[index])
      // }
    })
    .catch((error) => { console.log(error) })
    this.$refs.map.mapObject.locate({setView: true, maxZoom: this.zoom, watch: true})
    .on('locationfound', function (e) {
      localStorage.setItem('userPositionLat', e.latlng.lat)
      localStorage.setItem('userPositionLng', e.latlng.lng)
    })
    this.userPositionLat = localStorage.getItem('userPositionLat')
    this.userPositionLng = localStorage.getItem('userPositionLng')
    console.log(this.userPositionLat)
    console.log(this.userPositionLng)
  },
  methods: {
    clickMarker: function (allEvent) {
      this.markcl = true
      console.log(this.allEvent)
      // this.occasionName = 'Party for all'
      // this.occasionDescription = 'Party for all. Meetting in 7 p.m. Near White House. Party for all. Meetting in 7 p.m. Near White House.'
    },
    createEvent: function (e) {
      return axios.post('http://localhost:3030/events/', {
        name: this.occasionName,
        userId: this.userID,
        occuredAt: this.occasionDate,
        description: this.occasionDescription,
        location: [this.userPositionLat, this.userPositionLng]
      }, config).then((response) => {
        console.log('response' + response.data)
      })
      .catch((error) => { console.log(error) })
    }
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";

.selected{
height: 23.8em;
}
.selectedMarker{
height: 20.8em;
}
.full{
width: 60%;
}

 @media only screen and (max-width:500px){
.selected{
  margin-right: 0px;
  }
}
</style>