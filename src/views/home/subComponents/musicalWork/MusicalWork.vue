<template>
  <div class="musical-work">
    <div class="musical-work-mall">
      <div class="singer-pic">
        <img :src="singerPic" alt="">
      </div>
      <p class="singer-name">{{singerName}}</p>
    </div>
    <ul class="musical-work-list">
      <router-link :to="{name: 'MusicPlayer', params: {songId: item.song_id}}"
                   class="music-work-item" 
                   v-for="(item, index) in musicalWorkLists" 
                   :key="index"
                   tag="li">
        <img class="play" src="../../../../assets/img/musical-work/play.png" alt="">
        <span>{{item.title}}</span>
        <img class="sq" src="../../../../assets/img/musical-work/sq.png" alt="">
        <img class="download" src="../../../../assets/img/musical-work/download.png" alt="">
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MusicalWork',
  data() {
    return {
      singerId: '',
      singerPic: '',
      singerName: '',
      musicalWorkLists: [],
      musicalWorkLimits: 10,
      musicalTips: ''
    }
  },
  created() {
    this.getMusicalWorkLists()
  },
  methods: {
    getMusicalWorkLists() {
      this.singerId = this.$route.params.ting_uid;
      this.singerPic = this.$route.params.singer_pic;
      this.singerName = this.$route.params.singer_name;
      const musicalWorkUrl = this.HOST + `/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid=${this.singerId}&limits=${this.musicalWorkLimits}&use_cluster=1&order=2`;
      this.$axios.get(musicalWorkUrl).then(res => {
        // console.log(res.data.songlist)
        this.musicalWorkLists = res.data.songlist;
        if(!this.musicalWorkLists.length) {
          this.musicalWorkLists.push({title: '歌曲不存在'})
        }
        console.log(this.musicalWorkLists)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .singer-pic {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  .singer-pic img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .singer-name {
    text-align: center;
    margin-top: 10px;
  }
  .music-work-item {
    line-height: 3em;
    margin-left: 20px;
    margin-bottom: 5px;
  }
  .music-work-item .download {
    float: right;
    margin-right: 10px;
  }
</style>