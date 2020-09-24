<template>
  <ul class="search-list-container">
    <router-link tag="li"
                 :to="{name: 'MusicPlayer', params: {songId: item.songid}}"
                 class="search-list-item" 
                 v-for="(item, index) in searchSongList" 
                 :key="index">
      <h5>{{item.songname}}</h5>
      <p class="artistname">{{item.artistname}}</p>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'SearchMusicList',
  props: {
    searchSongList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="css" scoped> 
  .search-list-container {
    padding: 10px;
  }
  .search-list-item {
    margin-bottom: 5px;
  }
  .artistname {
    font-size: 12px;
  }
  
</style>