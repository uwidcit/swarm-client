<template>
  <q-card class="background">
     <a :href="`/Details/${data.id}`">
    <q-card-section>
      <div class="row">
          <div class="col-8">
          </div>
         <div class="col text-subtitle1 text-justify q-mt-sm">
          {{datePassed()}}
        </div>
      </div>

      <div class="q-pa-md">
        <div class="row">
          <div class="col">
            <q-item-section class="col-4 text-h6"> {{ data.user.name }}</q-item-section>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>         
          </div>
          <div class="col-9 text-h6">
           {{ data.text }}
           <div v-if="data.media.length != 0">      
            <q-carousel
              animated
              swipeable
              navigation
              v-model="slide"
              arrows
              infinite
              v-model:fullscreen="fullscreen"
              >
              <q-carousel-slide v-for="m in data.media" :key="m.id" :name="1" :img-src="m.urlPath" >
              <div class="text-subtitle1">{{ m.filename }}</div>
               </q-carousel-slide>
               <!-- v-for="m in data.media" :key="m.id" 
               <q-carousel-slide :name="m.id" img-src="{{m.url}}" />-->

               <!--<q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
               <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
               <q-carousel-slide :name="1" img-src="https://placeimg.com/500/300/nature" /> Example test   v-for="m in data.media" :key="m.id" -->

               <template v-slot:control>
                <q-carousel-control
                  position="bottom-right"
                  :offset="[18, 18]"
                >
                  <q-btn
                    push round dense color="white" text-color="primary"
                    :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="fullscreen = !fullscreen"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
           </div>


          <!-- <q-img
          src="https://placeimg.com/500/300/nature"
          :ratio="16/9"
        /> place image in post example-->
          </div>
        </div>
        </div>

         <div class="row">
          <div class="col">
          </div>
          <div class="col-9 text-h6">
            <span class="tag tag-blue"
                  v-for="(tag,index) in data.tags" :key="tag">             
                    {{tag.text}}
                
         </span>
          </div>
          </div>
         <!---
          <span class="text-h6 float-right">
              <q-btn label="Details" rounded color="secondary" outline :to="`/Details/${data.id}`"></q-btn>
            </span>   
        --->
   
    </q-card-section>
    </a>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'
import { formatDistance} from 'date-fns'
import { ref } from 'vue'
export default defineComponent({
  name: "CardProduct",

  props: ['data'],

 
  setup(props) {
    const value = Date.now()
    let start = props.data.media[0]
    let test ="https://cdn.quasar.dev/img/mountains.jpg"
    if (start!=null){
      console.log(start.urlPath)
    }
    //console.log(start['filename'])
    //console.log(props.data.media[0])
    function datePassed() {
    //  console.log(Date.parse(props.data.created))
    
  
    //  console.log(formatDistance(Date.parse(props.data.created), new Date(), { addSuffix: true }))
        return formatDistance(Date.parse(props.data.created), new Date(), { addSuffix: true })
    }

    return{
      datePassed,slide: ref(1),fullscreen: ref(false), start
    }
  }
})
</script>

<style scoped>

/* unvisited link */
a:link {
  color: rgb(10, 10, 10);
  text-decoration: none;
}

/* visited link */
a:visited {
  color: black;
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: black;
  text-decoration: none;
}

/* selected link */
a:active {
  color: black;
  text-decoration: none;
}

.background{
background-color: #abe9cd;
background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);

}

.tag {
  align-self: flex-start;
  padding: .25em .75em;
  border-radius: 1em;
  
}

.tag + .tag {
  margin-left: .5em;
}

.tag-blue {
  background-color: #fad0c4;
background-image: linear-gradient(315deg, #fad0c4 0%, #f1a7f1 74%);

}

</style>
