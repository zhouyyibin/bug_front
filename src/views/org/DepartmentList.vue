<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="8">
        <a-card
          :bordered="false"
          title="维护部门:艾鑫集团"
        >
          <a-tree
            :defaultSelectedKeys="defaultSelectedKeys"
            :defaultExpandAll="true"
            showLine
            :draggable="true"
            @select="onSelect"
            :treeData="treeData"
            :checkedKeys="checkedKeys"
          >
            <div
              class="tree-node"
              slot="title"
              slot-scope="record"
            >
              {{record.title}}
              <span class="tree-node-actions">
                <a
                  v-action="`org_department_edit`"
                  href="javascript:;"
                  @click="$refs.modal.edit(record)"
                >编辑</a> <a
                  href="javascript:;"
                  v-action="`org_department_delete`"
                  @click="handleDelete(record.id)"
                  v-if="!record.children"
                >删除</a>
              </span>
            </div>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card
          :bordered="false"
          title="下级部门"
        >
          <table>
            <tr>
              <td>
                {{currentTitle}}&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;
              </td>
              <td>
                <div style="max-height:600px;overflow-y:auto;padding-right: 10px ">
                  <div style="margin-bottom:20px;width: 400px;" :key="`children_${index}`" v-for="(item,index) in children">
                    <a-input v-model="item.name" ></a-input>
                  </div>
                  <div style="margin-bottom:20px;width: 400px;" :key="`newChildren_${index}`" v-for="(item,index) in newChildren">
                    <a-input v-model="item.name" ></a-input>
                  </div>
                </div>
                <div style="margin-bottom:20px; margin-top:20px; width: 400px;">
                  <a-button
                    type="dashed"
                    style="width: 100%"
                    @click="addRow"
                  >
                    <a-icon type="plus" /> 添加
                  </a-button>
                </div>
                <div>
                  <a-button
                    type="primary"
                    style="margin-right:10px;"
                    @click="saveForm"
                  >保存</a-button>
                </div>
              </td>
            </tr>
          </table>
        </a-card>
      </a-col>
    </a-row>

    <depart-modal ref="modal" :department-list="treeData" @ok="getList"></depart-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import api from '@/api'
import DepartModal from './modules/DepartModal'

const LEN = 10
export default {
  name: 'TableList',
  components: {
    STable,
    DepartModal
  },
  data() {
    return {
      defaultSelectedKeys: [0],
      checkedKeys: [0],
      treeData: [],
      currentTitle: '艾鑫集团',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {
        name: '',
        parentId: 0
      },
      children: [],
      newChildren: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRows: [],
      departmentList: []
    }
  },
  created() {
    this.getList()
  },
  watch: {
    [`children.length`](newVal) {
      const remain = LEN - this.children.length
      if (remain > 0) {
        for (let i = 0; i < remain; i++) {
          this.$set(this.newChildren, i, {
            name: '',
            parentId: this.mdl.parentId
          })
        }
      } else {
        this.$set(this, 'newChildren', [])
      }
    }
  },
  methods: {
    addRow() {
      this.newChildren.push({
        name: '',
        parentId: this.mdl.parentId
      })
    },
    addSlot2Tree(arr) {
      return arr.map(i => {
        i.slots = { title: 'title' }
        i.scopedSlots = { title: 'title' }
        i.title = i.name
        if (i.departments && i.departments.length > 0) {
          i.children = this.addSlot2Tree(i.departments)
        }

        return i
      })
    },
    getList() {
      api.department.tree().then(res => {
        const data = res.result.data
        const newData = [{ key: 0, name: '艾鑫集团', id: '0', departments: data, children: data }]
        this.treeData = this.addSlot2Tree(newData)
        this.departmentList = this.addSlot2Tree(data)
        this.$set(this, 'children', this.treeData[0].children)
      })
    },
    onSelect(selectedKeys, info) {
      const { name, id, children } = info.node.dataRef
      this.currentTitle = name
      this.mdl.parentId = id
      this.$set(this, 'children', children || [])
    },
    handleDelete(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该部门吗？删除后将无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.department.remove(id).then(() => this.getList())
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    saveForm() {
      const validArr = this.newChildren.filter(i => i.name !== '')
      if (validArr.length > 0) {
        Promise.all(validArr.map(data => api.department.save(data))).then(results => {
          this.$message.success('保存成功')
          this.getList()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inputs-cell .ant-input {
  width: 300px;
  margin-bottom: 10px;
}
.tree-node {
  position: relative;
  .tree-node-actions {
    position: absolute;
    margin-left: 10px;

    a {
      font-size: 14px;
      z-index: 10;
      color: #3c4353;
      opacity: 0.6;
      margin-right: 5px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
