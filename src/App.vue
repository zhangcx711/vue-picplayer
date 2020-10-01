<template>
  <div id="app">
    <top></top>
    <index></index>
  </div>
</template>

<script>
import top from "./components/top"
import index from "./components/index"

export default {
  components:{
    top,
    index
  }
}
</script>

<style scoped>
 #app {
  height: 100%;
} 
#app .top-wrapper {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

#app .index-wrapper {
  height: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
} 
</style>
