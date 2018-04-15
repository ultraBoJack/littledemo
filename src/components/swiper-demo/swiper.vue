<template>
  <div class="container" ref="container" style="width: 100%; padding-top: 0px;">

    <div class="img-container" ref="imgContainer" style="width: 100%; left: 0; height: 100%;">
      <img v-for="(item, index) in images" :key="index" :src="item" class="img-item">
    </div>

    <div class="dot-container" ref="dotContainer">
      <ul class="dot-list">
        <li v-for="(item, index) in 5 " :key="index" class="dot-item" :class="{'dot_active': isActive(index)}" @click="selectItem(index)"></li>
      </ul>
    </div>

    <div class="button-prev" @click="prevImg(1)"></div>
    <div class="button-next" @click="nextImg(1)"></div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      container: null,
      imgContainer: null,
      imgs: null,
      imgsLen: 0,
      img: null,
      imgWidth: 0,
      imgHeight: 0,

      currentImgIndex: 0,
      images: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1369359197,94491144&fm=27&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1500774671,3316735709&fm=27&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2886730201,3783800415&fm=27&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=31422053,4240368909&fm=27&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3028653830,4104546135&fm=27&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1369359197,94491144&fm=27&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1500774671,3316735709&fm=27&gp=0.jpg',
      ]
    }
  },
  mounted() {
    this.initWidth()
  },
  methods: {
    initWidth() {
      this.container = this.$refs.container
      this.imgContainer = this.$refs.imgContainer
      this.imgs = this.imgContainer.children
      this.imgsLen = this.imgs.length
      this.img = this.imgs[0]
      this.imgWidth = this.img.offsetWidth
      this. imgHeight = this.img.offsetHeight

      this.imgContainer.style.width = this.imgWidth * this.imgsLen + 'px'
      this.imgContainer.style.height = this.imgHeight + 'px'
      this.imgContainer.style.marginTop = -this.imgHeight + 'px'
      this.imgContainer.style.left = -this.imgWidth + 'px'
      this.container.style.paddingTop = this.imgHeight + 'px'
      this.container.style.width = this.imgWidth + 'px'
    },
    prevImg(step) {
      if (this.currentImgIndex > 0) {
        this.currentImgIndex-=step
      } else {
        this.currentImgIndex = this.imgsLen - 3
      }
      let i = 0
      let that = this
      let animateFunc = function () {
        if (i <= 1) {
          let delt = that.currentImgIndex + step * (1 - i)
          let distance = -that.imgWidth * delt
          that.imgContainer.style.transform = `translate3d(${distance}px, 0, 0)`
          i += 0.05
          i = (i * 100).toFixed(0) / 100
        }
      }
      setInterval(animateFunc, 50)
    },
    nextImg(step) {
      if (this.currentImgIndex < this.imgsLen - 2) {
        this.currentImgIndex += step
      } else {
        this.currentImgIndex = 1
      }
      let i = 0
      let that = this
      let animateFunc = function() {
        if (i <= 1) {
          let delt = that.currentImgIndex - step * (1 - i)
          let distance = -that.imgWidth * delt
          that.imgContainer.style.transform = `translate3d(${distance}px, 0, 0)`
          i += 0.05
          i = (i * 100).toFixed(0) / 100
        }
      }
      setInterval(animateFunc, 50)
    },
    isActive(index) {
      if (index === 0) {
        if (this.currentImgIndex === 0 || this.currentImgIndex === this.imgsLen - 2) {
          return true
        } else {
          return false
        }
      } else {
        return index === this.currentImgIndex
      }
    },
    selectItem(index) {
      let delt = index - this.currentImgIndex
      console.log(delt)
      if (delt > 0) {
        this.nextImg(delt)
      } else if (delt < 0) {
        this.prevImg(-delt)
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  
  .img-container{
    position: absolute;
    .img-item{
      float: left;
    }
  }

  .button-prev, .button-next{
    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.2);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before, &::after{
      content: '';
      position: absolute;
      width: 20px;
      height: 3px;
      background: rgba(160, 114, 28, 0.753);
    }
  }
  .button-prev{
    left: 0px;
    &::before{
      transform: rotate(45deg);
      transform-origin: left top;
    }
    &::after{
      transform-origin: left bottom;
      transform: rotate(-45deg);
    }
  }
  .button-next{
    right: 0px;
    &::before{
      transform-origin: right bottom;
      transform: rotate(45deg);
    }
    &::after{
      transform-origin: right top;
      transform: rotate(-45deg);
    }
  }

  .dot-container{
    margin: 12px 0;
    position: relative;
    height: 16px;
    overflow: hidden;
    .dot-list{
      position: absolute;
      top: 0;
      left: calc(50% - 65px);
      list-style: none;
      height: 16px;
      margin: 0;
      padding: 0;
      .dot-item{
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: orange;
      }
      .dot_active{
        background-color: red;
      }
    }
  }
}
</style>

