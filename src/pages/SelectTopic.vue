<template>
  <q-page class="q-pa-sm bg-image">
    <q-list>
      <q-item>
        <q-item-section class="text-h4 text-weight-bold text-white">Select a topic to start discussion</q-item-section>
        </q-item>
      <q-item>
      <q-item-section avatar>
          <q-icon name="fas fa-plus-circle" size="md" color="red"/>  
        </q-item-section>
        <q-item-section class="text-h6 text- text-weight-bold text-white">Select to create Topic</q-item-section>
        </q-item>

    </q-list>
  <div class="q-pa-md  height:100%;">
    <div class="btn row justify-evenly q-pa-sm">
      <q-btn color="blue" rounded label="Hurricane" style="width: 15%" to="/CreatePost" class="q-mt-md q-mr-sm">
      <q-tooltip class="bg-accent">Select to make new Hurricane post</q-tooltip>
      </q-btn>
      <q-btn color="blue" rounded label="Flooding" style="width: 15%" to="/CreatePost" class="q-mt-md">
      <q-tooltip class="bg-accent">Select to make new Flooding post</q-tooltip>
    </q-btn>
    </div>
    <div class="row justify-evenly q-pa-sm">
      <q-btn color="blue" rounded label="Fire" style="width: 15%" to="/CreatePost" class="q-mt-md">
      <q-tooltip class="bg-accent">Select to make new Fire post</q-tooltip>
      </q-btn>
      <q-btn color="blue" rounded label="Earthquake" style="width: 15%" to="/CreatePost" class="q-mt-md">
      <q-tooltip class="bg-accent">Select to make new Earthquake topic</q-tooltip>
    </q-btn>
    </div>   


    <div class="row justify-evenly q-pa-sm">
      <q-btn color="blue" rounded label="Volcano" style="width: 15%" to="/CreatePost" class="q-mt-md">
      <q-tooltip class="bg-accent">Select to make new Volcanic Eruption post</q-tooltip>
      </q-btn>
      <q-btn color="blue" rounded label="Land Slide" style="width: 15%" to="/CreatePost" class="q-mt-md">
      <q-tooltip class="bg-accent">Select to make new Land Slide post</q-tooltip>
    </q-btn>
    </div>

    <div class="row justify-evenly q-pa-sm">
      <q-btn color="red" to="/CreateTopic" icon ="add" fab>
      <q-tooltip class="bg-indigo">Select to add new Topic</q-tooltip>
    </q-btn>
    </div>
          
  </div>
   </q-page>
</template>

<script>

</script>

<style>
  .bg-image {
    background-image: url("~assets/ND.jpg");
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>