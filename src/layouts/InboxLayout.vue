<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          SWARNET
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Menu" />
        <q-route-tab  label="Read" />
        <q-route-tab  label="Unread" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <inbox/>
    </q-page-container>

  </q-layout>
</template>

<script >
import Inbox from 'src/pages/Inbox.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
    Inbox
  
},

    setup() {
        
    },
})
</script>
