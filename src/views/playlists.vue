<template>
  <div playlists-wrap>
    <!-- 精品歌单部分 -->
    <div class="top-card">
      <!-- 背景 -->
      <img :src="fineSongsList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
      <!-- 图片 -->
      <div class="img-wrap">
        <img :src="fineSongsList.coverImgUrl" alt="">
      </div>
      <!-- 文字 -->
      <div class="word-wrap">
        <div class="tag">精品歌单</div>
        <h4 class="title">{{fineSongsList.name}}</h4>
        <p class="content">{{fineSongsList.description}}</p>
      </div>
    </div>

    <!-- 分类歌单 -->
    <div class="classify-wrap">
      <!-- tab栏标签 -->
      <div class="tag-bar">
        <a href="#"><span :class="tag==='全部' ?'active' :''" @click = "tag = '全部'">全部</span></a>
        <a href="#"><span :class="tag==='欧美' ?'active' :''" @click = "tag = '欧美'">欧美</span></a>
        <a href="#"><span :class="tag==='华语' ?'active' :''" @click = "tag = '华语'">华语</span></a>
        <a href="#"><span :class="tag==='流行' ?'active' :''" @click = "tag = '流行'">流行</span></a>
        <a href="#"><span :class="tag==='说唱' ?'active' :''" @click = "tag = '说唱'">说唱</span></a>
        <a href="#"><span :class="tag==='摇滚' ?'active' :''" @click = "tag = '摇滚'">摇滚</span></a>
        <a href="#"><span :class="tag==='民谣' ?'active' :''" @click = "tag = '民谣'">民谣</span></a>
        <a href="#"><span :class="tag==='电子' ?'active' :''" @click = "tag = '电子'">电子</span></a>
        <a href="#"><span :class="tag==='轻音乐' ?'active' :''" @click = "tag = '轻音乐'">轻音乐</span></a>
        <a href="#"><span :class="tag==='影视原声' ?'active' :''" @click = "tag = '影视原声'">影视原声</span></a>
        <a href="#"><span :class="tag==='ACG' ?'active' :''" @click = "tag = 'ACG'">ACG</span></a>
        <a href="#"><span :class="tag==='怀旧' ?'active' :''" @click = "tag = '怀旧'">怀旧</span></a>
        <a href="#"><span :class="tag==='治愈' ?'active' :''" @click = "tag = '治愈'">治愈</span></a>
        <a href="#"><span :class="tag==='流行' ?'active' :''" @click = "tag = '流行'">流行</span></a>
      </div>
      <div class="classify-content">
        <el-row :gutter="20">
          <el-col :span="4.8" v-for="item in classifySongsList" :key="item.id">
            <div class="img-wrap">
              <span>播放量：{{item.playCount}}</span>
              <img :src="item.coverImgUrl" alt="">
              <a href="#"><i class="el-icon-caret-right"></i></a>
            </div>
            <p>{{item.name}}</p>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="10"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fineSongsList: {},
      classifySongsList: [],
      tag: '全部',
      total: 0,
      pagenum: 1
    }
  },
  watch: {
    tag() {
      this.getFineSongs()
      this.getClassifySongs()
    }
  },
  created () {
    this.getFineSongs()
    this.getClassifySongs()
  },
  mounted () {},
  methods: {
    async getFineSongs() {
      const result = await this.$axios.get(`https://autumnfish.cn/top/playlist/highquality`,
      {params:{cat:this.tag}})
      this.fineSongsList = result.data.playlists[0]
    },
    async getClassifySongs() {
      const result = await this.$axios.get(`https://autumnfish.cn/top/playlist/`,
      {params:{
        limit:10,
        offset:(this.pagenum -1) * 10,
        cat:this.tag
      }})
      this.classifySongsList = result.data.playlists
      this.total = result.data.total
    },
    handleCurrentChange(page) {
      this.pagenum = page
      this.getClassifySongs()
    }
  }
}
</script>

<style>
  .top-card {
    position: relative;
    display: flex;
    align-items: center;
    width: 1100px;
    height: 200px;
    background-color: #eee;
    overflow: hidden;
    border-radius: 5px;
  }
  .top-card .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    filter: blur(20px);
  }
  .top-card .bg-mask {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .top-card .img-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    z-index: 1;
  }
  .top-card .img-wrap img {
    width: 160px;
    height: 160px;
  }
  .top-card .word-wrap {
    width: 880px;
    height: 160px;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  .top-card .word-wrap .tag {
    width: 100px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #dfac67;
    border: 1px solid #dfac67;
    border-radius: 5px;
    font-size: 16px;
  }
  .top-card .word-wrap .title {
    color: white;
    margin-top: 10px;
  }
  .top-card .word-wrap .content {
    color: #ccc;
    padding-top: 10px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
  .classify-wrap .tag-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
  .classify-wrap .tag-bar span {
    margin-right: 18px;
    color:#808080;
    font-weight: 400;
  }
  .classify-wrap .tag-bar .active {
    color: #dd6d60;
  }
  .classify-wrap .classify-content{
    margin-top: 30px;
  }
  .classify-wrap .classify-content .el-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .classify-wrap .classify-content .el-row .el-col{
    margin-bottom: 20px;
  }
  
  .classify-wrap .classify-content .img-wrap {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
  }
  .classify-wrap .classify-content .img-wrap span {
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
  .classify-wrap .classify-content .img-wrap:hover span {
    top: 0;
  }
  .classify-wrap .classify-content .img-wrap img {
    width: 100%;
    height: 100%;
  }
  .classify-wrap .classify-content .img-wrap a i {
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
  .classify-wrap .classify-content .img-wrap:hover a i {
    opacity: 1;
  }
  .classify-wrap .classify-content p {
    width: 200px;
    font-size: 15px;
    padding-top: 5px;
  }
  .el-pagination {
    display: flex;
    justify-content: center;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #dd6d60; 
  }
</style>
