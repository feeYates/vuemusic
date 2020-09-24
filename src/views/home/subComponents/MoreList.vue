<template>
  <div class="more-list">
    <vue-pull-refresh :on-refresh="onRefresh">
      <more-music-list :musicLists="musicLists" />
    </vue-pull-refresh>
  </div>
</template>

<script>
import VuePullRefresh from "vue-pull-refresh";
import MoreMusicList from "@/components/content/MoreMusicList";
export default {
  data() {
    return {
      currentType: 0,
      currentSize: 12,
      musicLists: [],
      offset: 0,
      billboard_songnum: 0
    };
  },
  created() {
    this.currentType = this.$route.params.currentType;
    this.getMusicLists();
  },
  methods: {
    getMusicLists() {
      let currentUrl = `/v1/restserver/ting?method=baidu.ting.billboard.billList&type=${this.currentType}&size=${this.currentSize}&offset=${this.offset}`;
      let url = this.HOST + currentUrl;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$axios
            .get(url)
            .then((res) => {
              this.billboard_songnum = Number(res.data.billboard.billboard_songnum);
              this.offset >= this.billboard_songnum - 12 ? console.log('没有更多数据了') : this.offset += 12;
              console.log(res.data)
              console.log(this.offset)
              this.musicLists = this.musicLists.concat(0,0,res.data.song_list);
              resolve();
            })
            .catch((err) => {
              console.log(err);
            });
        },2000);
      });
    },
    onRefresh() {
      this.getMusicLists();
    },
  },
  components: {
    MoreMusicList,
    VuePullRefresh,
  },
};
</script>

<style lang="css" scoped>
</style>