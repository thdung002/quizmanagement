<template>
  <div class="app-container">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="Examination ID" prop="Examination">
          <el-select v-model="temp.Examination" class="filter-item" placeholder="Please select">
            <el-option v-for="item in listquestion" :key="item.ID" :label="item.Examination" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Config ID" prop="Config">
          <el-select v-model="temp.Config" class="filter-item" placeholder="Please select">
            <el-option v-for="item in listquestion" :key="item.ID" :label="item.Config" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Template ID" prop="Template">
          <el-select v-model="temp.Template" class="filter-item" placeholder="Please select">
            <el-option v-for="item in Template" :key="item.ID" :label="item.Template" :value="item.ID"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="IsDeleted">
          <el-select v-model="temp.IsDeleted" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogStatus==='create'? createData():updateData()">
          Confirm
        </el-button>
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
      </div>
    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {CreateQuiz} from '@/api/quiz'
    import {GetActiveExam} from '@/api/examination'
    import {GetActiveConfig} from '@/api/config'
    import {GetActiveTemplate} from '@/api/template'
    import moment from 'moment'
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils/index'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import {getToken, getRole} from '@/utils/auth'
    
    const answerType = [
        {key: 1, display_name: 'Correct Answer'},
        {key: 0, display_name: 'Default Answer'},
    ];
    const statusType = [
        {key: 0, display_name: 'Actived'},
        {key: 1, display_name: 'Deleted'}
    ];
    const statusValue = statusType.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});
    // arr to obj, such as { CN : "China", US : "USA" }
    const answerValue = answerType.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});
    export default {
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
            typeFilter(type) {
                return answerValue[type]
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
                listLoading: true,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    content: undefined,
                    iscorrect: undefined
                },
                answerType,
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Question: '',
                    Content: '',
                    IsCorrect: '',
                    CorrectAnswer: '',
                    accessID: '',
                    accessUserRole: '',

                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                dialogPvVisible: false,
                pvData: [],
                rules: {
                    Content: [{required: true, message: 'content is required', trigger: 'blur'}],
                    Question: [{required: true, message: 'question id is required', trigger: 'blur'}],
                    IsCorrect: [{required: true, message: 'correct answer is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = false;
                GetActiveExam().then((response) => {
                    this.listexam = response.data;
                });
                GetActiveConfig().then((response) => {
                    this.listconfig = response.data;
                });
                GetActiveTemplate().then((response) => {
                    this.listtemplate = response.data;
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
                    Question: '',
                    Content: '',
                    IsCorrect: '',
                    CorrectAnswer: '',
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
                        CreateAnswer(this.temp).then((response) => {
                            if (response.result === "fail")
                                this.$notify({
                                    title: 'Fail',
                                    message: 'Created Failed',
                                    type: 'warning',
                                    duration: 2000,
                                    position: 'top-right'
                                });
                            else {
                                this.list.unshift(this.temp);
                                this.dialogFormVisible = false;
                                this.getList();
                                this.$notify({
                                    title: 'Success',
                                    message: 'Created Successfully',
                                    type: 'success',
                                    duration: 2000
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
