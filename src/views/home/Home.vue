<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center" class="tab-center">凌云草音乐</div>
    </nav-bar>
    <ul class="tab-menu">
      <li v-for="(item, index) in menuTitles" :key="index">
        <span :class="{active : index === currentIndex }" @click="itemClick(index)">{{item}}</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import MusicListNav from "./subComponents/MusicListNav";
import NavBar from "@/components/common/navbar/NavBar";
export default {
  data() {
    return {
      index: 0,
      currentIndex: 0,
      menuTitles: ["主页", "歌手", "榜单", "搜索", "我的"],
    };
  },
  components: {
    MusicListNav,
    NavBar,
  },
  mounted() {
    this.itemClick(this.index);
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      if (index === 0) {
        this.$router.push("/home/main");
      } else if (index === 1) {
        this.$router.push("/home/singer");
      } else if (index === 2) {
        this.$router.push("/home/list");
      } else if (index === 3) {
        this.$router.push("/home/search");
      } else if (index === 4) {
        this.$router.push("/home/profile");
      }
    },
  },
};
</script>

<style>
#home {
  padding-top: 49px;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.tab-menu {
  height: 49px;
  line-height: 49px;
  text-align: center;
  margin-top: 10px;
  display: flex;
}
.tab-menu li {
  flex: 1;
}
.tab-menu li span {
  padding: 5px;
}
.tab-menu .active {
  border-bottom: 3px solid var(--color-tint);
  color: var(--color-high-text);
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-center {
  text-align: center;
}
.tab-left img {
  width: 60px;
}
</style>