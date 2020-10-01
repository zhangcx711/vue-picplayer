<template>
  <div class="result-wrap">
    
    <!-- 标题 -->
    <div class="word-wrap">
      <span class="title">{{$route.query.q}}</span>
      <span class="num">找到{{count}}个结果</span>
    </div>
    

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

      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="playlists">
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

      <!-- MV -->
      <el-tab-pane label="MV" name="mvs">
        <div class="mvs">
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in mv" :key="item.id">
              <div class="img-wrap">
                <span class="playCount"><i class="el-icon-caret-right"></i>{{item.playCount}}</span>
                <span class="duration">{{item.duration}}</span>
                <img :src="item.cover" alt="">
                <a href="#"><i class="el-icon-caret-right"></i></a>
              </div>
              <div class="word-wrap">
                <p class="song_name">{{item.name}}</p>
                <p class="singer_name">{{item.artistName}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      songList:[],
      count:0,
      activeName:'songs',
      playlists:[],
      mv:[],
      // type:1000,
      // limit:10
    }
  },
  watch: {
    activeName() {
        let type = 1

        // 获取个数
        let limit = 10
        switch (this.activeName) {
          case 'songs':
            type = 1
            limit = 10
            break
          case 'playlists':
            type = 1000
            limit = 10
            break
          case 'mvs':
            type = 1004
            limit = 8
            break

          default:
            break
        }

        axios({
          url: 'https://autumnfish.cn/search',
          method: 'get',
          params: {
            keywords: this.$route.query.q,
            type, // type:type,
            // 获取的数据量
            limit // limit: limit
          }
        }).then(res => {
          console.log(res)
          // 获取歌曲
          if (type == 1) {
            // 歌曲
            this.songList = res.data.result.songs
            // 计算歌曲时间
            for (let i = 0; i < this.songList.length; i++) {
              let min = parseInt(this.songList[i].duration / 1000 / 60)
              let sec = parseInt((this.songList[i].duration / 1000) % 60)
              if (min < 10) {
                min = '0' + min
              }
              if (sec < 10) {
                sec = '0' + sec
              }
              // console.log(min + '|' + sec)
              this.songList[i].duration = min + ':' + sec
            }
            // 保存总数
            this.count = res.data.result.songCount
          }
          // 获取 歌单
          else if (type == 1000) {
            // 歌单的逻辑
            this.playlists = res.data.result.playlists
            // 总数
            this.count = res.data.result.playlistCount
            // 处理 播放次数
            for (let i = 0; i < this.playlists.length; i++) {
              if (this.playlists[i].playCount > 100000) {
                this.playlists[i].playCount =
                  parseInt(this.playlists[i].playCount / 10000) + '万'
              }
            }
          } else {
            // 保存mv数据
            this.mv = res.data.result.mvs
            // 总数
            this.count = res.data.result.mvCount
            // 处理数据
            for (let i = 0; i < this.mv.length; i++) {
              // 时间
              let min = parseInt(this.mv[i].duration / 1000 / 60)
              let sec = parseInt((this.mv[i].duration / 1000) % 60)
              if (min < 10) {
                min = '0' + min
              }
              if (sec < 10) {
                sec = '0' + sec
              }
              this.mv[i].duration = min + ':' + sec

              // 播放次数
              if (this.mv[i].playCount > 100000) {
                this.mv[i].playCount =
                  parseInt(this.mv[i].playCount / 10000) + '万'
              }
            }
          }
        })
    }
  },
  created () {
    // this.getSearchResultList()
    axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.$route.query.q,
          type: 1,
          // 获取的数据量
          limit: 10
        }
      }).then(res => {
        console.log(res)
        this.songList = res.data.result.songs
        // 计算歌曲时间
        for (let i = 0; i < this.songList.length; i++) {
          let min = parseInt(this.songList[i].duration / 1000 / 60)
          let sec = parseInt((this.songList[i].duration / 1000) % 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          // console.log(min + '|' + sec)
          this.songList[i].duration = min + ':' + sec
        }
        // 保存总数
        this.count = res.data.result.songCount
      })
  },
  mounted () {

  },
  methods: {
    playMusic(id) {
        axios({
          url: 'https://autumnfish.cn/song/url',
          method: 'get',
          params: {
            id // id:id
          }
        }).then(res => {
          this.$parent.musicUrl = res.data.data[0].url
        })
      },
    toPlaylist(id) {
      this.$router.push(`/playlist?q=${id}`)
    }
  }
}
</script>

<style scoped>
  .result-wrap .word-wrap .title {
    font-size: 24px;
  }
  .result-wrap .word-wrap .num {
    margin-left: 10px;
    color: #ccc;
  }
  .songListName a i{
    color: #dd6d60;
    padding-left: 5px;
    font-size: 16px;
  }
  .result-wrap .classify-content{
    margin-top: 30px;
  }
  .result-wrap .classify-content .el-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .result-wrap .classify-content .el-row .el-col{
    margin-bottom: 20px;
  }
  
  .result-wrap .classify-content .img-wrap {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
  }
  .result-wrap .classify-content .img-wrap span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    line-height: 1.5;
    padding: 2px 5px;
    color: white;
    font-size: 14px;
    background-color: rgba(0,0,0,0.5);
    top: -50px;
    transition: 0.5s
  }
  .result-wrap .classify-content .img-wrap:hover span {
    top: 0;
  }
  .result-wrap .classify-content .img-wrap img {
    width: 100%;
    height: 100%;
  }
  .result-wrap .classify-content .img-wrap a i {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 36px;
    text-align: center;
    line-height: 40px;
    color: #dd6d60;
    background-color: rgba(255, 255, 255, 0.8);
    opacity: 0;
    transition: 0.5s;
  } 
  .result-wrap .classify-content .img-wrap:hover a i {
    opacity: 1;
  }
  .result-wrap .classify-content p {
    width: 200px;
    font-size: 15px;
    padding-top: 5px;
  }
  .result-wrap .mvs {
    margin-top: 30px;
  }
  .result-wrap .mvs .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .result-wrap .mvs .el-row .el-col{
    /* height: 100%; */
    margin-bottom: 25px;
  }
  .result-wrap .mvs .img-wrap {
    position: relative;
    width: 250px;
    height: 140px;
  }
  .result-wrap .mvs .img-wrap .playCount {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    color: white;
    font-size: 15px;
  }
  .result-wrap .mvs .img-wrap .playCount i{
    font-size: 17px;
  }
  .result-wrap .mvs .img-wrap .duration {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
    color: white;
    font-size: 15px;
  }
  .result-wrap .mvs .img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .result-wrap .mvs .img-wrap a i {
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
  .result-wrap .mvs .img-wrap:hover a i {
    opacity: 1;
  }
  .result-wrap .mvs .word-wrap .song_name {
    width: 100%;
    font-size: 14px;
    padding: 4px 0;
  }
  .result-wrap .mvs .word-wrap .singer_name {
    font-size: 12px;
    color: gray;
  }
</style>
