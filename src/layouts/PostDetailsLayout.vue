<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-light-blue-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Swarn Net
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay class="bg-light-blue-7">
      <!-- drawer content -->

    <div class="q-py-md q-px-lg q-gutter-sm column items-center">
      <q-btn color="teal" push>
      <div class="row items-center no-wrap">
        <q-icon left name="fas fa-arrow-circle-left" />
        <div class="text-center">
          Main<br>Feed
        </div>
      </div>
      </q-btn>

      <br>
      <q-item to="/" active-class="q-item-no-link-highlighting" style="bg-teal">
          <q-item-section avatar>
            <q-icon name="fas fa-donate"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Request Donations</q-item-label>
          </q-item-section>
        </q-item>

      <br>
      <q-btn color="teal" push >
      <div class="row items-center no-wrap">
        <q-icon left name="far fa-edit" />
        <div class="text-center">
          Create<br>Subtopic
        </div>
      </div>
    </q-btn>
    </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PostDetailsLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>