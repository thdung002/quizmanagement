<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        Export
      </el-button>
    </div>
<!--search bar, sort -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="ID" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('ID')">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DateCreated" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt | format_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.TotalQuestion }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv1" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv2" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv3" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel3 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv4" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel4 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv5" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel5 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv6" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel6 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv7" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel7 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv8" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel8 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv9" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel9 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Question lv10" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.NumberQuestionLevel10 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.IsDeleted | statusFilter">
            {{ row.IsDeleted | activeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.IsDeleted!=1" size="mini" type="danger" @click="handleDelete(row,row.ID)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--Table for values-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.perpage"
                @pagination="getList"/>
<!--pagination-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="ID">
          <el-input :disabled="true" v-model="temp.ID"/>
        </el-form-item>
        <el-form-item label="Question lv1" prop="Question lv1">
          <el-input v-model="temp.NumberQuestionLevel1"/>
        </el-form-item>
         <el-form-item label="Question lv2" prop="Question lv2">
          <el-input v-model="temp.NumberQuestionLevel2"/>
        </el-form-item>
         <el-form-item label="Question lv3" prop="Question lv3">
          <el-input v-model="temp.NumberQuestionLevel3"/>
        </el-form-item>
         <el-form-item label="Question lv4" prop="Question lv4">
          <el-input v-model="temp.NumberQuestionLevel4"/>
        </el-form-item>
         <el-form-item label="Question lv5" prop="Question lv5">
          <el-input v-model="temp.NumberQuestionLevel5"/>
        </el-form-item>
         <el-form-item label="Question lv6" prop="Question lv6">
          <el-input v-model="temp.NumberQuestionLevel6"/>
        </el-form-item>
         <el-form-item label="Question lv7" prop="Question lv7">
          <el-input v-model="temp.NumberQuestionLevel7"/>
        </el-form-item>
         <el-form-item label="Question lv8" prop="Question lv8">
          <el-input v-model="temp.NumberQuestionLevel8"/>
        </el-form-item>
         <el-form-item label="Question lv9" prop="Question lv9">
          <el-input v-model="temp.NumberQuestionLevel9"/>
        </el-form-item>
         <el-form-item label="Question lv10" prop="Question lv10">
          <el-input v-model="temp.NumberQuestionLevel10"/>
        </el-form-item>
        <el-form-item label="Total" prop="Total Question">
          <span id="TotalQ">0</span>
        </el-form-item>
        <el-form-item label="Status" prop="IsDeleted">
          <el-select v-model="temp.IsDeleted" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'? createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
<!--    Hidden dialog-->
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
    import {GetConfig, CreateConfig, UpdateConfig, DeleteConfig} from '@/api/config'
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
                tableKey: 0,
                list: null,// du lieu do vao day
                total: 0,
                listLoading: true,
                listQuery: { // LIST ĐỂ FILTER
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                },
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: { //LIST DE ADD
                    ID: '',
                    NumberQuestionLevel1: 0,
                    NumberQuestionLevel2: 0,
                    NumberQuestionLevel3: 0,
                    NumberQuestionLevel4: 0,
                    NumberQuestionLevel5: 0,
                    NumberQuestionLevel6: 0,
                    NumberQuestionLevel7: 0,
                    NumberQuestionLevel8: 0,
                    NumberQuestionLevel9: 0,
                    NumberQuestionLevel10: 0 ,
                    TotalQuestion: 0,
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
                rules: {//CHECK RULE CAI DIALOG CHO ADD
                    TotalQuestion: [{required: true, message: 'At least 1 question!', trigger: 'blur'}],
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
              sumQ() {
                var total = this.NumberQuestionLevel1 + this.NumberQuestionLevel1 + 
                this.NumberQuestionLevel2 + this.NumberQuestionLevel3 + 
                this.NumberQuestionLevel4 + this.NumberQuestionLevel5 + 
                this.NumberQuestionLevel6 + this.NumberQuestionLevel7 + 
                this.NumberQuestionLevel8 + this.NumberQuestionLevel9 + 
                this.NumberQuestionLevel10;
                $("#TotalQ").text("test");
              },
            getList() {
                this.listLoading = false;
                GetConfig(this.listQuery).then(response => {
                    this.list = response.data.data;
                    this.total = response.data.items.total;
                });
            },
            handleFilter() {
                this.listQuery.page = 1;
                this.getList();
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: 'Success',
                    type: 'success'
                });
                row.status = status
            },
            sortChange(data) {
                const {prop, order} = data;
                if (prop === 'ID') {
                    this.sortByID(order)
                }
            },
            sortByID(order) {
                if (order === 'ascending') {
                    this.listQuery.sort = 'ASC'
                } else {
                    this.listQuery.sort = 'DESC'
                }
                this.handleFilter()
            },
            resetTemp() {
                this.temp = {
                    ID: '',
                    accessID: '',
                    accessUserRole: '',
                    IsDeleted: 0,
                }
            },    
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.sumQ();
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs.dataForm.clearValidate()
                })
            },
            createData() {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.temp.accessUserRole = getRole();
                        this.temp.accessID = getToken();
                        CreateConfig(this.temp).then((response) => {
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
            handleUpdate(row) {
                this.temp = Object.assign({}, row); 
                this.temp.accessID = getToken();
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp);
                        UpdateConfig(tempData, this.temp.ID).then((response) => {
                            if (response.result === "fail")
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Update Failed',
                                    type: 'warning',
                                    duration: 2000
                                });
                            else {
                                this.getList();
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: 'Success',
                                    message: 'Update Successfully',
                                    type: 'success',
                                    duration: 2000
                                })
                            }
                        })
                    }
                })
            },
            handleDelete(row, id) {
                DeleteConfig(id).then((response) => {
                    if (response.result === "fail")
                        this.$notify({
                            title: 'Warning',
                            message: 'Delete Failed',
                            type: 'warning',
                            duration: 2000
                        });
                    else {
                        this.getList();
                        this.$notify({
                            title: 'Success',
                            message: 'Delete Successfully',
                            type: 'success',
                            duration: 2000
                        });
                    }
                });
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
