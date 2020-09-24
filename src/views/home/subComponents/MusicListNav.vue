<template>
  <div class="music-list-nav">
    <div class="music-list-title">
      <span class="music-list-text">音乐榜单</span>
      <router-link :to="{name: 'MoreList', params: {currentType: this.currentType}}" tag="span" class="music-list-more">更多</router-link>
    </div>
    <ul class="music-list-container">
      <li class="music-list-item" 
          v-for="(item, index) in musicListSorts" 
          :key="index" 
          :class="{active:index === currentIndex}"
          @click="itemClick(index)">{{item}}
      </li>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicListSorts: ["热歌榜", "新歌榜", "摇滚榜"],
      currentIndex: 0,
      currentType: 2
    };
  },
  mounted() {
    this.itemClick(this.currentIndex);
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      if(index === 0 ) {
        this.$router.push('/home/main/hot_list');
        this.currentType = 2
      } else if(index === 1 ) {
        this.$router.push('/home/main/new_list');
        this.currentType = 1
      } else if(index === 2 ) {
        this.$router.push('/home/main/rock_list');
        this.currentType = 11
      }
    }
  },
};
</script>

<style lang="css" scoped>
.music-list-nav {
  padding: 0 5px;
  height: 365px;
}
.music-list-title {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.music-list-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}
.music-list-container .active {
  color: var(--color-high-text)
}
.music-list-item {
  width: 33.33%;
  text-align: center;
  font-size: 14px;
}
.music-list-text {
  font-size: 14px;
  font-weight: 700;
}
.music-list-more {
  font-size: 12px;
  margin-right: 10px;
}
</style>