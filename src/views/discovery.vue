<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="item in picList" :key="item.targetId">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <el-row :gutter="20">
        <el-col :span="4.8" v-for="item in songsList" :key="item.id">
          <div class="img-wrap">
            <!-- 上面的文字 -->
            <span>{{item.copywriter}}</span>
            <!-- 图片 -->
            <img :src="item.picUrl" alt="">
            <!-- 播放标签 -->
            <a href="#"><i class="el-icon-caret-right"></i></a>
          </div>
          <!-- 图片下面的文字 -->
          <p>{{item.name}}</p>
        </el-col>
      </el-row>
    </div>

    <!-- 最新音乐 -->
    <div class="newMusic">
      <h3 class="title">最新音乐</h3>
      <el-row>
        <el-col :span="12" v-for="item in newSongList" :key="item.id">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="">
            <a @click="playMusic(item.id)"><i class="el-icon-caret-right"></i></a>
          </div>
          <div class="word-wrap">
            <p class="song_name">{{item.name}}</p>
            <p class="singer_name">{{item.song.artists[0].name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in mvList" :key="item.id">
          <div class="img-wrap">
            <span><i class="el-icon-caret-right"></i>{{item.playCount}}</span>
            <img :src="item.picUrl" alt="">
            <a href="#"><i class="el-icon-caret-right"></i></a>
          </div>
          <div class="word-wrap">
            <p class="song_name">{{item.name}}</p>
            <p class="singer_name">{{item.artistName}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 轮播图
      picList:[],
      // 歌曲列表
      songsList:[],
      // 最新音乐
      newSongList:[],
      // 推荐mv
      mvList:[]
    }
  },
  created () {
    // 获取轮播图
    this.getCarousel();
    // 获取歌单
    this.getSongsList();
    // 获取最新歌曲
    this.getNewSongList();
    // 获取mv
    this.getMVs()
  },
  mounted () {

  },
  methods: {
    // 轮播图
    async getCarousel() {
      const result = await this.$axios.get('https://autumnfish.cn/banner');
      this.picList = result.data.banners
    },
    // 歌单
    async getSongsList() {
      const result = await this.$axios.get(`https://autumnfish.cn/personalized`,{params:{limit:10}})
      this.songsList = result.data.result
    },
    // 最新音乐
    async getNewSongList() {
      const result = await this.$axios.get(`https://autumnfish.cn/personalized/newsong`)
      this.newSongList = result.data.result
    },
    async playMusic(id) {
      const result = await this.$axios.get(`https://autumnfish.cn/song/url`,{params:{id}})
      this.$parent.musicUrl = result.data.data[0].url
    },
    // 推荐mv
    async getMVs() {
      const result = await this.$axios.get(`https://autumnfish.cn/personalized/mv`)
      this.mvList = result.data.result
    }
  }
}
</script>

<style scoped>
  .title {
    margin-bottom: 20px;
    font-weight: 500;
  }
  .el-carousel__item img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
  .recommend{
    margin-top: 20px;
  }
  .recommend .el-col div {
    background-color: rosybrown;
    width: 200px;
    height: 200px;
    
  }
  .recommend .el-col p {
    width: 200px;
    line-height: 2;
    margin-bottom: 15px;
    font-size: 14px;
    /*1. 先强制一行内显示文本*/ 
    white-space: nowrap; 
    /*2. 超出的部分隐藏*/ 
    overflow: hidden; 
    /*3. 文字用省略号替代超出的部分*/ 
    text-overflow: ellipsis; 
  }
  .recommend .img-wrap {
    position: relative;
    overflow: hidden;
  }
  .recommend .img-wrap span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 5px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    text-overflow: ellipsis;
    transition: 0.5s;
    top: -50px;
  }
  .recommend .img-wrap:hover span {
    top: 0;
  }
  .recommend .img-wrap img{
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .recommend .img-wrap a i {
    position: absolute;
    right: 10px;
    bottom: 13px;
    width: 40px;
    height: 40px;
    font-size: 36px;
    color: #dd6d60;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    opacity: 0;
    transition: 0.5s;
  }
  .recommend .img-wrap:hover a i{
    opacity: 1;
  }
  .newMusic {
    margin-top: 20px;
  }
  .newMusic .el-col {
    margin-bottom: 2px;
    display: flex;
    height: 100px;
    transition: 0.3s;
  }
  .newMusic .el-col:hover {
    background-color: #f5f5f5;
  }
  .newMusic .img-wrap {
    /* 设置图片居中 */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
  }
  .newMusic .img-wrap img {
    width: 80px;
    height: 80px;
  }
  .newMusic .img-wrap a i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    color: #dd6d60;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    transition: 0.3s;
  }
  .newMusic .img-wrap:hover a i {
    opacity: 1;
  }
  .newMusic .word-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    font-size: 16px;
  }
  .newMusic .word-wrap .singer_name {
    font-size: 14px;
    color: gray;
  }
  .mvs {
    margin-top: 30px;
  }
  .mvs .img-wrap {
    position: relative;
    width: 250px;
    height: 140px;
  }
  .mvs .img-wrap span {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    color: white;
    font-size: 15px;
  }
  .mvs .img-wrap span i{
    font-size: 17px;
  }
  .mvs .img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .mvs .img-wrap a i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #dd6d60;
    background: rgba(255, 255, 255, 0.8);
    font-size: 36px;
    text-align: center;
    line-height: 40px;
    opacity: 0;
    transition: 0.5s;
  }
  .mvs .img-wrap:hover a i {
    opacity: 1;
  }
  .mvs .word-wrap .song_name {
    font-size: 14px;
    line-height: 1.8;
  }
  .mvs .word-wrap .singer_name {
    font-size: 12px;
    color: gray;
  }

</style>
