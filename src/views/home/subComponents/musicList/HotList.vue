<template>
  <div class="hot-list">
     <music-list :currentType="currentType" />
  </div>
</template>

<script>
import MusicList from '@/components/content/MusicList'
export default {
  data() {
    return {
      currentType: 2
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="css" scoped>
.hot-list {
  padding: 5px 5px 0;
}
</style>