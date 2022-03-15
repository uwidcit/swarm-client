<template>
  <div >
    <div :style="indent" @click="toggleChildren" id="rcorners3">
      <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar> {{ label }}
      <div class="row justify-between q-mt-sm">
          <q-btn @click.prevent flat round color="grey" icon="fas fa-comments" size="sm"/>
          <q-btn @click.prevent.stop flat round icon="far fa-eye" size="sm"/>
          <q-btn @click.prevent.stop flat round icon="far fa-heart" size="sm" />
          <q-btn @click.prevent.stop flat round icon="fas fa-plus-circle"   @click="toggleReplies(), createNewComment()" />
          </div> 
      </div>

      <div v-if="createReply" id="newreply" :style="indent" :depth="depth + 1">
        <q-input  placeholder="Add comment..." v-model="text" counter maxlength="260" autogrow :dense="dense">
        <template v-slot:after>
          <q-btn round dense flat icon="send" />
        </template>
        </q-input>
      </div>


    <comments
      v-if="showChildren"
      v-for="(node, index) in nodes" 
      :key="index"
      :nodes="node.nodes" 
      :label="node.text"
      :depth="depth + 1"
    >
    </comments>
  </div>
</template>


<script>

  export default { 

    props: [ 'label', 'nodes', 'depth' ],
   
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
      console.log(props.nodes)
      
      function createNewComment(){
        console.log("creating new comment")
        
      }
    

    return{
      createNewComment,
    }

  }
  }
</script>
<style>
#rcorners3 {
  margin-bottom: 10px;
  width: fit-content;
  height: fit-content;
  border: 2px solid #ADD8E6;
  border-radius: 12px;
  padding: 5px;

}
#newreply {
  background-color: Gainsboro;
  margin-bottom: 10px;
  width: fit-content;
  height: fit-content;
  border: 2px solid Gainsboro;
  border-radius: 12px;
  padding: 5px;
  position: relative;
  left: 40px;

}
</style>

