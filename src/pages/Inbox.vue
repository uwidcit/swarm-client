<template>

  <q-btn  class="glossy" push round color="primary" icon="delete_forever"  style= " position: absolute; right: 16px;" 
    @click="clearcontent('clear')" />
    <br>
    <br>
  
  <div  class="q-pa-md" id="clear" >
       
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
                     square color="green-3" text-color="white" icon="sell" size="md">     
                {{tag.text}}
            </q-chip>

            <q-btn @click.prevent flat round icon="delete_forever"  color="green-3" 
                   style= " position: absolute; right: 16px;" size="md" 
                   @click="deletePost(post.id)"
                   />
            
           </div>

        </q-item-section>

        <q-item-section side top>
          <q-item-label caption> 
            {{datePassed(post.created)}} </q-item-label>
        </q-item-section>
        
      
      </q-item>
      
    </q-list>

    <br>
    
    </div>

</template>

<script>
import { io } from "socket.io-client";
import {ref} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted, onUpdated} from 'vue'
import { formatDistance} from 'date-fns'


export default {
    name: 'Inbox',

    methods:{
        clearcontent: function (elementID) {
            document.getElementById(elementID).innerHTML = "";
        }

    },

   

    setup(){
    const $q = useQuasar()
    const data = ref(null)
    const tops = ref([])
    const tab = ref('flooding')
    const pos = ref([])
    const posTags = ref([])
    const socket = io ('https://swarmnet-staging.herokuapp.com',{upgrade:false})
   

    function datePassed(time) {
      console.log(Date.parse(time))
      console.log(formatDistance(Date.parse(time), new Date(), { addSuffix: true }))
        return formatDistance(Date.parse(time), new Date(), { addSuffix: true })
    }

    function loadData () {
    api.get('https://swarmnet-staging.herokuapp.com/inbox',{
  method: 'GET',
  
  headers: {
          Authorization:'JWT '+ localStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*',

        }
    })
      .then((response) => {
        data.value = response.data
        for (let i of data.value) {  /* unshift() function adds items to the start of an array. */
             pos.value.unshift(i.post)  
             posTags.value.unshift(i.post.tags)
             
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
 
   function deletePost(id){
     console.log(id)
     console.log(pos)
     
     var loc = 0;
     for (let i of pos.value) { 
       if(i.id == parseInt(id)){
         console.log(i.id)
         pos.value.splice(loc, 1);
       }
       loc += 1
      }

      console.log(pos.value)  

   }

   
  socket.on("connect", () =>{
        
  })

  function getRooms(){
    
        api.get('https://swarmnet-staging.herokuapp.com/users/subscriptions',{
          method: 'GET',
          headers: {
          Authorization:'JWT '+ localStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*'}
        })

        .then(response => {
          
           for (let r of response.data){
            socket.emit('join', {'room': r.topicId.toString(), 'userID': '2'})
          }
        })
  }
  getRooms()


    socket.on("client_connect",data =>{
        console.log(data)
    })
    

    socket.on("message", data =>{
        console.log('hello')
        console.log(data)
    })
    
     socket.on("update",data =>{
       console.log(data)
       pos.value.unshift(data.data)
       posTags.value.unshift(data.data.tags)

    })
    

  onMounted(() => {
      loadData();
    })
  
  onUpdated(() => {
    deletePost();

  })



    return {
      data,
      datePassed, 
      loadData,
      deletePost,
      tops,
      tab,
      pos,
      posTags,
      
     
  }
 }
}

</script>

<style></style>