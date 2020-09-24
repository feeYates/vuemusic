<template>
  <div class="more-music-list">
    <div class="music-list-container">
      <router-link :to="{name: 'MusicPlayer', params: {songId: item.song_id}}"
                   tag="div"
                   class="music-list-item"
                   v-for="(item, index) in musicLists" 
                   :key="index">
        <img :src="item.pic_big" alt="">
        <p class="music-text">{{item.title}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    musicLists: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="css" scoped>
  .music-list-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 10px;
  }
  .music-list-item {
    width: 33.33%;
    margin-bottom: 5px;
  }
  .music-list-item img{
    width: 90%;
  }
  .music-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    line-height: 1.5em;
  }
</style>