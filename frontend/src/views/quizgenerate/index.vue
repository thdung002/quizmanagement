<template>
  <div class="app-container">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Examination ID" prop="Examination">
          <el-select v-model="temp.Examination" class="filter-item" placeholder="Please select">
            <el-option v-for="item in listexam" :key="item.ID" :label="item.Description" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Config ID" prop="Config">
          <el-select v-model="temp.Config" class="filter-item" placeholder="Please select">
            <el-option v-for="item in listconfig" :key="item.ID" :label="item.Description" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Template ID" prop="Template">
          <el-select v-model="temp.Template" class="filter-item" placeholder="Please select">
            <el-option v-for="item in listtemplate" :key="item.ID" :label="item.Description" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="IsDeleted">
          <el-select v-model="temp.IsDeleted" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData()">
          Confirm
        </el-button>
      </div>
  </div>
</template>

<script>
    import {CreateQuiz} from '@/api/quiz'
    import {GetActiveExam} from '@/api/examination'
    import {GetActiveConfig} from '@/api/config'
    import {GetTemplate, GetOneTemplate} from '@/api/template'
    import moment from 'moment'
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils/index'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import {getToken, getRole} from '@/utils/auth'

    const statusType = [
        {key: 0, display_name: 'Actived'},
        {key: 1, display_name: 'Deleted'}
    ];
    const statusValue = statusType.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});
    // arr to obj, such as { CN : "China", US : "USA" }

    export default {
        computed: {
        getTemplateID () {
            return store.$state.template
            },
        // getExam () {
        //     return store.$state.examination
        //     },
        // getQuiz () {
        //     return store.$state.quiz
        //     }
        },

        name: 'ComplexTable',
        components: {Pagination},
        directives: {waves},
        filters: {
            format_date(value){
                if (value) {
                    return moment(String(value)).format('DD-MM-YYYY H:m')
                }
            },
            statusFilter(status) {
                const statusMap = {
                    0: 'success',
                    1: 'danger'
                };
                return statusMap[status]
            },
            correctFilter(status) {
                const statusMap = {
                    0: 'default',
                    1: 'warning'
                };
                return statusMap[status]
            },

            activeFilter(active) {
                return statusValue[active]
            },
        },
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else {
                    callback()
                }
            };

            return {
                passwordType: 'password',
                tableKey: 0,
                list: null,
                listexam: null,
                listconfig: null,
                listtemplate: null,
                total: 0,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    content: undefined,
                    iscorrect: undefined
                },
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Examination: '',
                    Config: '',
                    Template: '',
                    accessID: '',
                    accessUserRole: '',
                },
                template: '',
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                dialogPvVisible: false,
                pvData: [],
                rules: {
                    Examination: [{required: true, message: 'Examination is required', trigger: 'blur'}],
                    Config: [{required: true, message: 'Config id is required', trigger: 'blur'}],
                    Template: [{required: true, message: 'Template answer is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                GetActiveExam().then((response) => {
                    this.listexam = response.data;
                });
                GetActiveConfig().then((response) => {
                    this.listconfig = response.data;
                });
                GetTemplate().then((response) => {
                    this.listtemplate = response.data.data;
                });
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: 'Success',
                    type: 'success'
                });
                row.status = status
            },
            resetTemp() {
                this.temp = {
                    ID: '',
                    Examination: '',
                    Config: '',
                    Template: '',
                    accessID: '',
                    accessUserRole: '',
                    IsDeleted: 0,
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.$nextTick(() => {
                    this.$refs.dataForm.clearValidate()
                })
            },
            createData() {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.temp.accessUserRole = getRole();
                        this.temp.accessID = getToken();
                        CreateQuiz(this.temp).then((response) => {
                            if (response.result === "fail")
                                this.$notify({
                                    title: 'Fail',
                                    message: 'Created Failed',
                                    type: 'warning',
                                    duration: 2000,
                                    position: 'top-right'
                                });
                            else {
                                // GetOneTemplate(parseInt(this.temp.Template)).then((response) => {
                                // this.template = response.data[0];
                                // });
                                this.getList();
                                this.$notify({
                                    title: 'Success',
                                    message: 'Created Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.$store.state.template = this.temp.Template;
                                this.$store.state.examination = this.temp.Examination;
                                this.$store.state.config = this.temp.Config;
                                console.log(this.$store.state.template);
                                console.log(this.$store.state.examination);
                                console.log(this.$store.state.config);
                                this.$router.push({
                                    path:'/quizconfig/template/download/'
                                })
                            }
                        })
                    }
                })
            },
            handleFetchPv(pv) {
                fetchPv(pv).then(response => {
                    this.pvData = response.data.pvData;
                    this.dialogPvVisible = true
                })
            },
            handleDownload() {
                this.downloadLoading = true;
                import('@/vendor/Export2Excel').then(excel => {
                    const data = this.formatJson(filterVal);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    });
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.list.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            getSortClass(key) {
                const sort = this.listQuery.sort;
                return sort === `${key}` ? 'ascending' : 'descending'
            }
        }
    }
</script>
