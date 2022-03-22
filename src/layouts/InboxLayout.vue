<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff"  class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-10">
        <q-toolbar>
          <q-toolbar-title>Swarn Net</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item to='/home' active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
               Home
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Cels Lewis</div>
            <div>@cels_lewie</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <inbox/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Inbox from 'src/pages/Inbox.vue'
import { ref } from 'vue'
export default {
  components: { Inbox },

   setup () {
    return {
      drawer: ref(false)
    }
  }
  
}
</script>