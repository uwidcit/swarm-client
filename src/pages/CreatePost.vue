<template>
  <div class="q-pa-md">
    <h3 text-weight-bold >Create Post</h3>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        style="max-width: 400px"
        filled
        v-model="post_title"
        label="Enter Post Title *"
        hint="Post Title"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        style="max-width: 400px "
        label="Enter Post *"
         v-model="post_details"
         filled
         type="textarea"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        style="max-width: 400px"
        @update:model-value="val => { files = val }"
        multiple
        filled
        type="file"
        hint="Multiple Native files"
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

    const post_title = ref(null)
    const post_details = ref(null)
    const accept = ref(false)

    return {
      post_title,
      post_details,
      files: ref(null),
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the terms and conditions first',
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
        post_details.value= null
        accept.value = false
      }
    }
  }
}
</script>