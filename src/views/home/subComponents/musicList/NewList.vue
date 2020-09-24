<template>
  <div class="new-list">
    <music-list :currentType="currentType" />
  </div>
</template>

<script>
import MusicList from '@/components/content/MusicList'
export default {
  data() {
    return {
      currentType: 1
    }
  },
  components: {
    MusicList,
  }
}
</script>

<style lang="css" scoped>
.new-list {
    padding: 5px 5px 0;
  }
</style>