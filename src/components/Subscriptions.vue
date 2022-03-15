<template>
  <div v-for="(sub, index) in subs" 
        :key="index">
      <q-chip class="glossy" color="orange" text-color="white" icon="star">
        {{sub}}
      </q-chip>
  </div>
</template>

<script>

import {defineComponent, defineAsyncComponent, ref} from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { onMounted, onActivated} from 'vue'
export default {
     name: 'Subscription',

     setup(){
        const $q = useQuasar()
        const data = ref(null)
        const d = ref(null)
        const subs = ref([])


        function loadSub () {
            subs.value.splice(0)

        api.get('https://swarmnet-staging.herokuapp.com/users/1/subscriptions',{
            method: 'GET',
            
            headers: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization:'JWT '+ localStorage.getItem('token'),
                    }
                })
        .then((response) => {
            data.value = response.data
            
            for (let i of data.value) { 
                if(i.status == true){
                let url = "https://swarmnet-staging.herokuapp.com/topics/" + i.topicId
                api.get(url,{
                method: 'GET',})
                .then((res)=>{
                    d.value = res.data
                    subs.value.push(d.value.text)
                    
                }).catch(() => {
                    $q.notify({
                    color: 'negative',
                    position: 'top',
                    message: 'Loading failed',
                    icon: 'report_problem'
                    })
                })
            }
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
        loadSub();
    })
    onActivated(()=>{
        loadSub();
    })
    

        return {
        data, 
        d,
        loadSub,
        subs,
    }
    }

}
</script>

<style>

</style>