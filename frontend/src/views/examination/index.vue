<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.lecturer" placeholder="Lecturer name" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.semester" placeholder="Semester" clearable class="filter-item" @change="handleFilter" style="width: 130px" >
        <el-option v-for="item in semesterType" :key="item.key" :label="item.display_name+'('+item.key+')'"
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
      <el-table-column label="ID" prop="ID" sortable="custom" align="center" width="80" fixed
                       :class-name="getSortClass('ID')">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DateCreated" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt | format_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" width="200" align="center" fixed>
        <template slot-scope="{row}" >
          <span class="link-type" @click="handleUpdate(row)">{{ row.Description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Lecturer name" width="200" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Lecturer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Semester" min-width="200" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Semester }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Duration" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Duration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Notes" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Notes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Department" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Department }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Course" width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.Course">
            {{ row.Course }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="CourseCode" width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.Coursecode">
            {{ row.Coursecode }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Academic Year" width="200" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.AcademicYear">
            {{ row.AcademicYear }}
          </el-tag>
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
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px">
        <el-form-item label="Description" prop="Description">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="Please input description" v-model="temp.Description" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="Lecturer name" prop="Lecturer">
          <el-input v-model="temp.Lecturer" clearable/>
        </el-form-item>
        <el-form-item label="Duration" prop="Duration">
          <el-input v-model="temp.Duration" clearable/>
        </el-form-item>
        <el-form-item label="Semester" prop="Semester">
          <el-input v-model="temp.Semester" clearable/>
        </el-form-item>
        <el-form-item label="Notes" prop="Notes">
          <el-input v-model="temp.Notes" clearable/>
        </el-form-item>
        <el-form-item label="Department" prop="Department">
          <el-input v-model="temp.Department" clearable/>
        </el-form-item>
        <el-form-item label="Course name" prop="Course">
          <el-input v-model="temp.Course" clearable/>
        </el-form-item>
        <el-form-item label="Course code" prop="Coursecode">
          <el-input v-model="temp.Coursecode" clearable/>
        </el-form-item>
        <el-form-item label="Academic Year" prop="AcademicYear">
          <el-input v-model="temp.AcademicYear" clearable/>
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
    import {GetExam, CreateExam, UpdateExam, DeleteExam} from '@/api/examination'
    import moment from 'moment'
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils/index'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import {getToken, getRole} from '@/utils/auth'

    const semesterType = [
        {key: 1, display_name: 'Semester 1'},
        {key: 2, display_name: 'Semester 2'},
        {key: 3, display_name: 'Semester 3'},
    ];
    const statusType = [
        {key: 0, display_name: 'Actived'},
        {key: 1, display_name: 'Deleted'}
    ];
    const statusValue = statusType.reduce((acc, cur) => {
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

            activeFilter(active) {
                return statusValue[active]
            },
        },
        data() {
            return {
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    lecturer: undefined,
                    semester: undefined
                },
                semesterType,
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Lecturer: '',
                    Semester: '',
                    Duration: '',
                    Notes: '',
                    Department: '',
                    Course: '',
                    Description:'',
                    CourseCode: '',
                    AcademicYear:'',
                    accessID: '',
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
                    Duration: [{required: true, message: 'duration is required', trigger: 'blur'}],
                    Semester: [{required: true, message: 'semester id is required', trigger: 'blur'}],
                    Department: [{required: true, message: 'department is required', trigger: 'blur'}],
                    Course: [{required: true, message: 'course name is required', trigger: 'blur'}],
                    CourseCode: [{required: true, message: 'course code is required', trigger: 'blur'}],
                    AcademicYear: [{required: true, message: 'academic year is required', trigger: 'blur'}],
                    Lecturer: [{required: true, message: 'lecturer name is required', trigger: 'blur'}],
                    Description: [{required: true, message:'please input description',trigger:'blur'}]
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
                GetExam(this.listQuery).then(response => {
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
                    Lecturer: '',
                    Semester: '',
                    Duration: '',
                    Notes: '',
                    Department: '',
                    Course: '',
                    Coursecode: '',
                    Description:'',
                    AcademicYear:'',
                    accessID: '',
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
                        this.temp.accessID = getToken();
                        CreateExam(this.temp).then((response) => {
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
                        UpdateExam(tempData, this.temp.ID).then((response) => {
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
                DeleteExam(id).then((response) => {
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
