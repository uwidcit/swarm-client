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


    function loadData () {
    api.get('https://swarmnet-staging.herokuapp.com/posts',{
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
             
            }
            console.log(pos.value)
      
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
    

  onMounted(() => {
      loadData();
    })
  
  onUpdated(() => {
    deletePost();
  })


    

    return {
      data, 
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


<style>

</style>