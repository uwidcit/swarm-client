<template>
  <div class="q-pa-md" >
    <div class="q-gutter-md row items-start">
      <q-select
        color="pink"
        filled
          v-model="model"
          map-options
          emit-value
          option-value="id"
          option-label="text"
          :options="tops"
        label="Select a topic: "
        style="width: 250px"
      />

      <q-btn flat round color="primary" icon="fas fa-filter" @click="getDetails" />
      <q-btn flat round color="primary" icon="fas fa-sync-alt" />
    </div>
    </div>


    <div class="q-pa-md" >
    <q-list bordered padding separator>
      <q-item 
      v-for="post in pos" 
      :key="post.id" 
      :to="`/Details/${post.id}`" 
      active-class="q-item-no-link-highlighting">
      
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> <strong> {{post.text}} </strong></q-item-label>

          <div class="row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="fas fa-comments" size="sm" />
                <q-btn flat round icon="far fa-eye" size="sm"/>
                <q-btn flat round icon="far fa-heart" size="sm" />
                <q-btn-dropdown  flat icon="fas fa-hashtag" size="sm">
                    <q-list separator>
                      <q-item  v-close-popup 
                                v-for="tag in posTags" 
                                :key="tag" >
                        <q-item-section >
                          <q-item-label>{{tag.text}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                
          </div> 
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> {{post.created}} </q-item-label>
        </q-item-section>
        
       
      </q-item>
    </q-list>

    <br>
    
    </div>


    <q-page-sticky position="bottom-right" :offset="[2, 80]">
      <q-toggle
        v-model="subbed"
        checked-icon="check"
        color="red"
        unchecked-icon="clear"
        v-on:click="showNotif"
      />
      
    </q-page-sticky>

    <q-page-sticky position="bottom-right" :offset="[5, 18]">
      <q-btn fab icon="far fa-edit" color="accent" @click="fixed = true"/>
    </q-page-sticky>

    <q-dialog v-model="fixed">
      <q-card style="width: 600px; height: 400px; background-color: powderblue;">
        <q-card-section>
          <div class="text-h6">NEW DISCUSSION</div>
        </q-card-section>
        
        <q-card-section>
        <q-input filled  v-model="ph" placeholder="Enter Title of Post"  />
        </q-card-section>
      
        <q-separator />

        
        <q-card-section style="height: 200px" class="scroll" counter maxlength="260">
          <q-input type="textarea" v-model="text" counter maxlength="260"  autogrow>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Discard" color="primary" @click="text = ''" v-close-popup />
          <q-btn flat label="Post" color="primary" v-close-popup @click="triggerPositive(); text = '';"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    

</template>

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted} from 'vue'

export default defineComponent({
  name: 'PostBoard',

  props: ['tpost'],

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
    addNewPost() {
      let newTweet = {
        content: this.newPostContent,
        date: Date.now(),
      };
      this.tweets.unshift(newTweet);
      this.newPostContent = "";
    },
  }, 
  setup () {
    const $q = useQuasar()
    const data = ref(null)
    const tops = ref([])
    const pos = ref([])
    const  subbed = ref(true)
    const model = ref(null)
    const posTags = ref([])

  function loadData () {
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
      
      /* console.log( tops.value[0].text)
       console.log(tops) */
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

  function getDetails(){
         let url = "https://swarmnet-staging.herokuapp.com/posts/" + model.value.toString()
         console.log(url)
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            console.log(data.value)
            pos.value.push(data.value) 

            posTags.value = pos.value.tags
            console.log(pos.value.tags)
            
           /* for (let i of data.value) { 
              pos.value.push(i)
            
            } */
          
          console.log( "hi")
          console.log(pos) 
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

  function  showNotif () {
         if (subbed.value == true){
           $q.notify({
          message: 'SUBSCRIBBED',
          color: 'primary',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
         }
        
       }

  onMounted(() => {
      loadData();
    })

    return {
        data, 
        loadData,
        tops,
        pos,
        posTags,
        getDetails,
        
        model,
        subbed,
        fixed: ref(false),
        text: ref(''),
        ph: ref(''),
        dense: ref(false),
    
       showNotif,


      triggerPositive () {
        $q.notify({
          type: 'positive',
          message: 'DISCUSSION POSTED'
        })
        // simulate delay
        setTimeout(() => {
          notif({
            type: 'positive',
            message: 'Found the results that you were looking for',
            timeout: 1000
          })
        }, 4000)
      }
      
    }
  }
})
</script>