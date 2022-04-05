<template>
  <div >
    <div class="q-mr-sm " :style="indent" @click="toggleChildren" id="rcorners3" >
      
      <span >
        <q-avatar >
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            {{ label }}
      </span>
      
          <span style="postiton: right">
            <q-btn @click.prevent flat round color="grey" icon="fas fa-comments" size="sm" />
            <q-btn @click.prevent.stop flat round icon="fas fa-plus-circle"   @click="toggleReplies()" />
          </span>
      </div>

      <div v-if="createReply" id="newreply" :style="indent" :depth="depth + 1" style="min-width: 250px; max-width: 700px">
        <q-input  placeholder="Add comment..." v-model="text" counter maxlength="260" autogrow :dense="dense">
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="createNewComment(text)" />
          <q-btn round dense flat icon="cancel" @click="createNewComment(text)" />
        </template>
        <template v-slot:under>
          <q-btn round dense flat icon="send" @click="createNewComment(text)" />
          <q-btn round dense flat icon="cancel" @click="createNewComment(text)" />
        </template>
        </q-input>

      </div>


    <comments
      v-if="showChildren"
      v-for="(node, index) in nodes" 
      :key="index"
      :nodes="node.replies" 
      :label="node.text"
      :depth="depth + 1"
      :id="node.id"
      :topic="node.topicId" 
    >
    </comments>
  </div>
</template>


<script>
import {ref, inject} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

  export default { 

    props: [ 'label', 'nodes', 'depth', 'id', 'topic' ],
   
    data() {
      return { 
        showChildren: false,
        createReply: false
       }
    },
    name: 'comments',
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 50}px)` }
      }
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
        console.log(this.showChildren.valueOf(this.showChildren))
      },
      toggleReplies() {
        this.createReply = !this.createReply;
        console.log(this.createReply.valueOf(this.createReply))
      }
    },

    setup(props) {
      const text = ref('')
      const $q = useQuasar()
      
      function createNewComment(message){
        console.log("creating new comment")
        console.log(message)

      /*  api.post("https://8080-uwidcit-swarmnetbackend-c20l2b6i6kj.ws-us38.gitpod.io/replies", {
          "topic_id": props.topic,
          "text": message,
          "replyTo": props.id,
          "tags": [],
          "composed": "2011-10-10T14:48:00Z"
        },{
          headers: {
            Authorization:'JWT '+ localStorage.getItem('token'),
            'Access-Control-Allow-Origin': '*'   
          }
          }).then((response) => {
            if(response.status == 200){
              showChildren = true

              /* notify user 
              $q.notify({
              type: 'positive',
              message: 'COMMENT POSTED'
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
     
    })
          .catch(() => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Incorrect e-mail or password!',
              icon: 'report_problem'
            })
          })
       
      
           */
      }

    return{
      createNewComment,
      text,
    }

  }
  }
</script>
<style>
#rcorners3 {
  margin-bottom: 10px;
  
  width:100vw;
  height: fit-content;
 
  border-radius: 12px;
  margin-right: 10px;

}
#newreply {
  background-color: Gainsboro;
  margin-bottom: 10px;
  height: fit-content;
  border: 2px solid Gainsboro;
  border-radius: 12px;
  padding: 5px;
  position: relative;
  left: 40px;
}

</style>

