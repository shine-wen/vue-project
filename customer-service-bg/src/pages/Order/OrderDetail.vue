<template>
    <div id="orderDetail">
        <header-des title="订单详情" des="表单页用于统计客服下单情况及订单的最终流向"></header-des>
        <div class="table-box">
            <el-row>
                <el-col :span="24">
                    <el-table :data="msg.tableData" v-loading="loading" border highlight-current-row
                              :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
                        <el-table-column prop="name" label="姓名">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.name"></el-input>
                            </span>
                                <span v-else>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="mobile" label="车主电话">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.mobile"></el-input>
                            </span>
                                <span v-else>{{scope.row.mobile}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="car_type" label="车型">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.car_type"></el-input>
                            </span>
                                <span v-else>{{scope.row.car_type}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="service_type" label="服务项目">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.service_type"></el-input>
                            </span>
                                <span v-else>{{scope.row.service_type}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="begin_adr" label="故障位置" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.begin_adr"></el-input>
                            </span>
                                <span v-else>{{scope.row.begin_adr}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="take_order" label="是否接单">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.take_order"></el-input>
                            </span>
                                <span v-else>{{scope.row.take_order}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="service_provider" label="接单服务商">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容"
                                          v-model="msg.chang.service_provider"></el-input>
                            </span>
                                <span v-else>{{scope.row.service_provider}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="ser_moblie" label="联系电话">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.ser_moblie"></el-input>
                            </span>
                                <span v-else>{{scope.row.ser_moblie}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="rescue_cost" label="施救费">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.rescue_cost"></el-input>
                            </span>
                                <span v-else>{{scope.row.rescue_cost}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="platform_fee" label="平台费">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.platform_fee"></el-input>
                            </span>
                                <span v-else>{{scope.row.platform_fee}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注">
                            <template slot-scope="scope">
                        <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="msg.chang.remarks"></el-input>
                            </span>
                                <span v-else>{{scope.row.remarks}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="订单状态" :formatter="formatData">
                            <!--<template slot-scope="scope">-->
                            <!--<span v-if="scope.row.isSet">-->
                            <!--<el-input size="mini" placeholder="请输入内容" v-model="msg.chang.status"></el-input>-->
                            <!--</span>-->
                            <!--<span v-else>{{scope.row.status}}</span>-->
                            <!--</template>-->

                        </el-table-column>
                        <el-table-column label="操作" :width="150" fixed="right">
                            <template slot-scope="scope">
                                <div>
                                    <div v-if="scope.row.isSet">
                                        <el-button size="mini" type="primary"
                                                   @click="handleEdit(scope.row,scope.$index,true)">
                                            保存
                                        </el-button>
                                        <el-button size="mini" type="danger"
                                                   @click="handleEdit(scope.row,scope.$index,false)">
                                            取消
                                        </el-button>
                                    </div>
                                    <div v-else>
                                        <el-button size="mini" type="primary"
                                                   @click="handleEdit(scope.row,scope.$index,true)">
                                            编辑
                                        </el-button>
                                        <el-button size="mini" type="danger"
                                                   @click="handleDelete(scope.row,scope.$index,false)">删除
                                        </el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="float-right m-top">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5,8,10,15,20]"
                                :page-size="size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                                :disabled="pagDisabled">
                        </el-pagination>
                    </div>
                    vuex状态getters监控——删除的id是 {{delOrderID}}
                    <br/>
                    vuex状态state直接获取——删除的id是 {{delOrderID}}
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "order-detail",
        data() {
            return {
                loading: false,//加载中效果
                msg: {
                    tableData: [
                        {
                            id: 1,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎111',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金',
                            take_order: '是',
                            service_provider: '广州车旅救司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主',
                            status: '1'
                        },
                        {
                            id: 2,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎222',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        },
                        {
                            id: 3,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎333',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '1'
                        },
                        {
                            id: 4,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎444',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        },
                        {
                            id: 5,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎444',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        },
                        {
                            id: 6,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎444',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        },
                        {
                            id: 7,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎444',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        },
                        {
                            id: 8,
                            mobile: '13760810892',
                            date: '2016-05-02',
                            name: '王小虎444',
                            car_type: '奥迪',
                            service_type: '困境',
                            begin_adr: '上海市普陀区金沙江路1518弄',
                            take_order: '是',
                            service_provider: '广州车旅救援有限公司',
                            ser_moblie: '18318555512',
                            rescue_cost: '200',
                            platform_fee: '180',
                            remarks: '我备注-车主喝酒开车撞到坑里啦',
                            status: '0'
                        }
                    ],
                    chang: null,//用于储存修改的数据字段和数据一样
                },
                currentPage: 1,//分页第一页
                size: 10,//
                total: 100,//总页数
                pagDisabled:false,//禁止点击分页
            }
        },
        computed: mapGetters([
            "delOrderID"
        ]),
        created() {
            this.initData();
            this.getOrderDetailLists();
        },
        mounted() {
        },
        methods: {
            initData() {
                this.msg.tableData.map(i => {
                    i.isSet = false;//给后台返回数据添加`isSet`标识
                    return i;
                });
                this.msg = Object.assign({}, this.msg, this.msg)
            },
            //修改数据,保存，取消
            handleEdit(row, index, status) {
                // 点击按钮时，先判断之前是否有修改项没保存（确保一修改一保存）
                for (let i of this.msg.tableData) {
                    if (i.isSet && i.id != row.id) {
                        this.$message.warning("请先保存当前编辑项！")
                        return false;
                    }
                }

                //点击取消按钮
                if (!status) {
                    this.msg.chang = {};
                    console.log("取消按钮")
                    console.log(row)
                    row.isSet = false;
                    return false;
                }

                if (row.isSet) {
                    let data = JSON.parse(JSON.stringify(this.msg.chang));
                    console.log("保存按钮")
                    console.log(data)
                    console.log(row)
                    for (let k in data) row[k] = data[k];
                    //然后这边重新读取表格数据
                    row.isSet = false;
                    this.$set(this.msg.tableData,index,row)//动态添加
                    this.initData();
                    console.log(this.msg)

                    this.$message({
                        type: 'success',
                        message: "保存成功!"
                    });


                } else {
                    //修改按钮
                    console.log("修改按钮")
                    console.log(row)
                    row.isSet = true;
                    this.$set(this.msg.tableData,index,row)//动态添加
                    this.msg.chang = JSON.parse(JSON.stringify(row));
                }


                //数据模板
                // let j = { id: 0, "mobile": "", "date": "", "name": "小黄", "car_type": "", "service_type": "", "isSet": true,
                //     "begin_adr": "","take_order":"",service_provider:"","ser_moblie":"","rescue_cost":"","platform_fee":"",
                //     "remarks":"","status":""
                // };
                //修改时，插入
                // this.msg.chang = JSON.parse(JSON.stringify(j));

            },
            //删除的项
            handleDelete(row, index, status) {
                this.$confirm('此操作将删除当前订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deteleOrder(row.id);
                    //vuex 管理
                    this.$store.dispatch("delOrder", row.id)
                }).catch(() => {
                    console.log("已取消删除")
                });
            },
            //删除订单ajax
            deteleOrder(id) {
                this.loading = true;
                this.pagDisabled=true;//分页禁止点击
                this.$ajax.post('/api-order/deteleOrder', id)
                    .then((res) => {
                        setTimeout(() => {
                            if (res.data.status) {
                                this.loading = false;
                                this.pagDisabled=false;
                                console.log(res)
                                this.msg.tableData.some((item, i) => {
                                    if (item.id == id) {
                                        this.msg.tableData.splice(i, 1)
                                        //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
                                        return true
                                    }
                                })
                                this.$notify({
                                    title: '成功',
                                    message: '订单删除成功！',
                                    type: 'success'
                                });

                            }
                        },1200)
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.pagDisabled=false;
                        this.$message.error(error);
                    });
            },
            //格式化数据
            formatData(row, column, cellValue) {
                // console.log(row)
                // console.log(column)
                // console.log(cellValue)
                // console.log("-----------------------------")
                if (cellValue === "1") {
                    return '成功';
                } else if (cellValue === "0") {
                    return '失败';
                }
            },

            //    分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.size = val
                   this.getOrderDetailLists();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getOrderDetailLists();

            },
            getOrderDetailLists(){
                this.loading = true;
                this.pagDisabled=true;//分页禁止点击
                this.$ajax.post('/api-order/orderDetailList',{
                    params: {
                        userId: 12345,
                        size:this.size,
                        currentPage:this.currentPage
                    }
                })
                    .then((res) => {
                        setTimeout(() => {
                            this.loading = false;
                            this.pagDisabled=false;
                            if (res.data.status) {
                                console.log(res.data.data);
                                this.msg.tableData=res.data.data;
                                this.initData();
                            }else {
                                this.$message.error('获取数据失败！');
                            }
                        },1200)
                    })
                    .catch((error) => {
                        this.loading = false;
                        this.pagDisabled=false;
                        this.$message.error(error);
                    });
            }
        }
    }

</script>

<style scoped lang="scss">

    #orderDetail {
        position: relative;
        width: 100%;
    }
    .table-box {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #fff;
    }
    .m-top {
        margin-top: 15px;
    }

</style>