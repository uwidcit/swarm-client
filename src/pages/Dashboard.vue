<template>
  <q-page class="q-pa-sm">

    <div class="q-gutter-y-md column" > 
      <q-input filled bottom-slots v-model="text" label="Search forum" :dense="dense">         
        <template v-slot:prepend>           
          <q-icon name="search" />         
        </template>         
        <template v-slot:append>           
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />         
          </template>
      </q-input>
     </div>

     <br>

    <div class="q-pa-md" >
    <div class="q-gutter-md row items-start">
      <q-select
        filled
        v-model="model"
        :options="options"
        label="Select a topic: "
        style="width: 250px"
      />

      <q-btn flat round color="primary" icon="fas fa-filter" @click="getTopics" />
      <q-btn flat round color="primary" icon="fas fa-sync-alt" />
    </div>
    </div>

  <div class="q-pa-md" >
    <q-list bordered padding separator>
      <q-item v-for="post in posts" :key="post.date" to="/PostDetails" active-class="q-item-no-link-highlighting">
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> <strong> {{post.content}} </strong></q-item-label>

          <div class="row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="fas fa-comments" size="sm" />
                <q-btn flat round icon="far fa-eye" size="sm"/>
                <q-btn flat round icon="far fa-heart" size="sm" />
                
          </div> 
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> <timeago :converter="post.date"/> </q-item-label>
        </q-item-section>
        
       
      </q-item>
    </q-list>

    <br>
    
    </div>

      

    <card-social icon_position="left"/>

    <card-charts/>

    <div class="row q-col-gutter-sm  q-py-sm">
      <tab-social/>
      <card-with-image/>
    </div>

    <div class="row q-col-gutter-sm  q-pb-sm">
      <todo-list/>

      <card-time-line/>
    </div>

    <table-visits/>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import timeago from 'vue-timeago3'

export default defineComponent({
  name: 'PageIndex',

  data(){
    return{
      newPostContent:'',
      posts:[
        {
          content:'Update your Disaster Preparedness Kit',
          date:1643636383048
        },
        {
          content:'Gone with the Wind: 318 Roof Destroyed !',
          date:1643636526005
        }
      ]

    }
  },

  methods:{
    async getTopics(){
       const url = "https://swarm-net-staging.herokuapp.com/topics/1"

            try {
            let response = await fetch(url);//1. Send http request and get response
            let result = await response.json();//2. Get data from response
            console.log(result);// 3. Do something with the data
            } 
            catch (e) {
            console.log(e);//catch and log any errors
          }
    },

    relativeDate(value){
      return formatDistance(value, newDate());
    }

  },


  setup() {
    return {
      model: ref(null),

      options: [
        {
          label: 'Flooding',
          description: 'Search engine',
        },
        {
          label: 'Hurricane',
          description: 'Social media',
        },
        {
          label: 'Landslide',
          description: 'Quick updates',
        },
        {
          label: 'Fire',
          description: 'iStuff',
        },
        {
          label: 'Earthquake',
          description: 'Databases',
        }
      ],
  
    }
  },

})
</script>
