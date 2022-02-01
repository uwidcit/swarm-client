<template>
  <div class="q-pa-md">
    <h3 text-weight-bold >Create Topic</h3>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        style="max-width: 400px"
        filled
        v-model="topic_title"
        label="Enter Topic Title *"
        hint="Topic Title"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />


      <q-toggle v-model="accept" label="I accept the terms and conditions" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const topic_title = ref(null)
    const accept = ref(false)

    return {
      topic_title,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the terms and conditions',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          })
        }
        else {
          $q.notify({
            color: 'primary',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        post_title.value = null
        accept.value = false
      }
    }
  }
}
</script>