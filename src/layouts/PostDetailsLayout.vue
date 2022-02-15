<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevatedclass="bg-primary text-white">
       <q-toolbar class="glossy">

     <q-space/>

      <div class="q-gutter-sm row items-center no-wrap ">
         
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>

          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-primary text-white">
      <!-- drawer content -->

    <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="menu"/>
          </q-item-section>
          <q-item-section>
            <q-item-label><strong>SWARNET</strong></q-item-label>
          </q-item-section>
        </q-item>

        <q-separator color="orange" inset />
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