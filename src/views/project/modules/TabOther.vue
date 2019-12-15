<template>
  <div class="card-container">
    <a-tabs type="card">
      <a-tab-pane tab="模块" key="1">
        <div style="text-align: right;margin-bottom: 10px">
          <a-button
            size="small"
            type="primary"
            @click="handleAdd(modelList.length)"
            v-if="!isDetail"
          >添加模块</a-button>
        </div>
        <a-table
          style="overflow-x: hidden;overflow-y: auto"
          bordered
          :pagination="false"
          ref="table"
          size="small"
          rowKey="id"
          :columns="modelColumns"
          :dataSource="modelList"
        >
          <div slot="name" slot-scope="text, record">
            <a-input
              style="width: 200px"
              v-if="record.editable"
              :disabled="isDetail"
              v-model="record.name"
            />
            <span style="display:inline-block;width: 200px" v-else>{{ record.name }}</span>
          </div>
          <div slot="leadingId" slot-scope="text, record">
            <a-select
              showSearch
              placeholder="选择用户"
              style="width: 150px"
              :disabled="isDetail"
              v-model="record.leadingId"
              :filterOption="filterOptionLeading"
            >
              <a-select-option
                v-for="item in userList"
                :key="item.id"
                :value="item.id"
              >{{ item.name }}</a-select-option>
            </a-select>
          </div>

          <div slot="senders" slot-scope="text, record">
            <FormChooseUser
              :is-detail="isDetail"
              :value="record.senders"
              :users="userList"
              @change="users => handleChangeSenders(users, record.id)"
              :isSingle="false"
            ></FormChooseUser>
          </div>

          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="handleDeleteModel(record)" v-if="!isDetail">删除</a>
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="版本" key="2">
        <template v-for="(tag) in versionList">
          <a-tag :key="tag" :closable="!isDetail" :afterClose="() => handleClose(tag)">{{ tag }}</a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag
          v-else
          @click="showInput"
          v-show="!isDetail"
          style="background: #fff; borderStyle: dashed;"
        >
          <a-icon type="plus" />添加版本
        </a-tag>
      </a-tab-pane>
      <a-tab-pane tab="抄送" key="3">
        <div style="display:flex;justify-content:center;align-items: center">
          <a-transfer
            :dataSource="userList"
            showSearch
            :disabled="isDetail"
            :titles="['用户列表', '已选中']"
            :filterOption="filterOption"
            :targetKeys="sendMailUsers"
            @change="handleChange"
            :render="renderItem"
          ></a-transfer>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from '@/api'
import STable from '@/components/Table'
import ChooseUser from './ChooseUser'
import FormChooseUser from './FormChooseUser'
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          modelBeans: [],
          senderBeans: [],
          versionBeans: []
        }
      }
    },
    isDetail: Boolean
  },
  components: {
    STable,
    ChooseUser,
    FormChooseUser
  },
  data() {
    return {
      modelColumns: [
        {
          title: '模块名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '负责人',
          dataIndex: 'leadingId',
          scopedSlots: { customRender: 'leadingId' }
        },
        {
          title: '抄送人',
          dataIndex: 'senders',
          scopedSlots: { customRender: 'senders' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      versionColumns: [
        {
          title: '版本名称',
          dataIndex: 'name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      newModel: {
        name: '',
        leadingId: ''
      },
      userList: [],
      modelList: [],
      // version
      inputVisible: false,
      inputValue: '',
      versionList: [],
      // chaosong
      sendMailUsers: [],
      selectedKeys: []
    }
  },
  watch: {
    value(newVal) {
      this.modelList = newVal.modelBeans
      this.versionList = newVal.versionBeans
      this.sendMailUsers = newVal.senderBeans.map(i => i.id)
    }
  },
  filters: {
    formatSenders(val) {
      return val.map(i => i.id)
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    handleChangeSenders(users, index) {
      this.modelList[index].senders = users.map(i => {
        return {
          id: i.id
        }
      })
    },
    handleAdd(index) {
      this.modelList.push({
        id: index,
        editable: true,
        name: '',
        senders: [],
        leadingId: ''
      })
    },
    getUsers(keyword) {
      api.user
        .list({
          pageNo: 1,
          pageSize: -1,
          keyword,
          status: 2
        })
        .then(res => {
          this.userList = res.result.data.map(i => {
            i.key = i.id
            i.title = i.name
            i.description = i.name
            i.chosen = false
            return i
          })
        })
    },
    filterOptionLeading(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    filterOption(input, option) {
      return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    getData() {
      const { modelList, versionList, sendMailUsers } = this

      const senderBeans = sendMailUsers.map(i => {
        return { id: i }
      })
      return {
        modelBeans: modelList,
        versionBeans: versionList,
        senderBeans
      }
    },
    // model
    handleDeleteModel(record) {
      const index = this.modelList.findIndex(i => {
        if (i.id) {
          return i.id === record.id
        } else {
          return i.leadingId === record.leadingId
        }
      })
      this.$delete(this.modelList, index)
    },
    // version
    handleClose(removedTag) {
      const versionList = this.versionList.filter(tag => tag !== removedTag)
      this.versionList = versionList
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },

    handleInputChange(e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      let versionList = this.versionList
      if (inputValue && versionList.indexOf(inputValue) === -1) {
        versionList = [...versionList, inputValue]
      }
      console.log(versionList)
      Object.assign(this, {
        versionList,
        inputVisible: false,
        inputValue: ''
      })
    },
    // chaosong
    handleChange(targetKeys, direction, moveKeys) {
      this.sendMailUsers = targetKeys
    },
    renderItem(item) {
      const customLabel = <span class="custom-item">{item.name}</span>

      return {
        label: customLabel, // for displayed item
        value: item.name // for title and filter matching
      }
    }
  }
}
</script>
<style scopped>
.ant-transfer-list {
  height: 570px;
}
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 15px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 600px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
