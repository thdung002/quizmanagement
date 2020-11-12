<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <el-row :gutter="8">
        <div class="dashboard-text">name: {{ name }}</div>
        <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxCard from './components/BoxCard'
import TodoList from './components/TodoList'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'Dashboard',
    components: {
        GithubCorner,
        BoxCard,
        TodoList,

    },

    computed: {
    ...mapGetters([
      'name', 'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

</style>
