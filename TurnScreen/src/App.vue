<template>
  <div id="app">
    <nav class="navbar-expand-lg navbar-dark bg-primary">
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" @click="$router.push('/')">Home</a>
          </div>
        </div>
        <span class="navbar-text">SETTING</span>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
nav {
  font-size: 20px;
}
.navbar-text {
  margin-right: 10%;
}
</style>
