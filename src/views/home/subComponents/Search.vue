<template>
  <div class="search-container">
    <input class="search-box" type="text" placeholder="搜索一下" v-model="searchKeyword" />
    <button class="search-btn" @click="searchHandler">搜索</button>
    
    <search-music-list v-if="showList" :searchSongList="songList"/>
    <search-music-tip v-else/>
  </div>
</template>

<script>
import SearchMusicList from '@/components/content/SearchMusicList';
import SearchMusicTip from '@/components/content/searchMusicTip'
export default {
  name: "search",
  data() {
    return {
      searchKeyword: "",
      songList: [],
      showList: true
    };
  },
  methods: {
    searchHandler() {
      const searchURL =
        this.HOST +
        `/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=${this.searchKeyword}`;
      this.$axios
        .get(searchURL)
        .then((res) => {
          // console.log(res)
          if(res.data.error_code !== 22001) {
            this.songList = res.data.song;
            console.log(this.songList);
            this.showList = !this.showList;
          }else {
            // console.log('找不到相关的歌曲');
            this.showList = !this.showList;
          }
        })
        .catch((err) => {
         console.log(err)
        });
    },
  },
  components: {
    SearchMusicList,
    SearchMusicTip
  }
};
</script>

<style lang="css" scoped>
.search-container {
  width: 100%;
  height: 30px;
}
.search-box {
  border: 1px solid #ccc;
  width: 250px;
  height: 30px;
  border-radius: 30px;
  padding-left: 10px;
}
.search-btn {
  /* float: right; */
}
</style>