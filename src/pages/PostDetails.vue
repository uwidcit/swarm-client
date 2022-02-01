<template>

<div class="q-pa-md" >
    <q-list bordered padding>

      <q-item >
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label> <strong>Update your Disaster Preparedness Kit </strong></q-item-label>
          <br/>
          <p>Your kit should have emergency supplies that can last about three to four days after an event.  
             Thus, replenishing it often and ensuring that everything in the kit is still sufficient is imperative.
             Here are some things you must have in your emergency kit:
             <br/>
             <li> <strong> Water </strong> </li>
             The ODPM recommends that your emergency kit has “one gallon of water per person per day”.
             This water is meant to keep you hydrated and hygienic in the event that you and your family have no access to water.
             Water storage containers are a great way to keep water stored safely and securely in your home.

            <br/>
            <li><strong> Non-Perishable Food </strong></li>
            The food you need to store has to be well packaged and have a long shelf life.  
            It is also a good option to store food that is filling, think about items such as:   

            <ol>
            <li>Peanut butter</li>
            <li>Tuna </li>
            <li>Dried Foods and Fruits </li>
            <li>Cereals and Snacks </li>
            <li>And any other canned food </li>
            <li>A good practice is to buy one or two items when you do your regular food shop and your stock will continually grow.</li>
            </ol>

            <br/>
            <li> <strong>Batteries and Battery-Powered Items </strong> </li>
            Batteries are essential in a disaster preparedness kit.
            Especially, when it comes to the use of other items you will need such as a radio and flashlights or lanterns.
            The ODPM updates citizens on natural disasters across media channels and if data in the country is down radios are the best alternative.  
            Conversely, a flashlight or lantern will help you during the night or if the electricity goes.

            <br/>
            <li> <strong>Clothes</strong> </li>
            An extra pair of clothes is important to keep in your kit.  
            Try and pack comfortable clothes and underwear for both you and your family members.

            <br/>
            <li><strong>First Aid Kit</strong></li>
            Packing a first aid kit is vital to a disaster preparedness kit.  
            Many first aid kits that you purchase will cover the essential items such as:

            <ol>
            <li>Band-aids</li>
            <li>Antiseptic wipes</li>
            <li>Antibiotic ointment</li>
            <li>Antiseptic solution</li>
            <li>Ibuprofen</li>
            </ol>  
            </p>

          <div class="row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="fas fa-comments" size="sm" />
                <q-btn flat round icon="far fa-eye" size="sm"/>
                <q-btn flat round icon="far fa-heart" size="sm" />
                
          </div> 
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
        
      </q-item>
    </q-list>
</div>

<q-item>
      <q-item-section>
          <q-item-label> <strong>COMMENTS</strong></q-item-label>
        </q-item-section>
    </q-item>

<div  class="q-pa-md">
  <q-list bordered padding>

    

      <q-item >
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
          <strong> Cels </strong>
          <span class="text-grey-7"> @cels <br class="lt-md" /> </span>
        </q-item-label>
        </q-item-section>

        <br/>
        <q-item-section>
          <q-item-label class="text-subtitle1">
          Very informative!
        </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
        </q-item-section>
        
      </q-item>
    </q-list>  
</div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
     name: 'PostDetails',

    setup() {
        
    },
})
</script>
