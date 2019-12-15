<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <div slot="extra" v-action="`project_add`">
        <a-button type="primary" @click="$router.push('/project/add')">
          <a-icon type="plus" />添加项目
        </a-button>
      </div>

      <s-table
        ref="table"
        size="default"
        :rowKey="(record) => record.id+record.name"
        :columns="columns"
        :data="loadData"
      >
        <div slot="senderBeans" slot-scope="text, record">
          <a-tag v-for="item in record.modelBeans" :key="item.id">{{item.name}}-{{item.leadingName}}</a-tag>
        </div>
        <div slot="action" slot-scope="text, record">
          <router-link :to="`/project/detail/${record.id}`" v-action="`project_detail`">详情</router-link>
          <a-divider type="vertical" />
          <router-link :to="`/project/edit/${record.id}`" v-action="`project_edit`">编辑</router-link>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleDelete(record.id)" v-action="`project_delete`">删除</a>
        </div>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import STable from '@/components/Table'
import api from '@/api'
export default {
  components: {
    STable
  },
  data() {
    return {
      columns: [
        {
          title: '项目名',
          dataIndex: 'name'
        },
        {
          title: '模块-负责人',
          dataIndex: 'senderBeans',
          scopedSlots: { customRender: 'senderBeans' }
        },
        {
          title: '操作',
          width: 200,
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {
        type: 0,
        keyword: '',
        department: 0
      },
      loadData: params => {
        return api.project.list(Object.assign(params, this.queryParam)).then(res => {
          return res.result
        })
      }
    }
  },
  methods: {
    handleDelete(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该项目吗？删除后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.project.remove(id).then(() => this.$refs.table.refresh(false))
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
