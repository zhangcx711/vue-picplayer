<template>
  <div class="songs-wrap">
    <!-- 标签栏 -->
    <div class="tag-bar">
        <a href="#"><span :class="tag==='0' ?'active' :''" @click = "tag = '0'">全部</span></a>
        <a href="#"><span :class="tag==='7' ?'active' :''" @click = "tag = '7'">华语</span></a>
        <a href="#"><span :class="tag==='96' ?'active' :''" @click = "tag = '96'">欧美</span></a>
        <a href="#"><span :class="tag==='8' ?'active' :''" @click = "tag = '8'">日本</span></a>
        <a href="#"><span :class="tag==='16' ?'active' :''" @click = "tag = '16'">韩国</span></a>
    </div>

    <!-- 表格 -->
    <el-table :data="newSongsList" style="width: 100%" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column>
        <template slot-scope="scope" >
          <div class="table-img-wrap">
            <img :src="scope.row.album.picUrl" class="table-pic" alt="">
            <a href="#" @click="playMusic(scope.row.id)"><i class="el-icon-caret-right table-icon"></i></a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="300px">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
          <a href="#" @click="playMusic(scope.row.id)"><i class="el-icon-video-play icon"></i></a>
        </template>
      </el-table-column>
      <el-table-column prop="artists[0].name" label="歌手" width="180px"></el-table-column>
      <el-table-column prop="album.name" label="专辑" width="340px"></el-table-column>
      <el-table-column prop="duration" label="时长" width="120px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tag:'0',
      newSongsList:[]
    }
  },
  watch: {
    tag() {
      this.getNewSongsList()
    }
  },
  created () {
    this.getNewSongsList()
  },
  mounted () {

  },
  methods: {
    async getNewSongsList() {
      const result = await this.$axios.get(`https://autumnfish.cn/top/song`,{params:{type:this.tag}})
      this.newSongsList = result.data.data
      for (let i = 0; i < this.newSongsList.length; i++) {
        let duration = this.newSongsList[i].duration
        let min = parseInt(duration / 1000 / 60)
        if (min < 10)
          min = '0' + min
        let sec = parseInt(duration / 1000 % 60)
        if (sec < 10)
          sec = '0' + sec
        this.newSongsList[i].duration = `${min}分${sec}秒`
      } 
    },
    async playMusic(id) {
      const result = await this.$axios.get(`https://autumnfish.cn/song/url`,{params:{id}})
      this.$parent.musicUrl = result.data.data[0].url
    }
  }
}
</script>

<style scoped>
  .songs-wrap .tag-bar {
    display: flex;
    justify-content: flex-end;
  }
  .songs-wrap .tag-bar span {
    margin-right: 18px;
    color:#808080;
    font-weight: 400;
  }
  .songs-wrap .tag-bar .active {
    color: #dd6d60;
  }
  .table-img-wrap {
    position: relative;
    width: 70px;
    height: 70px;
  }
  .table-img-wrap .table-pic {
    width: 100%;
    height: 100%;
  }
  .table-img-wrap .table-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    text-align: center;
    line-height: 26px;
    font-size: 24px;
    color: #dd6d60;
    background-color: rgba(255,255,255,0.8);
  }
  .icon {
    padding-left: 5px;
    color: #dd6d60;
  }
</style>
