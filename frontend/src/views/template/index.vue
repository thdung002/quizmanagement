<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.templatename" placeholder="Template Name" style="width: 200px;" class="filter-item"
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

      <input ref="js-upload-input" class="js-upload-input" type="file" accept=".js" @change="handleClick">
      <el-button v-waves :loading="downloadLoading" class="filter-item" icon="el-icon-plus"  type="primary" @click="handleUpload" style="margin-left:10px">
        Browse
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
      <el-table-column label="Template Name" min-width="400" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.TemplateName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Description" min-width="400" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.Description }}</span>
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
            Preview
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
    <el-dialog  :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left">
        <div ref="content" v-html="temp.HeaderContent" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
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
    import {GetTemplate, DeleteTemplate} from '@/api/template'
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
            return {
                tableKey: 0,
                article: '',
                files:[],
                list: null,
                listquestion: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    perpage: 10,
                    sort: 'ASC',
                    templatename: undefined,
                },
                statusType,
                sortOptions: [{label: 'ID Ascending', key: 'ASC'}, {label: 'ID Descending', key: 'DESC'}],
                statusOptions: ['active', 'deleted'],
                temp: {
                    HeaderContent: '',
                    QuestionContent: '',
                    AnswerContent: '',
                    FooterContent: '',
                    accessID: '',
                    accessUserRole: '',
                },
                dialogFormVisible: false,
                dialogStatus: '',
                dialogPvVisible: false,
                pvData: [],
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            handleUpload() {
                this.$refs['js-upload-input'].click()
            },

            handleClick(e) {
                const files = e.target.files;
                const rawFile = files[0]; // only use files[0]
                if (!rawFile) return;
                this.upload(rawFile)
            },
            upload(rawFile) {
                this.$refs['js-upload-input'].value = null; // fix can't select the same excel

                if (!this.beforeUpload) {
                    this.readerData(rawFile);
                    return
                }
                const before = this.beforeUpload(rawFile);
                if (before) {
                    this.readerData(rawFile)
                }
            },
            readerData(rawFile) {
                this.loading = true;
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = e => {
                        const data = e.target.result;
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        const header = this.getHeaderRow(worksheet);
                        const results = XLSX.utils.sheet_to_json(worksheet);
                        this.generateData({ header, results });
                        this.loading = false;
                        resolve()
                    };
                    reader.readAsArrayBuffer(rawFile)
                })
            },

            getList() {
                this.listLoading = false;
                GetTemplate(this.listQuery).then(response => {
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
                    HeaderContent: '',
                    QuestionContent: '',
                    AnswerContent: '',
                    FooterContent: '',
                    accessID: '',
                    accessUserRole: '',
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
                DeleteTemplate(id).then((response) => {
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

<style lang="scss">
  .js-upload-input{
    display: none;
    z-index: -9999;
  }

  @mixin clearfix {
    &:before {
      display: table;
      content: '';
      clear: both;
    }

    &:after {
      display: table;
      content: '';
      clear: both;
    }
  }

  .main-article {
    padding: 20px;
    margin: 0 auto;
    display: block;
    width: 800px;
  }
  .border-full{
    border-color: #000!important;
    border-top-color: rgb(0, 0, 0) !important;
    border-right-color: rgb(0, 0, 0) !important;
    border-bottom-color: rgb(0, 0, 0) !important;
    border-left-color: rgb(0, 0, 0) !important;
  }
  .border-content{
    border: 3px solid #ccc!important;
    border-top-color: rgb(204, 204, 204) !important;
    border-top-style: solid !important;
    border-top-width: 3px !important;
    border-right-color: rgb(204, 204, 204) !important;
    border-right-style: solid !important;
    border-right-width: 3px !important;
    border-bottom-color: rgb(204, 204, 204) !important;
    border-bottom-style: solid !important;
    border-bottom-width: 3px !important;
    border-left-color: rgb(204, 204, 204) !important;
    border-left-style: solid !important;
    border-left-width: 3px !important;
    border-image-source: initial !important;
    border-image-slice: initial !important;
    border-image-width: initial !important;
    border-image-outset: initial !important;
    border-image-repeat: initial !important;
  }

  .inline {
    display: inline;
    margin-left: 8px;
    margin-right: 10px;
  }
  .inline-title {
    display: inline;
  }

  .header{
    display: flex;
    justify-content: space-between;
  }
  ul {
    list-style: none; /* Remove list bullets */
    margin-top: 1px;
  }

</style>
