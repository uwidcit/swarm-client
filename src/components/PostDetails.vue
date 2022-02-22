<template>

<div class="q-pa-md" >
    <q-list bordered padding>

      <q-item >
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> <strong> {{title}} </strong></q-item-label>
          <br/>

           <div class=" q-gutter-md">
            <q-chip square color="purple-2" text-color="white" icon="sell" size="md"
                    v-for="tags in postTags" 
                    :key="tags.id">
              {{tags.text}}
            </q-chip>
           </div>

          <div class="row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="fas fa-comments" size="sm" />
                <q-btn flat round icon="far fa-eye" size="sm"/>
                <q-btn flat round icon="far fa-heart" size="sm" />
                
          </div> 
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
        
      </q-item>
    </q-list>
</div>

<div  style="margin-left: 40px; max-height: 100px" class="q-pa-md">
    <div class="q-pa-md" >
    <q-list bordered padding separator>
      <q-item 
      v-for="(c, index) in comments" 
      :key="c.id"  
      active-class="q-item-no-link-highlighting">
      
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>  {{c.text}} </q-item-label>
          <br>

          <div class=" q-gutter-md">
            <q-chip square color="purple-2" text-color="white" icon="sell" size="md"
                    v-for="tag in commTags[index]" 
                    :key="tag">
              {{tag.text}}
            </q-chip>
           </div>

          <div class="row justify-between q-mt-sm" >
                <q-btn flat round color="grey" icon="fas fa-comments" size="sm" @click="showComments(c.id)"/>
                <q-btn flat round icon="far fa-eye" size="sm"/>
                <q-btn flat round icon="far fa-heart" size="sm" />
          </div> 
        </q-item-section>
         <q-item-section side top>
          <q-item-label caption> {{c.created}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </div>
</div>


</template>

<script>
import { ref, defineComponent, watch } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Vue from 'vue'
import CommentGrid from 'vue-comment-grid'

export default defineComponent({
    
     name: 'PostDetails',

     data(){
        return {PostId: this.$route.params.id}
     },
    

     setup() {
    const router = useRouter()
    const route = useRoute()
    const userData = ref()
      const $q = useQuasar()
      const data = ref(null)
      const posts = ref([])
      const title = ref("")
      const comments = ref([])
      const postTags = ref([])
      const commTags = ref([])

      function loadPosts(){
         
         let url = "https://swarmnet-staging.herokuapp.com/posts/" + route.params.id
         
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            posts.value.push(data.value) 
            
           /* for (let i of data.value) { 
              pos.value.push(i)
            
            } */
          
          title.value = posts.value[0].text
          postTags.value = posts.value[0].tags
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

      function loadComments(){
         
         let url = "https://swarmnet-staging.herokuapp.com/replies"
         
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            
            
            for (let i of data.value) { 
                if(i.originalPostId == route.params.id){
                  comments.value.push(i)
                  commTags.value.push(i.tags)
                }
            } 
          
           console.log( "Tags ")
          console.log(commTags.value)
          
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

      function showComments(id){
        this.comments.slice(0);

         let url = "https://swarmnet-staging.herokuapp.com/replies"
         
          api.get(url,{
          method: 'GET',
          
          headers: {
                  'Access-Control-Allow-Origin': '*'
                }
            })
          .then((response) => {
            data.value = response.data
            
            
            for (let i of data.value) { 
                if(i.originalPostId == id){
                  comments.value.push(i)
                  commTags.value.push(i.tags)
                }
            } 
          
           console.log( "Tags ")
          console.log(commTags.value)
          
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
      loadPosts();
      loadComments();
    })

    return {
        data, 
        loadPosts,
        posts,
        title,
        comments,
        postTags,
        commTags,
        showComments
    }
        
    },
})
</script>