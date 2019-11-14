<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
  *
    user-select none
  ::-webkit-scrollbar
    display: none
  body
    background-color: #010038
    font-family: "Inter"
</style>
