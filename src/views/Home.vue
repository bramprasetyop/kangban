<template>

  <div class="home">
     
    <div class="row">
     <Navbar/>
    </div>
 
    <Kanban/>
  </div>
</template>

<script>
// @ is an alias to /src

import Kanban from '@/components/Kanban.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Kanban,
    Navbar
  }
}
</script>
