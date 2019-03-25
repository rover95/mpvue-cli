<template>
  <div>
    <div class="form-row" :hidden="hasPickerShow" v-for="(row,idx) in formRows" :key="idx" v-if="!row.readable">
      <van-field
        v-if="row.type == 'string' && row.uploadType != 'image'" 
        type="textarea"
        autosize
        input-align='left'
        :label="row.name"
        :name="row.id"
        :id="row.id"
        :value="formValue[row.id]"
        @input="inputChange"
        :required= "row.required"
        :placeholder="'请输入'+row.name"
      />
      <!-- 整数输入 -->
      <van-field
        v-else-if="row.type == 'integer'"
        :label="row.name"
        type="number"
        :name="row.id"
        :id="row.id"
        :required= "row.required"
        :value="formValue[row.id]"
        @input="inputChange"
        :placeholder="'请输入'+row.name"
        
      />
      <!-- 数字输入 -->
      <van-field
        v-else-if="row.type == 'number'"
        :label="row.name"
        type="digit"
        :name="row.id"
        :id="row.id"
        :required= "row.required"
        :value="formValue[row.id]"
        @input="inputChange"
        :placeholder="'请输入'+row.name"
        
      />
      <!-- picker选择框 -->
      <van-cell
        v-else-if="row.type == 'enum'"
        :title="row.name"
        :value="formValue[row.id].text"
        is-link
        :id="row.id"
        :name="row.id"
        :required= "row.required"
        @click="showPicker"
      />

      <!-- 图片上传 -->
      <div class="cell-row" v-else-if="row.type == 'string' && row.uploadType == 'image'">
        <p class="label">{{row.name}}</p>
        <img-upload @onFileChang="onFileChang" :id="row.id"></img-upload>
      </div>
    </div>

    <!-- 动态生成picker -->
    <van-popup
      v-for="(picker,i) in pickerItems" :key="i"
      :show="picker.show"
      position="bottom" 
      :overlay="true"
      :id="picker.id"
      @close="pickerCancel"
    >
      <van-picker :columns="picker.enumRange" :id="picker.id" show-toolbar  @confirm="pickerConfirm" @cancel="pickerCancel"/>
    </van-popup>

  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
      pickerItems:[],
      formDataIndex:{},//表单索引对象
      formValue:null,
      hasPickerShow:false,
      formRows:[],
      isAllowSubmit:false
    }
  },
  props: {
    formData:{
      type: Array,
      default: []
    },
    onPickerShow: Function,
    formChange: Function
  },
  created() {
    this.formValue={};
  },
  beforeDestroy(e){
    console.log('销毁',this.formValue);
    this.formValue=null
  },
  onLoad(){
     this.formData.map(val=>{
      this.formValue[val.id] = null
    })
    this.initForm(this.formData)
    this.formChange(this.formValue);  
    
    this.formData.map(val=>{
      this.formDataIndex[val.id] = val
    })
    console.log('formdata',this.formData);
    
  },
  components: {

  },
  methods: {
    initForm(data){
      console.log(data);
      
      let pickerItems = data.filter(val=>val.type =='enum')
      let formValue = {...this.formValue}   //深拷贝修改状态后，再赋值回去，如果this.pickerValue直接增加新属性，视图不更新
      this.formRows = data
      pickerItems.map(val=>{
        console.log(val); 
        let item = {
          ...val,
          show:false
        }
        let enumRange = [];
        try {
          enumRange = JSON.parse(val.enumRange).dataSource;
        } catch (error) {
          console.log('表单解析错误：',error);
        }
        item.enumRange = enumRange.map(val=>{
          return {
            text: val.label,
            value: val.value
          }
        });
        this.pickerItems.push(item)
        formValue[val.id] = item.enumRange[0]
        
      })
      this.formValue = formValue
    },
    // 输入框变更
    inputChange(e){
      let {id} = e.mp.target;
      let value = e.mp.detail;
      this.formValue[id] = value;
      this.formChange(this.formValue);   
    },
    pickerConfirm(e){
      const { value, index } = e.mp.detail;
      // this.problemType=this.problemTypeList[index]
      // this.pickerShow= false;
      let id = e.target.id
      let formValue = {...this.formValue}

      for(let i of this.pickerItems){
        if(i.id == id){
          i.show=false
          formValue[i.id] = i.enumRange[index]
          break
        }
      }
     
      this.formValue = formValue;
      this.formChange(this.formValue);
      this.hasPickerShow=false;
      if(this.onPickerShow){
        this.onPickerShow(false)
      }
      console.log(this.formValue); 
    },
    pickerCancel(e){
      this.hasPickerShow=false;
      if(this.onPickerShow){
        this.onPickerShow(false)
      }
      let id = e.target.id
      for(let i of this.pickerItems){
        if(i.id == id){
          i.show=false
          break
        }
      }
    },
    showPicker(e){
      console.log(e);
      this.hasPickerShow= true;
      if(this.onPickerShow){
        this.onPickerShow(true)
      }
      let id = e.target.id
      for(let i of this.pickerItems){
        if(i.id == id){
          i.show=true
          break
        }
      }
      
      
      // this.pickerShow = true
    },
    areaPickerCancel(){
      this.areaPickerShow=false;
    },
    showAreaPicker(){
      this.areaPickerShow = true
    },
    
   
    //判断是否能提交
    isAlowSend(){
      this.isAllowSubmit = this.tel && this.problemInfo && this.tel!='' && this.problemInfo!='';
    },
    onTelInputChange(e){
      let value = e.mp.detail;
      this.tel = value;
      this.isAlowSend();
    },
    onTextareaChange(e){
      let value = e.mp.detail.value;
      this.problemInfo = value
      this.isAlowSend();
    },
    onCityChange(e){
      console.log(e);
      
    },
    //上传图片数组改变
    onFileChang(e){
      console.log(e.mp.detail);
      let fileData = e.mp.detail
      this.formValue[fileData.id] = fileData.file
      this.formChange(this.formValue);
      
    }
  }
}
</script>

<style scoped lang="stylus">
.page{
  // height 100vh  
  // overflow hidden
  // box-sizing border-box
}
.form-box{
  height 100%
  overflow scroll
  box-sizing border-box
}
.cell-row{
  margin-bottom 5rpx;
  .label{
    position relative
    font-size 15px
    padding 20rpx 30rpx
    color #888
  }
}
.btn-box{
  padding 30rpx
  margin-top 30rpx
  .btn{
    background-color #44bb00
    color #fff
  }
}
.picker-box{
  position fixed
  bottom 0
  left 0
  right 0
}
.problem-container{
  min-height:156rpx;
  background:rgb(255,255,255);
  padding: 30rpx;
  font-size:30rpx;
  color:rgb(138,138,138);
  border-bottom:1px solid #E5E5E5;
}
.isrequest{
  position: relative;
}
.isrequest::before{
  content:'*';
  position: absolute;
  left: -8px;
  /* top: 2px; */
  color: #f33;
}
</style>
