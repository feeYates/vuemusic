<template>
  <div class="singer-list">
      <ul class="singer-list-container">
        <router-link :to="{name: 'MusicalWork', params: {singer_pic: item.avatar_s500, singer_name: item.name, ting_uid: item.ting_uid}}" class="singer-list-item" tag="li" v-for="(item, index) in artistsData" :key="index">
          <div class="singer-pic">
            <img :src="item.avatar_s500" alt="">
          </div>
          <p class="singer-name">{{item.name}}</p>
        </router-link>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'singer',
  data() {
    return {
      artistIds: ['2517', '7994', '1091', '45561', '2507', '245815', '1077', '1204', '1117', '82366'],
      artistsData: [],
    }
  },
  created() {
    this.getArtistData();
  },
  methods: {
    getArtistData() {
      for(var i = 0; i < this.artistIds.length; i++) {
        const httpUrl = this.HOST + `/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid=${this.artistIds[i]}`;
        this.$axios.get(httpUrl).then(res => {
          // console.log(res)
          this.artistsData.push({
            avatar_s500: res.data.avatar_s500,
            name: res.data.name,
            ting_uid: res.data.ting_uid
          })
          // console.log(this.artistsData)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  
}
</script>

<style lang="css" scoped>
  .singer-list-container {
    padding: 0 10px;
  }
  .singer-list-item {
    display: flex;
    margin-top: 10px;
  }
  .singer-pic {
    width: 60px;
    height: 60px;
  }
  .singer-pic img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .singer-list-item .singer-name {
    width: 100%;
    height: 60px;
    line-height: 60px;
    flex: 1;
    margin-left: 10px;
    font-size: 14px;
  } 
</style>