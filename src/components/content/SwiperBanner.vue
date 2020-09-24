<template>
  <div v-swiper:mySwiper="swiperOption" v-if="bannerSrcs.length>1" class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in bannerSrcs" :key="index">
        <img :src="item" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      bannerSrcs: [
        "https://img01.dmhmusic.com/0101/M00/12/58/ChR45F8rbvqAQbqrAACd2biu26c366.jpg",
        "https://img01.dmhmusic.com/0101/M00/12/49/ChR45V8rcEaAC903AACmpZ2zLM4902.jpg",
        "https://img01.dmhmusic.com/0101/M00/12/58/ChR45F8rcGeAH86hAABUFxSf_QM602.jpg",
        "https://img01.dmhmusic.com/0101/M00/12/49/ChR45V8rcJqAUgpbAACEOXPssI0245.jpg",
        "https://img01.dmhmusic.com/0104/M00/11/3C/ChR45V8sv8yAXG_EAAA9-eJMPK8052.jpg",
        "https://img01.dmhmusic.com/0104/M00/11/2B/ChR45F8sv_OADHhFAAKwqc7B87s515.jpg",
        "https://img01.dmhmusic.com/0104/M00/11/3C/ChR45V8swBOAFafaAABB2Xn9Hzk012.jpg",
      ],
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: {
          delay: 3000, //秒
          stopOnLastSlide: false,
          disableOnInteraction: false, //滑动不会失效
        },
      },
    };
  },
  mounted() {
    // console.log("Current Swiper instance object", this.mySwiper);
    // this.mySwiper.slideTo(3, 1000, false)
  },
};
</script>

<style lang="css" scoped>
.swiper {
  margin: 5px 0;
}

.swiper-slide img {
  width: 100%;
}

</style>