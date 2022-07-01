<template>
    <div >
        <q-btn flat round color="red"  icon="warning_amber" @click="seamless = true" /> 
        <q-tooltip>
          Create Alert
          </q-tooltip>
  </div>

  <q-dialog v-model="seamless">
      <q-card style="width: 600px; height: 280px; background-color: powderblue;">
        <q-card-section>
          <div class="text-h6">
            <div class="column">
        <form class="ui segment large form">
          <div class="ui message red" v-show="errorMsg">{{errorMsg}}</div>
          <div class="ui segment">
            <div class="field">
              <div class="ui right icon input large" :class="{loading:spinner}">
                <input
                  type="text"
                  placeholder="Click to add your coordinates"
                  v-model="address"
                  id="autocomplete"
                />
                
                <i class="dot circle link icon" @click="locatorButtonPressed"></i>
              </div>
              <br/>
              <q-input  placeholder="Enter Alert Message..." v-model="text" counter maxlength="260" autogrow :dense="dense">
              </q-input>
            </div>
            <button class="ui button" @click.prevent.stop="createAlert(text), seamless=false">CREATE ALERT</button>
          </div>
        </form>
      </div>
        
          </div>
        </q-card-section>
        
      </q-card>
    </q-dialog>


</template>


<script>
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {

  setup () {
    const $q = useQuasar()
    const address = ref('')
    const errorMsg = ref('')
    const text = ref('')
    const long = ref()
    const lat = ref()

    function locatorButtonPressed(){
       if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(
           position=>{
           address.value= "Your coordinates are: " + position.coords.latitude + " , "+position.coords.longitude
           long.value = position.coords.longitude
           lat.value = position.coords.latitude
         },
           error=>{
             console.log(error.message)
             errorMsg.value = error.message
           },          
         );
       }
       else{
         errorMsg.value = error.message
         console.log("Your browser does not support geo location")
       }
    }

    function createAlert(text){
        console.log(text, long.value, lat.value)
        let url = "https://swarmnet-staging.herokuapp.com/alerts"
          
            api.post(url,{
              text: text,  
              longitude: long.value,
              latitude: lat.value,
              composed: "2022-04-09T14:48:00Z"
              },
              {
                headers: {
                  Authorization:'JWT '+ localStorage.getItem('token'),
                  'Access-Control-Allow-Origin': '*'
                  
                }
              }
              )
            .then((response) => {
              if(response.status == 201){
                console.log("created")
              
                 $q.notify({
                      color: 'positive',
                      position: 'top',
                      message: 'ALERT SENT',
                      icon: 'report_problem'
                      })
        
              }
  
            })
            .catch(() => {
              $q.notify({
                color: 'negative',
                position: 'top',
                message: 'Loading failed',
                icon: 'report_problem'
              })
            }) 
    }

    return {
      seamless: ref(false),
      locatorButtonPressed,
      createAlert,
      text,
      address,
      errorMsg,
    }
  }

}
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color: #ff5a5f;
  color: white;
}

.pac-icon {
  display: none;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 16px;
}

#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>