<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        
        <q-toolbar-title>
          Swarm Net
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
 
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
    <div class="q-py-md q-px-lg q-gutter-sm column items-center">
    <q-btn  to="/SelectTopic" color="purple-9" label="NEW DISCUSSION" />
    </div>

      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fab fa-wpforms"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>View Post</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-donate"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Request Donations</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/Mail" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-hand-holding-usd"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>Make A Contribution</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-binoculars"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Find Users</q-item-label>
          </q-item-section>
        </q-item>
        
        <q-item to="/CardHeader" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="fas fa-check-square"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Subscriptions</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    <div class="q-pa-md q-gutter-y-sm column items-center absolute-bottom">

    <q-toggle
      :label="pinkModel"
      color="pink"
      false-value="Offline"
      true-value="Online"
      v-model="pinkModel"
    />
       </div>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      pinkModel: ref('Online'),
    }
  }
})
</script>
