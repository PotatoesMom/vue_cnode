<template>
  <div id="app">
    <Navbar/>
    <div id="main">
      <div id="main-inner">
        <router-view name="content"></router-view>
        <router-view name="sidebar"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
  #app {
  }

  #main {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
  }

  #main-inner {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  .content {
    width: 70%;
    margin-bottom: 30px;
  }

  .sidebar {
    width: 28%;
  }


</style>
