<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.content" placeholder="Content" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" @change="handleFilter" style="width: 130px" >
        <el-option v-for="item in questionTypeOptions" :key="item.key" :label="item.display_name"
                   :value="item.key"/>
      </el-select>
      <el-select v-model="listQuery.level" placeholder="Level" clearable class="filter-item" @change="handleFilter" style="width: 130px" >
        <el-option v-for="item in questionLevelOptions" :key="item.key" :label="item.display_name"
                   :value="item.key"/>
      </el-select>
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
      <el-table-column label="Content" min-width="400" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Level" min-width="50" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" min-width="100" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Type }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px">
        <el-form-item label="Content" prop="Content">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="Please input content" v-model="temp.Content" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="Level" prop="Level">
          <el-select v-model="temp.Level" class="filter-item" placeholder="Please select">
            <el-option v-for="item in questionLevelOptions" :key="item.key" :label="item.display_name"
                       :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Type" prop="Type">
          <el-select v-model="temp.Type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in questionTypeOptions" :key="item.key" :label="item.display_name"
                       :value="item.key"/>
          </el-select>
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
    import {GetQuestion, CreateQuestion, UpdateQuestion, DeleteQuestion} from '@/api/question'
    import moment from 'moment'
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils/index'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import {getToken, getRole} from '@/utils/auth'

    const questionTypeOptions = [
        {key: 'Single Choice', display_name: 'Single Choice'},
        {key: 'Multiple Choice', display_name: 'Multiple Choice'},
        {key: 'Fill the blank', display_name: 'Fill the blank'},
        {key: 'Match', display_name: 'Match'},
    ];
    const questionLevelOptions = [
        {key: 1, display_name: 'Level 1'},
        {key: 2, display_name: 'Level 2'},
        {key: 3, display_name: 'Level 3'},
        {key: 4, display_name: 'Level 4'},
        {key: 5, display_name: 'Level 5'},
        {key: 6, display_name: 'Level 6'},
        {key: 7, display_name: 'Level 7'},
        {key: 8, display_name: 'Level 8'},
        {key: 9, display_name: 'Level 9'},
        {key: 10, display_name: 'Level 10'},
    ];
    const statusType = [
        {key: 0, display_name: 'Actived'},
        {key: 1, display_name: 'Deleted'}
    ];
    const statusValue = statusType.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});

    const questionTypeKeyValue = questionTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});
    const questionLevelKeyValue = questionLevelOptions.reduce((acc, cur) => {
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
                return questionTypeKeyValue[type]
            },
            levelFilter(level) {
                return questionLevelKeyValue[level]
            },
        },
        data() {
            return {
                tableKey: 0,
                list: null,
                listquestion: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    content: undefined,
                    iscorrect: undefined
                },
                questionTypeOptions,
                questionLevelOptions,
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Content: '',
                    Level: '',
                    Type: '',
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
                    Level: [{required: true, message: 'level is required', trigger: 'blur'}],
                    Type: [{required: true, message: 'type is required', trigger: 'blur'}]
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
                 GetQuestion(this.listQuery).then(response => {
                    this.list = response.data.data;
                    this.total = response.data.pages.total;
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
                    Content: '',
                    Level: '',
                    Type: '',
                    accessID: '',
                    accessUserRole: '',
                    IsDeleted: 0,
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
                this.listQuery.content = undefined;
                this.$nextTick(() => {
                    this.$refs.dataForm.clearValidate()
                })
            },
            createData() {
                this.$refs.dataForm.validate((valid) => {
                    if (valid) {
                        this.temp.accessUserRole = getRole();
                        this.temp.accessID = getToken();
                        CreateQuestion(this.temp).then((response) => {
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
                this.temp = Object.assign({}, row); // copy obj
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
                        UpdateQuestion(tempData, this.temp.ID).then((response) => {
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
                DeleteQuestion(id).then((response) => {
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
