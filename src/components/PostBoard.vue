<template>
  <div class="q-pa-md" >
    <div>
      <ejs-autocomplete > </ejs-autocomplete>
    </div>
    <q-input 
        filled bottom-slots 
        v-model="lorem" 
        label="Search board" 
         
        type="text"
        :rules="[val => !!val || 'Field is required']"
        color="pink" 
        style="max-width: 600px"
        >         
        <template v-slot:prepend>           
          <q-icon name="search" />
                   
        </template>

        <template v-slot:append>           
          <q-icon name="close" @click="lorem = ''" class="cursor-pointer" />         
        </template>
      </q-input>

      <q-toggle
        v-model="subbed"
        checked-icon="check"
        color="red"
        unchecked-icon="clear"
        v-on:click="showNotif"
      />
    
    <q-btn fab flat round icon="far fa-edit" color="accent" size="xs" fab-mini @click="fixed = true"/>

     <q-dialog v-model="fixed">
      <q-card style="width: 600px; height: 400px; background-color: powderblue;">
        <q-card-actions>
          <q-btn-dropdown color="primary" label="TOPICS">
            <q-list v-for="topic in tops" :key="topic.id">
              <q-item clickable v-close-popup >
                <q-item-section>
                  <q-item-label>{{topic.text}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-actions>

        <q-card-section>
          <div class="text-h6">NEW DISCUSSION FOR {{tab}}</div>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: 200px" class="scroll" counter maxlength="260">
          <q-input placeholder="Enter Post Here!" type="textarea" v-model="text" counter maxlength="260"  autogrow>
          </q-input>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Discard" color="primary" @click="text = ''" v-close-popup />
          <q-btn flat label="Post" color="primary" v-close-popup @click="triggerPositive(); text = '';"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
      <div>
      <!--- <q-btn  flat round color="primary" icon="fas fa-sync-alt" /> --->
      </div>  
    
    <div class="q-pa-md" id= "clear" >
    <q-list bordered padding separator >
      
      <q-item 
        v-for="(post, index) in pos" 
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

          <div class=" q-gutter-md">
            
            <q-chip  v-for="tag in posTags[index]" :key="tag"
                     square color="purple-2" text-color="white" icon="sell" size="md">     
                {{tag.text}}
            </q-chip>
            
           </div>

          <div class="row justify-between q-mt-sm">
                <q-btn @click.prevent flat round color="grey" icon="fas fa-comments" size="sm" />
                <q-btn @click.prevent flat round icon="far fa-eye" size="sm"/>
                <q-btn @click.prevent flat round  size="sm"
                   
                     icon="far fa-heart"
                    v-bind:class="{'white': !this.data.clicked, 'blue': this.data.clicked}"
                    v-on:click ="this.data.clicked = !this.data.clicked" 
                     />
                
          </div> 
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> {{post.created}} </q-item-label>
        </q-item-section>
        
      
      </q-item>
      
    </q-list>

    <br>
    
    </div>
    

</template>

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted, onUpdated} from 'vue'




export default defineComponent({
  name: 'PostBoard',

  props:['tabText'],

  data(){
        return {
          topic: this.$route.params.props,
         
           
          }
        
     },
  

  setup (props) {
    const $q = useQuasar()
    const data = ref(null)
    const tops = ref([])
    const pos = ref([])
    const  subbed = ref(true)
    const model = ref(null)
    const posTags = ref([])
    const tab = ref('flooding')
    const comments = ref([])
    const lorem = ref('')


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
      
      /* console.log( tops.value[0].text) */
       console.log(tops) 
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

  function getDetails(topic){
      pos.value.splice(0)

      // posTags.splice(0);

      console.log(topic)
        console.log(comments.value)
         let url = "https://swarmnet-staging.herokuapp.com/posts"
         console.log(url)
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            console.log(pos.value)

            for (let i of data.value) { 
              
              if(i.topicId == parseInt(topic)){
                console.log("entered")
               pos.value.push(i)
               posTags.value.push(i.tags)
              for(let j of comments.value){
                if(i.id == j.id ){
                  pos.value.pop()
                  posTags.value.pop()
                }
               }
              }
            }
            console.log(pos.value)
            
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

  function displayAllPost(){
        let curl = "https://swarmnet-staging.herokuapp.com/replies"
          api.get(curl,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            
           for (let i of data.value) { 
               comments.value.push(i)
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

          console.log(comments.value)
    
         let url = "https://swarmnet-staging.herokuapp.com/posts"
         
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            
           for (let i of data.value) { 
             pos.value.push(i)
             posTags.value.push(i.tags)
             for(let j of comments.value){
               if(i.id == j.id){
                 pos.value.pop()
                 posTags.value.pop()
               }
              
             }
            }
            console.log(pos.value)
           
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

  function postPost(){
    let url = "https://swarmnet-staging.herokuapp.com/posts"
         
          api.get(url,{
          method: 'POST',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            if(response.data == "Created"){
              triggerPositive ();
              setTimeout(() => {
                displayAllPost();    
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

  onMounted(() => {
      loadData();
      displayAllPost(); 
    })
  
  onUpdated(()=> {
    console.log(props.tabText)
    getDetails(props.tabText);
  })
 
  

    return {
        data, 
        loadData,
        displayAllPost,
        tops,
        pos,
        posTags,
        getDetails,
        lorem,
        
        model,
        subbed,
        fixed: ref(false),
        text: ref(''),
        ph: ref(''),
        dense: ref(false),
        tab,
    
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


<style>
@import "/workspace/swarm-client//node_modules/@syncfusion/ej2-base/styles/material.css";
@import "/workspace/swarm-client//node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "/workspace/swarm-client//node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>








