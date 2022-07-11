<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="background text-white" elevated >
      <q-toolbar class="glossy" >
        <div v-if="$q.platform.is.mobile">
           <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />  

         <q-space/>
          <div style="max-width: 200px">
              <q-tabs
              v-model="tab"
              inline-label
              outside-arrows
              mobile-arrows
              class="text-white shadow-2"
              dense
            >
            <q-tab  label="ALL TOPICS" @click="tagText='0'" />
            <q-tab v-for="topic in tops" :key="topic.id" :label="topic.text" @click="tagText=topic.id" />
                  </q-tabs>
                  

        </div> 
        </div>
       
      <!--- fir desktop view only--->
     <div v-if="$q.platform.is.desktop" style="max-width: 1000px">
        <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        class="text-white shadow-2"
        dense
      >
        
        <q-tab  label="ALL TOPICS" @click="tagText='0'" />
        <q-tab v-for="topic in tops" :key="topic.id" :label="topic.text" @click="tagText=topic.id" />
         
           
      </q-tabs>       
     </div>
  
     <q-space/>

      <div class="q-gutter-sm row items-center no-wrap ">
         <alerts> </alerts>
         <q-btn stretch flat @click="logout"> Logout</q-btn>
          <q-btn round dense flat color="white" icon="notifications"  >
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>

          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
  
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-cyan"
      mini-to-overlay
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list class="background text-white">
        
         <q-item to="/home" active-class="q-item-no-link-highlighting" >
          <q-item-section avatar>
          <span v-if="$q.platform.is.desktop" ><q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        /> </span>

        <span v-if="$q.platform.is.mobile" > <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        /> </span>
           
          </q-item-section>
          <q-item-section>
            <q-item-label><strong>SWARMNET</strong></q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="orange" inset />

        <q-item to="/home"  active-class="q-item-no-link-highlighting" @click="ok = true">
          <q-item-section avatar>
            <q-icon name="fas fa-home"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Post Board</q-item-label>
          </q-item-section>
         
        </q-item>

        <q-expansion-item 
          icon="fas fa-hand-holding-medical"
          label="Request Emergency Assistance">

        <q-list class="q-pl-lg">  
        <q-item  clickable @click="police= true" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="local_police"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Police</q-item-label>
          </q-item-section>
        </q-item>

        <q-item  clickable @click="fire= true" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="local_fire_department"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Fire</q-item-label>
          </q-item-section>
        </q-item>

        <q-item  clickable @click="ambulance= true" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-ambulance"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Ambulance</q-item-label>
          </q-item-section>
        </q-item>

        <q-item  clickable @click="odpm= true" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="emergency"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>ODPM</q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
        </q-expansion-item>

        <q-item to="/InboxLayout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-envelope-open"/>
          </q-item-section>
          <q-item-section>
           
            <q-item-label><strong>Inbox</strong></q-item-label>
          </q-item-section>
        </q-item>

      <q-item to="/home" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="notifications_active"/>
          </q-item-section>
          <q-item-section>
            <q-item-label><strong>Notification</strong></q-item-label>
          </q-item-section>
        </q-item> 
       
      </q-list>
    </q-drawer>

     <!--Police Card-->
    <q-dialog
      v-model="police"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="rotate"
      seamless
      no-backdrop-dismiss
    >
      <q-card class="bg-primary text-white" :style="dialogStyle" >
        <q-bar v-touch-pan.mouse="onPan">
          <q-icon name="local_police"/>
          <div>Police service #999</div>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">About TTPS</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>The Trinidad and Tobago Police Service is both a civil and para-military body which functions in accordance with the Police Service Act Chapter 15:01.
Over 6500 Police Officers in varying ranks and Special Reserved Police support the mandate of the Service. The T&T Police Service is organised into 9 Divisions and 18 Branches, Squads and Units.</p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Contact TTPS</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-icon name="fas fa-map-marker-alt"/>
           Head Office Address
           <br />
          <p>Police Administration Building, Corner Edward and Sackville Streets, Port of Spain, Trinidad, West Indies.</p>
            <br />
          <q-icon name="fas fa-phone-alt"/>
           Phone 
           <br /> 
          <p>(868) 627-5217</p>
          <br /> 
          <q-icon name="fas fa-envelope"/>
           Email 
           <br /> 
          <p>corporatecommunications@ttps.gov.tt</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--Fire Card-->
    <q-dialog
      v-model="fire"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="rotate"
      seamless
    >
      <q-card class="bg-primary text-white" :style="dialogStyle">
        <q-bar v-touch-pan.mouse="onPan">
          <q-icon name="local_fire_department"/>
          <div>Fire Service</div>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Fire station #990</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>The mission of the Trinidad and Tobago Fire Service is to provide efficient and effective public fire protection and emergency services to the Republic of Trinidad and Tobago.</p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Contact TTFS</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-icon name="fas fa-map-marker-alt"/>
           North Division Head Office Address
           <br />
          <p>#1B Wrightson Road, Port of Spain, Trinidad and Tobago</p>
            <br />
          <q-icon name="fas fa-phone-alt"/>
           Phone 
           <br /> 
          <p>(868) 625-2671</p>
          <br /> 
          <q-icon name="fas fa-envelope"/>
           Email 
           <br /> 
          <p>ttfscommunication@gov.tt</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--Ambulance Card-->
    <q-dialog
      v-model="ambulance"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="rotate"
      seamless
    >
      <q-card class="bg-primary text-white" :style="dialogStyle">
        <q-bar v-touch-pan.mouse="onPan">
          <q-icon name="fas fa-ambulance"/>
          <div>Ambulance #811</div>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Ambulance Service</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>The Ministry of Health is the national authority charged with oversight of the entire health system in Trinidad and Tobago. It plays a central role in the protection of the population’s health and in 
            ensuring that all organisations and institutions that produce health goods and services conform to standards of safety.</p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Contact MOH</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-icon name="fas fa-map-marker-alt"/>
           Head Office Address
           <br />
          <p>Ministry of Health 63 Park Street
             Port-of-Spain 100607
             Trinidad and Tobago</p>
            <br />
          <q-icon name="fas fa-phone-alt"/>
           Head Office Phone 
           <br /> 
          <p> +1 (868)-627-0010<br/>
              +1 (868)-627-0012</p>
          <br /> 
          <q-icon name="fas fa-phone-alt"/>
           Covid Hotline
           <br /> 
          <p>800-WELL<br/>
             877-WELL</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!--ODPM Card-->
    <q-dialog
      v-model="odpm"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="rotate"
      seamless
    >
      <q-card class="bg-primary text-white" :style="dialogStyle">
        <q-bar v-touch-pan.mouse="onPan">
         <q-icon name="emergency"/>
          <div>Ambulance</div>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">ODPM #511</div>
        </q-card-section>

          <q-card-section class="q-pt-none">
          <p>The ODPM strive to build national Disaster Risk Management and Climate Change Adaptation capabilities with their partners and coordinate response and recovery operations in order to 
            protect the people, environment and economy and ensure a disaster resilient nation.</p>
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Contact Office Of Disaster Preparedness and Management(ODPM)</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-icon name="fas fa-map-marker-alt"/>
           Head Office Address
           <br />
          <p>4A Orange Grove Road,
            Trinicity, Tacarigua,
            Republic of Trinidad and Tobago</p>
            <br />
         <q-icon name="fas fa-phone-alt"/>
           Office Phone 
           <br /> 
          <p>640-1285</p>
          <br /> 
          <q-icon name="fas fa-phone-alt"/>
           Emergency
           <br /> 
          <p>800 ODPM (6376)</p>
             <br /> 
          <q-icon name="fas fa-envelope"/>
           Email 
           <br /> 
          <p>publicinfo.odpm@gmail.com</p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container class="bg-grey-2"> 
       <post-board :tabText="tagText"/>
    </q-page-container>

    
  </q-layout>
</template>

<script>


import PostBoard from 'components/PostBoard.vue';

import { defineComponent, ref} from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted} from 'vue'
import Inbox from 'src/pages/Inbox.vue';
import Alerts from 'src/components/Alerts.vue';
// const io = require('socket.io-client')

export default defineComponent({
  name: 'MainLayout',
  components: {
    PostBoard,
    Inbox,
    Alerts,
  },

  data () {
    return {
      messages: [],
      // socket: io.connect('wss://8080-uwidcit-swarmnetbackend-c20l2b6i6kj.ws-us38.gitpod.io/:8080',{
      //    transports:["websocket"]
      // }),
      tagText: '0',
      text: '',
      tag: '',
    
      dialogVis: false,
      dialogPos: {
        x: 0,
        y: 0,
      }
    }
  },

 
  // mounted() {
  //   console.log(`the component is now mounted.`)
  //   var messages = ''

  //   const socket = io("https://8080-uwidcit-swarmnetbackend-c20l2b6i6kj.ws-us39a.gitpod.io/");
  //   socket.on("connect", (arg) => {
    
  //   });

  //   socket.on('client_connect', function(text) {
  //     console.log("hi")
  //     console.log(text)
  //     messages = text.text
  //     console.log(messages)
    
  //   });

 
  //   socket.on('join', (args) => {
  //       console.log(args);
  //     });
      
       

  //   socket.on('join_room', ()=>{
  //     messages = socket
  //     console.log(messages)

  //       //alert('System: Socket Connection up!')
  //     }) 

   
  //     // this.socket.on('connect', (socket)=>{
  //     //   this.messages = socket;
  //     //   console.log(this.messages)
      
  //     //   //this.socket.send("user connected")
        
  //     // })
  //   console.log(`finished`)  
  // },
   

  computed: {
    dialogStyle() {
      return {
        transform: `translate(${this.dialogPos.x}px, ${this.dialogPos.y}px)`
      }
    }
  },
  
  methods: {
    onPan(evt) {
      this.dialogPos = {
        x: this.dialogPos.x + evt.delta.x,
        y: this.dialogPos.y + evt.delta.y
      }
    },
    logout () {
      
      console.log("logout")
      localStorage.clear();
      this.$router.push({ path: '/' })
    }

  },

  setup () {
    const leftDrawerOpen = ref(false)
    const lorem = ref('')
    const $q = useQuasar()
     $q.platform.is.mobile
    const data = ref(null)
    const tops = ref([])
    const tab = ref('flooding')
    const subList = ref([])
   
    function join_room(name){
      console.log("this socket function is clicked")
   
      const socket = io("https://8080-uwidcit-swarmnetbackend-c20l2b6i6kj.ws-us39a.gitpod.io/");
      let room = name;
      socket.emit('join_room', room);        
}
    
    function loadData () {
      console.log(localStorage.getItem('token'))
    api.get('https://swarmnet-staging.herokuapp.com/topics',{
  method: 'GET',
  
  headers: {
          'Access-Control-Allow-Origin': '*'
        }
    })
      .then((response) => {
        data.value = response.data
        
        for (let i of data.value) { 
          tops.value.push(i)  
        }
      
      console.log( tops.value[0].text) 
       console.log(tops) 

       test()
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

    /* displays subscription when topic is clicked once*/
    function createSubs(id){
      /* create subscription */ 
      console.log("creating sub")  
      console.log("Sub: "+ id)
      let suburl = "https://swarmnet-staging.herokuapp.com/subscriptions"

        api.post(suburl,{
          topic_id: id,  
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
            console.log("Subscription created")
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

function test(){
  subList.value.splice(0)
  let found = false
  let suburl = "https://swarmnet-staging.herokuapp.com/subscriptions/all"

        api.get(suburl,
          {
            headers: {
              Authorization:'JWT '+ localStorage.getItem('token'),
              'Access-Control-Allow-Origin': '*'                       
            }
          }
          )
        .then((response) => {
          data.value = response.data

          for (let i of data.value) {
            subList.value.push(i) 
          }
          console.log(subList.value)
         
          for(let j of tops.value){ /* loop through list of topics */
          console.log("eneter loop")
          
           
            for(let k of subList.value){ /* inner loop for list of subscribed topics */
              // console.log(k.userId)
              // console.log(j.id)
              if(j.id == k.topicId && k.userId==localStorage.getItem('userId')){ /*if a topic already has a subscription, then set found to true */
                // console.log(j.text)
                 found = true
              }
            }
           
            if(found == false){ /* if found is false, then create a subscription*/
             console.log(found)
              createSubs(j.id)
            }
            else{ /* if found is true, reset it to false*/
              found = false 
            }  
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

  onMounted(() => {
      loadData();
      console.log("hi from main mount")
    })
    

    return {
      join_room,
      test,
      createSubs,
      data, 
      loadData,
      tops,
      tab,
      miniState: ref(true),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      lorem,
      police: ref(false),
       fire: ref(false),
       ambulance: ref(false),
       odpm: ref(false),
      maximizedToggle: ref(false),
    }


  }
})
</script>

<style scoped>
.background{
  background-color: #abe9cd;
background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);

}
</style>

