<template>
  <div class="new-music-public">
    <div class="new-title">
      <span class="new-text">新歌速递</span>
      <router-link :to="{name: 'MoreList', params: {currentType: this.currentType}}" tag="span" class="new-more">更多</router-link>
    </div>
    <div class="new-content">
      <ul class="new-content-container">
        <router-link :to="{name: 'MusicPlayer', params: {songId: item.song_id}}"
                     class="new-content-item" 
                     v-for="(item, index) in newMusicPublic" 
                     :key="index"
                     tag="li">
          <img :src="item.pic_big" alt="">
          <p class="albium_title">{{item.album_title}}</p>
          <p class="artist_name">{{item.artist_name}}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "newMusicPublic",
  data() {
    return {
      newMusicPublic: [],
      currentType: 2
    };
  },
  created() {
    let url =
      this.HOST + `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${this.currentType}&size=3&offset=0`;
    this.$axios
      .get(url)
      .then((res) => {
        // console.log(res.data)
        this.newMusicPublic = res.data.song_list;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="css" scoped>
.new-music-public {
  padding: 5px;
}
.new-title {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.new-title .new-more {
  font-size: 12px;
  margin-right: 10px;
}
.new-title .new-text {
  font-size: 14px;
  font-weight: 700;
}
.new-content-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.new-content-item {
  width: 33.33%;
  font-size: 12px;
  line-height: 15px;
}
.new-content-item img{
  width: 90%;
}
.new-content-container .albium_title {
  color: #000;
}
</style>