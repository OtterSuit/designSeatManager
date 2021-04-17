<template>
  <div class="loading">
    <img src="@/assets/images/loading.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped>
.loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;
}
.loading img{
    position: absolute;
    width: 50px;
    height: 50px;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    -webkit-animation: loading 0.75s linear infinite;
    animation: loading 0.75s linear infinite;
    user-select: none;
}
@-webkit-keyframes loading {
    0% { -webkit-transform: rotate(0deg); }
    50% { -webkit-transform: rotate(180deg); }
    100% { -webkit-transform: rotate(360deg); }
}
@keyframes loading {
    0% { -webkit-transform: rotate(0deg); }
    50% { -webkit-transform: rotate(180deg); }
    100% { -webkit-transform: rotate(360deg); }
}
</style>