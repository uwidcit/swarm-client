<template>
    <div class="q-pa-md q-gutter-sm">
        <q-btn round color="accent" glossy icon="report_problem" @click="seamless = true">
            <q-tooltip>
                Create Alert
            </q-tooltip>
        </q-btn>
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
            <button class="ui button" @click="createAlert(text), seamless=false">CREATE ALERT</button>
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
           long.value = position.coords.latitude
           lat.value = position.coords.longitude
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
        console.log(text)
        let url = "https://swarmnet-prod.herokuapp.com/alerts"
          
            api.post(url,{
              text: text,  
              longitude: long.value,
              latitude: long.value,
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
              if(response.data == "created"){
                setTimeout(() => {
                 $q.notify({
                      color: 'positive',
                      position: 'top',
                      message: 'ALERT SENT',
                      icon: 'report_problem'
                      })
          }, 3000) 
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
  background-color: hsl(199, 69%, 35%);
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