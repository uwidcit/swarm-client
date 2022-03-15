<template >
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-card class="my-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        
      </q-item>

      <q-separator />
        
        <q-item-section>
          <q-item-label >Title</q-item-label>
          <q-item-label caption>Subhead</q-item-label>
        </q-item-section>

    </q-card>

      <q-tabs align="left"  vertical>
        <q-route-tab to="/home" label="Home" />
        <q-route-tab  label="Inbox" />
        <q-route-tab  label="Read" />
      </q-tabs>
    </q-drawer>

    <q-page-container>
      <inbox/>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import Inbox from 'src/pages/Inbox.vue'
import { defineComponent } from 'vue'
export default defineComponent({

  components: {
    Inbox
},

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})

</script>

<style>
.bg-purple {
    color: #fff;
    background: -webkit-linear-gradient(110deg, #a60af3 40%, rgba(0, 0, 0, 0) 30%), -webkit-radial-gradient(farthest-corner at 0% 0%, #7a00cc 70%, #c03fff 70%);
    background: -o-linear-gradient(110deg, #a60af3 40%, rgba(0, 0, 0, 0) 30%), -o-radial-gradient(farthest-corner at 0% 0%, #7a00cc 70%, #c03fff 70%);
    background: -moz-linear-gradient(110deg, #a60af3 40%, rgba(0, 0, 0, 0) 30%), -moz-radial-gradient(farthest-corner at 0% 0%, #7a00cc 70%, #c03fff 70%);
    background: linear-gradient(110deg, #a60af3 40%, rgba(0, 0, 0, 0) 30%), radial-gradient(farthest-corner at 0% 0%, #7a00cc 70%, #c03fff 70%);
}
</style>