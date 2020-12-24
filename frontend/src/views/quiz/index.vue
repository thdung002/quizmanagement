<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.Examination" placeholder="Examination id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.Config" placeholder="Config id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.Template" placeholder="Template id" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
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
      <el-table-column label="DateCreated" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt | format_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Examination id" width="200" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Examination }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Config id" min-width="200" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Config }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Template id" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Template }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Code" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="100px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.IsDeleted | statusFilter">
            {{ row.IsDeleted | activeFilter }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!--Table for values-->

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.perpage"
                @pagination="getList"/>

    <!--pagination-->

  </div>
</template>

<script>
    import {GetQuiz, DeleteQuiz, CreateQuiz} from '@/api/quiz'
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
                    Examination: undefined,
                    Config: undefined,
                    Template: undefined
                },
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    ID: '',
                    Examination: '',
                    Config: '',
                    Template: '',
                    Code: '',
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
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                this.listLoading = false;
                GetQuiz(this.listQuery).then(response => {
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
                    Examination: '',
                    Config: '',
                    Template: '',
                    accessID: '',
                    accessUserRole: '',
                    IsDeleted: 0,
                }
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
            handleDelete(row, id) {
                DeleteQuiz(id).then((response) => {
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
