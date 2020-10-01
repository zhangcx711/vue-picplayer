<template>
  <div class="top-wrapper">
    <div class="left-box">
      <!-- 图标 -->
      <div class="icon-wrapper">
        <a href="#">
          <i class="el-icon-house" style="backgroundColor:rgb(221, 109, 96)"></i>
        </a>
        <a href="#">
          <i class="el-icon-minus" style="backgroundColor:rgb(220, 192, 96)"></i>
        </a>
        <a href="#">
          <i class="el-icon-full-screen" style="backgroundColor:rgb(132, 187, 88)"></i>
        </a>
      </div>
    </div>
    <div class="right-box">
      <!-- 箭头 -->
      <div class="arrow-wrap">
        <a href="#"><i class="el-icon-arrow-left"></i></a>
        <a href="#"><i class="el-icon-arrow-right"></i></a>
      </div>
      <!-- 搜索 -->
      <div class="search">
        <el-input 
          placeholder="搜索" 
          prefix-icon="el-icon-search" 
          v-model="inputValue" 
          size="small"
          @change="toResult">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索输入框输入的内容
      inputValue:""
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    toResult() {
      if(this.inputValue == '') {
        return this.$message.warning('请输入内容')
      }
      this.$router.push('/result?q=' + this.inputValue)
    }
  }
}
</script>

<style scoped>
  .top-wrapper {
    width: 100%;
    height: 60px;
    padding: 0 10px;
    background-color: rgb(249, 249, 249);
    box-sizing: border-box;
  }
  .left-box {
    float: left;
  }
  .right-box{
    display: flex;
    justify-content: space-between;
    float: right;
    align-items: center;
    width: 1340px;
    height: 60px;
    padding-right: 30px;
  }

  /* 设置图标 */
  .icon-wrapper {
    margin-left: 5px;
    font-size: 12px;
  }
  .icon-wrapper i{
    width: 18px;
    height: 18px;
    margin: 2px 5px;
    border-radius: 50%;
    text-align: center;
    line-height: 18px;
  }
  .icon-wrapper i::before {
    /* 透明度 */
    opacity: 0;
    transition: 0.3s;
  }
  .icon-wrapper i:hover::before {
    opacity: 1;
  }

  /* 设置箭头 */
  .arrow-wrap i {
    width: 35px;
    height: 35px;
    font-size: 24px;
    text-align: center;
    line-height: 35px;
    color: gray;
    border-radius: 50%;
    transition: 0.2s;
  }
  .arrow-wrap i:first-child {
    margin-right: 10px;
  }
  .arrow-wrap i:hover {
    background-color: #ebebeb;
  }

</style>
