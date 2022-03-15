<template>
  <div class="q-pa-md" >

    <div class="q-gutter-md row">
      <q-select
        filled
        :model-value="automodel"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input-value="setModel"
        style="width: 350px; padding-bottom: 32px"
        @click="searchByTags(options.values)"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>

        <template v-slot:prepend>           
          <q-icon name="search" />          
        </template>


      </q-select>
    </div>

      <q-toggle
        v-model="subbed"
        checked-icon="check"
        color="red"
        unchecked-icon="clear"
        v-on:click="showNotif"
      />
    
    <q-btn fab flat round icon="far fa-edit" color="accent" size="xs" fab-mini @click="fixed = true"/>

     <q-dialog v-model="fixed" no-refocus>
      <q-card style="width: 600px; height: 400px; background-color: powderblue;">
        <q-card-actions>
          <q-btn-dropdown color="primary" label="TOPICS" >
            <q-list v-for="topic in tops" :key="topic.id">
              <q-item clickable v-close-popup @click="ptabtext= topic.text , ptopid= topic.id">
                <q-item-section>
                  <q-item-label>{{topic.text}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-actions>

        <q-card-section>
          <div class="text-h6">New Discusssion For {{ptabtext}} </div>
        </q-card-section>
        <q-separator />

        <q-card-section style="height: 120px" class="scroll" counter maxlength="260">
          <q-input placeholder="Enter Post Here!" type="textarea" v-model="text" counter maxlength="260"  autogrow>
          </q-input>
        </q-card-section>

        <q-separator/>

        <q-card-actions> 
          <div style="min-width: 250px; max-width: 300px">
            <q-select
              filled
              v-model="modelMultiple"
              multiple
              :options="options"
              use-chips
              stack-label
              label="Please select tags .."
            />
      </div>
        </q-card-actions>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Discard" color="primary" @click="text = ''" v-close-popup />
          <q-btn flat label="Post" color="primary" v-close-popup @click="postPost(text, modelMultiple); text = '';"/>
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
import {defineComponent, ref} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted, onUpdated} from 'vue'

export default defineComponent({
  name: 'PostBoard',

  props:['tabText'], 

  setup (props) {
    const $q = useQuasar()
    const data = ref(null)
    const tops = ref([])
    const pos = ref([])
    const subbed = ref(false)
    const model = ref(null)
    const posTags = ref([])
    const tab = ref('flooding')
    const comments = ref([])
    const ptabtext = ref('')
    const ptopid = ref('')
    const searchtags = ref([])
    const automodel = ref(null)
    const options = ref(searchtags)
    const subID = ref('')

    /* gets topics to use for q-dialog */
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
          if(i.topicId == parseInt(topic)){
            pos.value.unshift(i)
            posTags.value.unshift(i.tags)
          for(let j of comments.value){
            if(i.id == j.id ){
              pos.value.shift()
              posTags.value.shift()
            }
            }
          }
        }

        console.log(pos.value)

        for(let j of tops.value){
          if(j.id == parseInt(props.tabText)){
            ptabtext.value = j.text
          }     
        }   
        
        subsStatus(props.tabText);
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

    function searchByTags(topicNmae){
      console.log("function called")
      console.log(topicNmae)
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
              for(let k of i.tags){
                if(searchtags.value.indexOf(k.text) == -1){
                  searchtags.value.push(k.text)
                  console.log(k.text)
                }
            }
              pos.value.unshift(i)
              posTags.value.unshift(i.tags)
              for(let j of comments.value){
                if(i.id == j.id){
                  pos.value.shift()
                  posTags.value.shift()
                }  
              }
              }
              console.log(posTags.value)
            
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
    
  /* toggles subscription status */
    function  showNotif () {
      console.log(subID.value)
        let url = `https://swarmnet-staging.herokuapp.com/subscriptions/${subID.value}/status`
        console.log(url)
        api.put(url,{
          subId: subID.value
        },
        {
            method: 'PUT',
            
            headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization:'JWT '+ localStorage.getItem('token'),
                    }
                })
          .then((response) => { 
              if(response.status == 200){
                let staturl = "https://swarmnet-staging.herokuapp.com/subscriptions/" + subID.value
                api.get(staturl,{
                method: 'GET',
                
                headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization:'JWT '+ localStorage.getItem('token'),
                        }
                    })
                    .then((response) => {
                        data.value = response.data
              
                            if(data.value.status == true){
                              $q.notify({
                                  message: 'SUBSCRIBBED',
                                  color: 'primary',
                                  avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
                                  actions: [
                                    { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                                  ]
                                })
                              subbed.value = true;
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
    
    /* creates new post using q-dialog*/ 
    function postPost(text, tags){
      if(ptopid.value == ''){
        ptopid.value = props.tabText
      }

      let url = "https://swarmnet-staging.herokuapp.com/posts"
          
            api.post(url,{
              topic_id: ptopid.value,  
              text: text,
              tags: tags,
              composed: "2022-03-02T14:48:00Z"
              },
              {
                headers: {
                  Authorization:'JWT '+ localStorage.getItem('token'),
                  'Access-Control-Allow-Origin': '*'
                  
                }
              }
              )
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

   /* displays subscription status when topic post load */
    function subsStatus(id){
      let found = false
      api.get('https://swarmnet-staging.herokuapp.com/users/1/subscriptions',{
      method: 'GET',
      
      headers: {
              'Access-Control-Allow-Origin': '*',
              Authorization:'JWT '+ localStorage.getItem('token'),
              }
          })
          .then((response) => {
              data.value = response.data
              
              for(let i of data.value){
                if(i.topicId == id){
                  console.log("subscription already created")
                  subID.value = i.id;
                  found = true;

                  if(i.status == true){
                    console.log(true)
                    subbed.value = true;
                  }
                  else{
                    subbed.value = false;
                  }
                  
                }
              }
              /* subscription not found, create one */
              if(found == false){
                console.log("subscription does not exist")
                subbed.value = false;
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
                     subbed.value = false;
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
      displayAllPost();
      loadData(); 
    })
  
  onUpdated(()=> {
    getDetails(props.tabText); 
  })
 

    return {
      modelMultiple: ref(),
      automodel,
      options,
      searchtags,

      filterFn (val, update, abort) {
        update(() => {
          const needle = val.toLocaleLowerCase()
          options.value = searchtags.value.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
        })
      },

      setModel (val) {
        automodel.value = val
      },
        searchByTags,
        data, 
        displayAllPost,
        loadData,
        tops,
        pos,
        posTags,
        getDetails,
        ptabtext,
        postPost,
        ptopid,
        subsStatus,
        
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









