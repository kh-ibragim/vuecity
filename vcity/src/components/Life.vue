<template>
            <div  class="uk-margin-remove" >
                <div class="uk-width-1-1@s uk-margin-remove">
                    <div><GoogleMap /></div>
                </div>
            </div>
</template>

<script>
import GoogleMap from './GoogleMap'

export default {
  name: 'Life',
  components: {
    GoogleMap
  }
}
</script>