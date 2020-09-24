<template>
  <div>
    <recommend-list :title="todayRecommendTitle" :currentType="todayRecommendType" />
    <new-music-public />
    <swiper-banner class="swiper-banner"/>
    <music-list-nav />
    <recommend-list :title="classicsTitle" :currentType="classicsType" />
  </div>
</template>

<script>
import RecommendList from '@/components/content/RecommendList'
import NewMusicPublic from '@/components/content/NewMusicPublic'
import SwiperBanner from '@/components/content/SwiperBanner'
import MusicListNav from './MusicListNav'
export default {
  data() {
    return {
      todayRecommendTitle: '今日推荐',
      todayRecommendType: 1,
      classicsTitle: '网络歌单',
      classicsType: 25, 
    }
  },
  components: {
    RecommendList,
    NewMusicPublic,
    SwiperBanner,
    MusicListNav
  }
}
</script>

<style lang="css" scoped>
</style>