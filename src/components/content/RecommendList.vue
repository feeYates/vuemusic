<template>
  <div class="recommend-list">
    <div class="recommend-title">
      <span class="recommend-text">{{title}}</span>
      <router-link :to="{name: 'MoreList', params: {currentType: this.currentType}}" tag="span" class="recommend-more">更多</router-link>
    </div>

    <div class="recommend-content">
      <ul class="recommend-container">
        <router-link tag="li" :to="{name: 'MusicPlayer', params: {songId: item.song_id}}" class="recommend-item" v-for="(item, index) in todayRecommendLists" :key="index">
          <img :src="item.pic_big" alt />
          <span class="album_title">{{item.album_title}}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "todayrecommend",
  data() {
    return {
      todayRecommendLists: [],
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    currentType: {
      type: Number,
      default: 1
    }
  },
  created() {
    let currentUrl = `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${this.currentType}&size=6&offset=0`
    let url = this.HOST + currentUrl;
    this.$axios
      .get(url)
      .then((res) => {
        // console.log(res.data)
        this.todayRecommendLists = res.data.song_list;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="css" scoped>
.recommend-list {
  padding: 5px;
}
.recommend-title {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  font-size: 14px;
}
.recommend-title .recommend-text {
  font-size: 14px;
  font-weight: 700;
}
.recommend-title .recommend-more {
  font-size: 12px;
  margin-right: 10px;
}
.recommend-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.recommend-item {
  width: 33.33%;
  margin-bottom: 5px;
}

.recommend-item img {
  width: 90%;
}
.recommend-item .album_title {
  font-size: 12px;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>