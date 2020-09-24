<template>
  <div class="music-player">
    <div class="music-player-pic">
      <img :src="songInfo.pic_radio" />
      <span class="music-hot">{{songInfo.hot}}</span>
    </div>
    <div class="music-player-content">
      <div class="music-player-container">
        <h1 class="music-player-title">{{songInfo.title}}</h1>
        <span class="music-player-artist">{{songInfo.artist}}</span>
        <span class="music-player-attention">关注</span>
        <span class="music-player-effect">音效 off</span>
        <span class="music-player-video">视频 93</span>
        <h5 class="music-player-song">{{songInfo.title}} - {{songInfo.artist}}</h5>
        <div class="music-player-control">
          <audio ref="player" autoplay controls :src="songFile.file_link" name="media"></audio>
        </div>
      </div>
    </div>
    <music-lrc :currentTime="this.currentTime" :durationTime="this.durationTime" :songId="this.$route.params.songId"></music-lrc>
  </div>
</template>

<script>
import Vue from 'vue'
import MusicLrc from "@/components/content/MusicLrc";
// 异步操作
// const MusicLrc = Vue.component('lrc', (resolve) => require(['../../../components/content/MusicLrc'].resolve))
export default {
  name: "MusicPlayer",
  data() {
    return {
      songInfo: {},
      songFile: {},
      currentTime: 0,
      durationTime: 0
    };
  },
  mounted() {
    this.getSongInfo();
    this.addEventListeners();
  },
  beforeDestroy() {
    this.removeEventListeners()
  },
  methods: {
    getSongInfo() {
      const songId = Number(this.$route.params.songId);
      console.log(songId)
      let httpUrl = this.HOST +`/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=${songId}`;
      this.$axios
        .get(httpUrl)
        .then((res) => {
          // console.log(res)
          this.songInfo = res.data.songinfo;
          // console.log(typeof(this.songInfo.lrclink));
          this.songFile = res.data.bitrate;
          // console.log(this.songFile);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addEventListeners() {
      // timeUpdate监听播放时间
      this.$refs.player.addEventListener('timeupdate', this._currentTime);
      // canPlay监听播放的整体时间
      this.$refs.player.addEventListener('canplay', this._durationTime)
    },
    removeEventListeners() {
      this.$refs.player.removeEventListener('timeupdate',  this._currentTime);
      this.$refs.player.removeEventListener('canplay', this._durationTime)
    },

    _currentTime() {
      this.currentTime = parseInt(this.$refs.player.currentTime);
      // currentTime 是audio标签提供的获取当前播放时间的方法
    },
    _durationTime() {
      this.durationTime = parseInt(this.$refs.player.duration);
      // duration 是audio标签提供获取歌曲播放整体时间的方法
    }
  },
  components: {
    MusicLrc,
  },
};
</script>

<style lang="css" scoped>
.music-player {
  padding: 50px 0;
  height: 100vh;
  background-color: rgba(30, 30, 30, .5);
}
.music-player-pic {
  position: relative;
  width: 80%;
  margin: 0 auto;
}
.music-hot {
  position: absolute;
  bottom: 10%;
  left: 2%;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  padding-left: 5px;
  width: 29%;
  line-height: 1.5em;
  vertical-align: middle;
  text-align: center;
  background: url("../../../assets/img/player/hot.png") rgba(0, 0, 0, 0.3) no-repeat;
}
.music-player-pic img {
  width: 100%;
  border-radius: 3%;
}
.music-player-content {
  padding: 0 30px;
}
.music-player-title {
  margin-top: 10px;
  font-size: 24px;
  color: #fff;
}
.music-player-container {
  /* width: 90%; */
  margin-top: 10px;
}
.music-player-container audio {
  width: 100%;
}
.music-player-artist {
  color: #f3f0f0;
  font-size: 12px;
  line-height: 2em;
}
.music-player-attention {
  display: inline-block;
  color: #f3f0f0;
  font-size: 10px;
  width: 40px;
  line-height: 18px;
  border: 1px solid #f3f0f0;
  border-radius: 12px;
  text-align: center;
}
.music-player-effect {
  display: inline-block;
  color: #000;
  font-size: 10px;
  width: 50px;
  line-height: 18px;
  background-color: #f3f0f0;
  text-align: center;
}
.music-player-video {
  display: inline-block;
  color: #000;
  font-size: 10px;
  width: 50px;
  line-height: 18px;
  background-color: #f3f0f0;
  text-align: center;
}
.music-player-song {
  font-size: 12px;
  font-weight: 500;
  line-height: 2em;
  color: #ececec;
}
</style>
