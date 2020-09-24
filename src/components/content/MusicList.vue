<template>
  <div class="music-list">
    <router-link class="music-list-item"
         v-for="(item, index) in currentData" 
         :key="index"
         :to="{name: 'MusicPlayer', params: {songId: item.song_id}}"
         tag="div">
      <div class="music-pic">
        <img :src="item.pic_big" alt="">
      </div>
      <div class="music-info">
        <p>{{item.title}}</p>
        <p>{{item.artist_name}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    currentType: Number,
    default: 2
  },
  data() {
    return {
      currentData: []
    }
  },
  created() {
    let currentUrl = `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${this.currentType}&size=5&offset=0`
    const httpUrl = this.HOST + currentUrl;
    this.$axios.get(httpUrl)
      .then((res) => {
        // console.log(res.data);
        this.currentData = res.data.song_list;
        // console.log(this.currentData)
      })
      .catch((err) => {
        console.log(err)
      });
  },
};
</script>

<style lang="css" scoped>
.music-list-item {
  display: flex;
  margin-bottom: 5px;
}
.music-pic {
  width: 60px;
  height: 60px;
}
.music-pic img {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.music-info {
  flex: 1;
  padding-left: 10px;
  font-size: 12px;
  line-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>