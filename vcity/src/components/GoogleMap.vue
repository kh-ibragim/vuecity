<template>
  <div  class="uk-width-1-1@s uk-margin-remove">
    <v-map ref="map" style="height: 50em; width: 112.4em;" :zoom="zoom" :min-zoom="minZoom" :max-zoom="maxZoom">
      <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
      <v-marker :lat-lng="[userPositionLat, userPositionLng]" :icon="icon">
        <v-popup :content="'Your geolocotion'"></v-popup>
      </v-marker>
      <v-circle :lat-lng="[userPositionLat, userPositionLng]" :radius="circle.radius" :color="'#EE82EE'" :fillColor="'#DDA0DD'"></v-circle>
      <v-marker v-for="star in stars" :lat-lng="star" :key="star.name">
        <v-popup :content="star.name +'<br/>'+ star.describe"></v-popup>
      </v-marker>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

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
export default {
  name: 'example',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-popup': Vue2Leaflet.Popup,
    'v-marker': Vue2Leaflet.Marker,
    'v-circle': Vue2Leaflet.LCircle
  },
  data () {
    return {
      zoom: 12,
      minZoom: 1,
      maxZoom: 20,
      icon: userIcon,
      userPositionLat: '',
      userPositionLng: '',
      stars: [
        { name: 'Party', describe: 'Party for all', lat: 45, lng: 34.1 },
        { name: 'Event', describe: 'Meeting', lat: 45, lng: 34.2 },
        { name: 'Gossip', describe: 'New bus', lat: 45, lng: 34.15 },
        { name: 'Party', describe: 'Party for woman', lat: 45, lng: 34.11 }
      ],
      circle: {
        center: L.latLng(45, 34.2),
        radius: 1500
      },
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted () {
    this.$refs.map.mapObject.locate({setView: true, maxZoom: this.zoom, watch: true})
    .on('locationfound', function (e) {
      localStorage.setItem('userPositionLat', e.latlng.lat)
      localStorage.setItem('userPositionLng', e.latlng.lng)
    })
    this.userPositionLat = localStorage.getItem('userPositionLat')
    this.userPositionLng = localStorage.getItem('userPositionLng')
  }
}
</script>

<style>
@import "../../node_modules/leaflet/dist/leaflet.css";
</style>