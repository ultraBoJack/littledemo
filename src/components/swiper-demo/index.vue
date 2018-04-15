<template>
  <div class="swiper-container">
    <swiper></swiper>
  </div>
</template>

<script>
import Swiper from './swiper'
export default {
  components: {
    Swiper
  }
}
</script>


<style lang="scss" scoped>
.swiper-container{
  margin: 30px 416px;
  background: #333;
  box-shadow: 0 0 20px 0 #333;
  border-radius: 10px;
}
</style>
