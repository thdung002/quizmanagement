<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="Username" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.role" placeholder="Role" clearable class="filter-item" style="width: 130px" @change="handleFilter">
        <el-option v-for="item in roleType" :key="item.key" :label="item.display_name"
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
<!--search, sort bar-->

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
      <el-table-column label="DateCreated" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt | format_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Username" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Password" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Fullname" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Fullname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Email" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Role" width="150px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.Role | roleStatusFilter">
            {{ row.Role | roleFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.IsDeleted | statusFilter">
            {{ row.IsDeleted | activeFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.Role !== 'super admin'" type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="(row.IsDeleted!==1 && (row.Role !== 'super admin' && row.IsDeleted === 0))" size="mini" type="danger" @click="handleDelete(row,row.ID)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--Table for values-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.perpage"
                @pagination="getList"/>
<!--pagination in the button-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="ID" prop="ID">
          <el-input :disabled="true" v-model="temp.ID"/>
        </el-form-item>
        <el-form-item label="Username" prop="Username">
          <el-input v-model="temp.Username"/>
        </el-form-item>
        <el-form-item label="Role" prop="Role">
          <el-select v-model="temp.Role" class="filter-item" placeholder="Please select">
            <el-option v-for="item in role" :key="item.key" :label="item.display_name"
                       :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="Status" prop="IsDeleted">
          <el-select v-model="temp.IsDeleted" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>

        <el-form-item label="Password" prop="Password">
          <el-input :type="passwordType" v-model="temp.Password"/>
        </el-form-item>
        <el-form-item label="Fullname" prop="Fullname">
          <el-input v-model="temp.Fullname"/>
        </el-form-item>
        <el-form-item label="Email" prop="Email">
          <el-input v-model="temp.Email"/>
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
<!--    hidden dialog-->
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
    import {GetUser, CreateUser, UpdateUser, DeleteUser} from '@/api/user'
    import waves from '@/directive/waves' // waves directive
    import {parseTime} from '@/utils/index'
    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    import {getToken, getRole} from '@/utils/auth'
    import moment from 'moment'
    const roleType = [
        {key: 'super admin', display_name: 'Super Admin'},
        {key: 'admin', display_name: 'Admin'},
        {key: 'user', display_name: 'User'},
    ];
    const role = [
        {key: 'admin', display_name: 'Admin'},
        {key: 'user', display_name: 'User'},
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
    const roleValue = roleType.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name;
        return acc
    }, {});

    export default {
        name: 'ComplexTable',
        components: {Pagination},
        directives: {waves},
        filters: {
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
            roleStatusFilter(role){
                const roleMap ={
                    'admin':'danger',
                    'user':'info',
                };
                return roleMap[role]
            },
            roleFilter(type) {
                return roleValue[type]
            },
            format_date(value){
                if (value) {
                    return moment(String(value)).format('DD-MM-YYYY H:m')
                }
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
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    username: undefined,
                    role: undefined
                },
                roleType,
                role,
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Username: '',
                    Password: '',
                    Email: '',
                    Fullname: '',
                    Role: '',
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
                    Password: [{
                        required: true,
                        message: 'password is required',
                        trigger: 'blur',
                        validator: validatePassword
                    }],
                    Fullname: [{required: true, message: 'name is required', trigger: 'blur'}],
                    Email: [
                        {required: true, message: 'Please input email address', trigger: 'blur'},
                        {type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
                    ],
                    Username: [{required: true, message: 'username is required', trigger: 'blur'}]
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
                GetUser(this.listQuery).then(response => {
                    this.list = response.data.data;
                    this.total = response.data.pages.total;
                })
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
                    Password: '',
                    Email: '',
                    Fullname: '',
                    Role: '',
                    accessID: '',
                    IsDeleted: 0,
                    accessUserRole:'',
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
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
                        CreateUser(this.temp).then((response) => {
                            if (response.result === "fail")
                                this.$notify({
                                    title: 'Warning',
                                    message: 'Created Failed',
                                    type: 'warning',
                                    duration: 2000
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
                this.resetTemp();
                this.temp = Object.assign({}, row); // copy obj
                this.temp.accessID = getToken();
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.temp.Password='';
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp);
                        UpdateUser(tempData, this.temp.ID).then((response) => {
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
                            })}
                        })
                    }
                })
            },
            handleDelete(row,id) {
                DeleteUser(id).then((response)=>{
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
