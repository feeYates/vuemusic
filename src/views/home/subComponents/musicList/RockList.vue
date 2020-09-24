<template>
  <div class="rock-music">
    <music-list :currentType="currentType"/>
  </div>
</template>

<script>
import MusicList from '@/components/content/MusicList'
export default {
  data() {
    return {
      currentType: 11
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="css" scoped>
.rock-music {
  padding: 5px 5px 0;
}
</style>