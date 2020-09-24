<template>
  <div class="music-lrc-container">
    <!-- 歌词页面:{{this.songId}} -->
    <!-- {{this.songLrc}} -->
    <!-- {{this.musicLrcData}} -->
    {{getAllKeys}}
    <div class="music-lrc"  ref="lrc">
      <!-- 用显示和隐藏的方式控制歌词显示 -->
      <!-- <p class="lrc"
         v-for="(item, key, index) in musicLrcData" 
         :key="index"
         v-if="showLrc"
         v-show="currentTime >= keyArr[index-1] && currentTime < keyArr[index+1]">
        {{item}}
      </p> -->
      <p class="lrc"
         v-for="(item, key, index) in musicLrcData" 
         :key="index"
         v-if="showLrc"
         :class="{active: currentTime >= keyArr[index] && currentTime < keyArr[index+1]}">
        {{item}}{{scrollLrc(key,index)}}
      </p> 
      <p class="lrc" v-show="showTips">暂无歌词</p>
    </div>
  </div>
</template>

<script>
import exporter from "vue-awesome-swiper/dist/exporter";
export default {
  name: "MusicLrc",
  data() {
    return {
      musicLrcData: '',
      showLrc: true,
      showTips: false,
      keyArr: []
    };
  },
  props: {
    songId: {
      type: [Number, String],
      default: ""
    },
    currentTime: {
      type: [Number, String],
      default: 0
    },
    durationTime: {
      type: [Number, String],
      default: 0
    }
  },
  created() {
    this.getMusicLrcData();
  },
  methods: {
    getMusicLrcData() {
      let httpUrl =
        this.HOST +
        `/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=${this.songId}`;
      this.$axios
        .get(httpUrl)
        .then((res) => {
          // console.log(res.data.songinfo.lrclink)
          const musicLrcLink = res.data.songinfo.lrclink;
          this.$axios.get(musicLrcLink).then(res => {
            // this.musicLrcData = res.data
            // console.log(res.data)

            // 数据格式处理
            var lyrics = res.data.split("\n");
            var lrcObj = {};
            for(var i = 0; i<lyrics.length; i++){
              var lyric = decodeURIComponent(lyrics[i]);
              var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
              var timeRegExpArr = lyric.match(timeReg);
              if(!timeRegExpArr)continue;
              var clause = lyric.replace(timeReg, '');
                for(var k = 0, h = timeRegExpArr.length; k < h; k++) {
                  var t = timeRegExpArr[k];
                  var min = Number(String(t.match(/\[\d*/i)).slice(1));
                  var sec = Number(String(t.match(/\:\d*/i)).slice(1));
                  var time = min * 60 + sec;
                  lrcObj[time] = clause;
                }
            }
            this.musicLrcData = lrcObj;
            if(JSON.stringify(lrcObj) === '{}') {
              // this.musicLrcData = res.data.split('\n')
              this.showLrc = false;
              this.showTips = true;
            }else {
              this.musicLrcData = lrcObj;
            }
          }).catch(err => {
            console.log(err)
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollLrc(key,index) {
      const divLrc = this.$refs.lrc;
      // console.log(divLrc)
      if(key < this.currentTime && key> this.currentTime - (this.keyArr[index+1]) - this.keyArr[index]) {
        divLrc.style.top = -((index -2 ) * 30) + 'px';
      }
    }
  },
  computed: {
    getAllKeys() {
      for(let i in this.musicLrcData) {
        this.keyArr.push(i)
      }
    }
  },
};
</script>

<style lang="css" scoped>
.music-lrc-container {
  height: 90px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.music-lrc  {
  position: absolute;
  top: 0;
  width: 100%;
  color: #fff;
  text-align: center;
}
.lrc {
  height: 30px;
  line-height: 30px;
}
.active {
  color: red;
}
</style>