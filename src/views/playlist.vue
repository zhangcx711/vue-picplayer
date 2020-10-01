<template>
  <div class="playlist-wrap">

    <!-- 顶部介绍 -->
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img :src="playlist.creator.avatarUrl" alt="">
          <span class="nickname">{{ playlist.creator.nickname }}</span>
          <span class="createTime">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="button-wrap">
          <a href=""><i class="el-icon-video-play">播放全部</i></a>
        </div>
        <div class="tab">
          <span>标签:</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <p class="desc">简介:{{playlist.description}}</p>
      </div>
    </div>

    <!-- 列表 -->
     <!-- 标签栏 -->
    <el-tabs v-model="activeName">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲" name="songs">
        <el-table :data="songList" stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="音乐标题" width="320">
            <template slot-scope="scope">
              <div class="songListName">
                <span>{{scope.row.name}}</span>
                <a href="#" @click="playMusic(scope.row.id)"><i v-if="scope.row.mvid != 0" class="el-icon-video-play"></i></a>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="artists[0].name" label="歌手" width="180"></el-table-column>
          <el-table-column prop="album.name" label="专辑" width="320"></el-table-column>
          <el-table-column prop="duration" label="时长" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>

      <!-- 评论 -->
      <el-tab-pane label="评论" name="playlists">
        <div class="classify-content">
          <el-row :gutter="20">
            <el-col :span="4.8" v-for="item in playlists" :key="item.id">
              <div class="img-wrap">
                <span>播放量：{{item.playCount}}</span>
                <img :src="item.coverImgUrl" @click="toPlaylist(item.id)">
                <a href="#"><i class="el-icon-caret-right"></i></a>
              </div>
              <p>{{item.name}}</p>
            </el-col>
          </el-row>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playlist:[]
    }
  },
  created () {
    this.getPlaylist()
  },
  mounted () {

  },
  methods: {
    async getPlaylist() {
      const result = await this.$axios.get(`https://autumnfish.cn/playlist/detail`,{params:{id:this.$route.query.q}})
      console.log(result);
      this.playlist = result.data.playlist;
    }
  }
}
</script>

<style scoped>
  .playlist-wrap .top-wrap {
    margin-top: 30px;
    display: flex;
  }
  .playlist-wrap .top-wrap .img-wrap img{
    width: 230px;
    height: 230px;
  }
  .playlist-wrap .top-wrap .info-wrap {
    margin-left: 30px;
  }
  .playlist-wrap .top-wrap .info-wrap .author-wrap {
    margin-top: 20px;
    display: flex;
    justify-self: center;
    align-items: center;
  }
  .playlist-wrap .top-wrap .info-wrap .author-wrap .nickname {
    padding: 10px;
  }
  .playlist-wrap .top-wrap .info-wrap .author-wrap .createTime {
   font-size: 14px;
 }
  .playlist-wrap .top-wrap .info-wrap .author-wrap img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .playlist-wrap .top-wrap .info-wrap .button-wrap {
    width: 120px;
    height: 35px;
    background-color: #c6483c;
    line-height: 35px;
    text-align: center;
    border-radius: 5px;
    margin-top: 20px;
  }
  .playlist-wrap .top-wrap .info-wrap .button-wrap a i {
    color: white;
  }
  .playlist-wrap .top-wrap .info-wrap .tab {
    display: flex;
    margin-top: 20px;
  }
  .playlist-wrap .top-wrap .info-wrap .tab ul li{
    display: inline;
  }
  .playlist-wrap .top-wrap .info-wrap .desc {
    margin-top: 20px;
    overflow: hidden; 
    text-overflow: ellipsis; 
    /* 弹性伸缩盒子模型显示 */ 
    display: -webkit-box; 
    /* 限制在一个块元素显示的文本的行数 */ 
    -webkit-line-clamp: 2; 
    /* 设置或检索伸缩盒对象的子元素的排列方式 */ 
    -webkit-box-orient: vertical;
  }
</style>
