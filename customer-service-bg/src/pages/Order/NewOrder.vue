<template>
       <div id="newOrder">

           <header-des title="客服下单" des="表单页用于向用户收集救援信息，随后系统完成订单生成及派送给服务商"></header-des>
           <el-row :gutter="20" >
               <el-col :span="12" :offset="6">
                   <!--剧中表单-->
                   <div class="grid-content bg-purple">

                       <el-form :rules="rules" ref="form" :model="form" label-width="120px"  >

                           <el-form-item label="姓名：" prop="name">
                               <el-input v-model="form.name" placeholder="请填写车主姓名" clearable></el-input>
                           </el-form-item>

                           <el-form-item label="电话：" prop="mobile">
                               <el-input v-model.number="form.mobile" placeholder="请填写车主联系号码" maxlength="11" clearable></el-input>
                           </el-form-item>

                           <el-form-item label="车型：" prop="car">
                               <el-input v-model="form.car" placeholder="请填写救援车车型" clearable></el-input>
                           </el-form-item>

                           <el-form-item label="服务项目：" prop="type">
                               <el-select v-model="form.type" @change="selectType" placeholder="请选择服务项目">
                                   <el-option label="拖车" value="1"></el-option>
                                   <el-option label="搭电" value="2"></el-option>
                                   <el-option label="换备胎" value="3"></el-option>
                                   <el-option label="开锁" value="5"></el-option>
                                   <el-option label="困境" value="6"></el-option>
                               </el-select>
                           </el-form-item>

                           <el-form-item label="故障位置：" prop="begin">
                               <el-autocomplete style="width:100%"
                                       v-model="form.begin"
                                       :fetch-suggestions="querySearchAsync"
                                       placeholder="请填写汽车故障位置"
                                       @select="handleSelectBeginAdr"
                                      :trigger-on-focus="false"
                                      clearable>
                               </el-autocomplete>
                           </el-form-item>

                           <el-form-item  v-if="form.type==1||form.type==6" label="拖车目的地：" prop="end">
                               <el-autocomplete style="width:100%"
                                                v-model="form.end"
                                                :fetch-suggestions="querySearchAsync"
                                                placeholder="请选择拖车目的地"
                                                @select="handleSelectEndAdr"
                                                :trigger-on-focus="false"
                                                clearable>
                               </el-autocomplete>
                           </el-form-item>

                           <el-form-item label="订单备注：" prop="desc">
                               <el-input type="textarea" v-model="form.desc" placeholder="请填写订单的相关细节" clearable></el-input>
                           </el-form-item>


                           <el-form-item>
                               <el-button type="primary" :loading="false" @click="onSubmit('form')">创建订单</el-button>
                               <el-button @click="resetForm('form')">重置</el-button>
                           </el-form-item>
                       </el-form>
                   </div>

               </el-col>
           </el-row>

       </div>
</template>

<script>

    // import getAdrressList from '../../assets/js/map'

    var map = new AMap.Map("newOrder", {
        resizeEnable: true
    });

    var auto = new AMap.Autocomplete({
        // input: "start"
    });

    //验证手机号
    var checkPhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            console.log(reg.test(value));
            if (reg.test(value)) {
                callback();
            } else {
                return callback(new Error('请输入正确的手机号'));
            }
        }
    };


    export default {
        name: "new-order",
        data() {
            //检验是否是拖车（有目的地）
            var checkType=(rule, value, callback) => {
                if(this.form.type==1||this.form.type==6){
                      if(!value){
                          return callback(new Error('请输入拖车目的地'));
                      }else {
                          callback();
                      }
                }else {
                    callback();
                }
            };
            return {
                form: {
                    begin:'',//起点
                    end:'',//终点
                    name: '',//姓名
                    mobile:'',//电话
                    car:'',//车型
                    type: '',//服务项目
                    desc: '',//订单备注
                },
                timeout:  null,
               //高德地址
                addressArr:[],
                //表单验证规则
                rules: {
                    name: [
                        { required: true, message: '请输入车主姓名', trigger: 'blur' },
                        { min: 2,  message: '长度不能少于 2 个字符', trigger: 'blur' }
                    ],
                    mobile:[
                        {validator: checkPhone,required: true, trigger: 'blur'}
                    ],
                    car:[
                        { required: true, message: '请输入车型', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择服务项目', trigger: 'change' }
                    ],
                    begin: [
                        { required: true, message: '请输入故障位置', trigger: 'blur' }
                    ],
                    end: [
                        { validator: checkType,required: true, trigger: 'blur' }
                    ],
                    desc: [
                        { required: false, trigger: 'blur' }
                    ],
                }
            }
        },
        created(){

        },
        mounted() {

        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.takeOrder(formName);//下单
                    } else {
                        console.log('error submit !!！');
                        return false;
                    }
                });
            },
            takeOrder(formName){
                const loading = this.$loading({
                    lock: true,
                    text: '提交中...',
                    // spinner: 'el-icon-loading',
                    // background: 'rgba(0, 0, 0, 0.7)'
                })

                this.$ajax.post('/api-order/addOrder',this.form)
                    .then( (response)=> {
                         setTimeout(()=>{
                             loading.close();
                             if(1){
                                 this.$notify({
                                     title: '成功',
                                     message: '新订单下单成功！',
                                     type: 'success'
                                 });
                              // 重置表单
                                 this.$refs[formName].resetFields();
                             }
                             console.log(response);
                         },3000)
                    })
                    .catch( (error)=> {
                        loading.close();
                        this.$message.error(error);
                    });


            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            selectType(){
                 console.log("服务类型")
                 console.log(this.form.type)
            },
            //地址展示框
            querySearchAsync(queryString, cb) {
                //异步的坑，只能放这里，不能引进封装的js
                 var addressArr=[];
                auto.search(queryString, (status, result)=> {
                    // 搜索成功时，result即是对应的匹配数据
                    if(status=="complete"){

                        result.tips.forEach((values,index)=> {
                            var item={};
                            item.value=values.district + values.address
                               addressArr.push(item);
                             })
                    }
                })
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    //返回值
                    cb(addressArr);
                },  100* Math.random());
            },

            //起点地址
            handleSelectBeginAdr(item) {
                console.log("起点")
                console.log(item);
            },
        // 终点
            handleSelectEndAdr(item){
                console.log("终点")
                console.log(item);
            }
        }
    }



</script>

<style scoped lang="scss">
     #newOrder{
         position: relative;
         width: 100%;
     }

    /*表单区域*/
     .el-row {
         margin-bottom: 20px;
         &:last-child {
             margin-bottom: 0;
         }

         background-color: #FFF;
         border: 1px solid #EBEEF5;
         border-radius: 4px;
         padding: 30px 0px;
         box-sizing: border-box;
         /*-webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/
         /*box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);*/

     }
     /*栅格栏*/
     .grid-content {

     }

    /* 表单区域*/


</style>