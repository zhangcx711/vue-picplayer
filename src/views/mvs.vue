<template>
  <div class="mvs-wrap">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <div class="tab-bar-area">
          <span class="title">地区：</span>
          <a href="#"><span :class="area==='全部' ?'active' :''" @click = "area = '全部'">全部</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="area==='内地' ?'active' :''" @click = "area = '内地'">内地</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="area==='港台' ?'active' :''" @click = "area = '港台'">港台</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="area==='欧美' ?'active' :''" @click = "area = '欧美'">欧美</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="area==='日本' ?'active' :''" @click = "area = '日本'">日本</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="area==='韩国' ?'active' :''" @click = "area = '韩国'">韩国</span></a>
      </div>

      <div class="tab-bar-type">
          <span class="title">类型：</span>
          <a href="#"><span :class="type==='全部' ?'active' :''" @click = "type = '全部'">全部</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="type==='官方版' ?'active' :''" @click = "type = '官方版'">官方版</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="type==='原声' ?'active' :''" @click = "type = '原声'">原声</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="type==='现场版' ?'active' :''" @click = "type = '现场版'">现场版</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="type==='网易出品' ?'active' :''" @click = "type = '网易出品'">网易出品</span></a>
      </div>

      <div class="tab-bar-order">
          <span class="title">排序：</span>
          <a href="#"><span :class="order==='上升最快' ?'active' :''" @click = "order = '上升最快'">上升最快</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="order==='最热' ?'active' :''" @click = "order = '最热'">最热</span></a>
          <span class="line">|</span>
          <a href="#"><span :class="order==='最新' ?'active' :''" @click = "order = '最新'">最新</span></a>
      </div>
    </div>
    
    <!-- 最新MV -->
    <div class="mvs">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in mvsLsit" :key="item.id">
          <div class="img-wrap">
            <span><i class="el-icon-caret-right"></i>{{item.duration}}</span>
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

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-size="8"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mvsLsit:[],
      pagenum:1,
      total:0,
      area:'全部',
      type:'全部',
      order:'上升最快'
    }
  },
  watch: {
    area() {
      this.getMVsList()
    },
    type() {
      this.getMVsList()
    },
    order() {
      this.getMVsList()
    },
  },
  created () {
    this.getMVsList()
  },
  mounted () {

  },
  methods: {
    async getMVsList() {
      const result = await this.$axios.get(`https://autumnfish.cn/mv/all`,
      {params:{
        area:this.area,
        type:this.type,
        order:this.order,
        limit:8,
        offset:(this.pagenum-1)*8
      }})
      this.mvsLsit = result.data.data
      if(result.data.count) {
        this.total = result.data.count
      }
    },
    handleCurrentChange(page) {
      this.pagenum = page
      this.getMVsList()
    }
  }
}
</script>

<style scoped>
  .mvs-wrap .tab-bar .active {
    color: #dd6d60;
    background-color: rgba(252, 246, 245);
    border-radius: 10px;
  }
  .mvs-wrap .tab-bar .line {
    padding: 0 35px;
    color: #eee;
  }
  .mvs-wrap .tab-bar .title {
    margin-right: 35px;
  }
  .mvs-wrap .tab-bar .tab-bar-type {
    margin: 30px 0;
  }
  .mvs-wrap .mvs {
    margin-top: 30px;
  }
  .mvs-wrap .mvs .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .mvs-wrap .mvs .el-row .el-col{
    /* height: 100%; */
    margin-bottom: 25px;
  }
  .mvs-wrap .mvs .img-wrap {
    position: relative;
    width: 250px;
    height: 140px;
  }
  .mvs-wrap .mvs .img-wrap span {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    color: white;
    font-size: 15px;
  }
  .mvs-wrap .mvs .img-wrap span i{
    font-size: 17px;
  }
  .mvs-wrap .mvs .img-wrap img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
  .mvs-wrap .mvs .img-wrap a i {
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
  .mvs-wrap .mvs .img-wrap:hover a i {
    opacity: 1;
  }
  .mvs-wrap .mvs .word-wrap .song_name {
    width: 100%;
    font-size: 14px;
    padding: 4px 0;
  }
  .mvs-wrap .mvs .word-wrap .singer_name {
    font-size: 12px;
    color: gray;
  }
</style>
