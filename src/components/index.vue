<template>
    <div class="index-wrapper">
      <!-- 导航栏区域 -->
      <div class="nav-wrapper">
        <ul>
          <li>
            <router-link to="/discovery">
              <i class="el-icon-service"></i>
              发现音乐
            </router-link>
          </li>
          <li>
            <router-link to="/playlists">
              <i class="el-icon-set-up"></i>
              推荐歌单
            </router-link>
          </li>
          <li>
            <router-link to="/songs">
              <i class="el-icon-headset"></i>
              最新音乐
            </router-link>
          </li>
          <li>
            <router-link to="/mvs">
              <i class="el-icon-video-play"></i>
              最新MV
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 主体区域 -->
      <div class="main">
        <router-view></router-view>
      </div>

      <!-- 播放区域 -->
      <div class="play">
        <audio :src="musicUrl" controls autoplay></audio>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      musicUrl:''
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped>
  .index-wrapper{
    display: flex;
  }
  .nav-wrapper {
    width: 200px;
    height: 100%;
    background-color:rgb(237, 237, 237);
  }
  .nav-wrapper ul li {
    height: 60px;
    line-height: 60px;
    transition: 0.5s;
  }
  .nav-wrapper ul li:hover {
    background-color: rgb(231, 231, 231);
  }
  .nav-wrapper ul li a.router-link-active {
    color: #dd6d60;
  }
  .nav-wrapper ul li a {
    color: black;
    padding-left: 35px;
    font-size: 18px;
    width: 100%;
    height: 100%;
  }
  .nav-wrapper ul li i{
    margin-right: 10px;
  }
  .index-wrapper .main {
    flex: 1;
    overflow-y: scroll;
    padding: 10px 20px;
  }
  .index-wrapper .main > div {
    max-width: 1100px;
    margin: 0 auto;
  }
  .play {
    /* 开启固定定位 */
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 63px;
    background-color: rgb(241, 243, 244);
  }
  .play audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
</style>
