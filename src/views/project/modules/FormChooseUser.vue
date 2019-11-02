<template>
  <div class="choose-user-input">
    <div class="choose-user-tags">
      <a-tag
        closable
        @close="deleteTag(index)"
        :key="item.account"
        v-for="(item, index) in tags"
      >{{item.name}}</a-tag>
    </div>
    <a-button
      type="primary"
      @click="visible=true"
    >选择用户</a-button>

    <a-modal
      :title="title"
      style="top: 20px;"
      :width="600"
      v-model="visible"
      @ok="handleOk"
    >
      <div style="display:flex;justify-content:center;align-items: center">
        <a-transfer
          :dataSource="userList"
          showSearch
          :filterOption="filterOption"
          :targetKeys="targetKeys"
          @change="handleChange"
          @selectChange="handleSelectChange"
          :render="renderItem"
        >
        </a-transfer>
      </div>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api'

export default {
  props: {
    title: String,
    value: {
      type: Array,
      default() {
        return []
      }
    },
    isSingle: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      userList: [],
      targetKeys: [],
      visible: false,
      tags: []
    }
  },
  watch: {
    value (val = []) {
      this.targetKeys = val
    },
    targetKeys(newVal, oldVal) {
      if (this.isSingle && newVal.length > 1) {
        this.$message.error('只能指派一个用户')
        newVal.pop()
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    deleteTag(index) {
      this.tags.splice(index, 1)

      this.triggerChange(this.tags)
    },
    handleChange(nextTargetKeys, direction, moveKeys) {
      this.targetKeys = nextTargetKeys
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys]
    },
    getUsers(keyword) {
      api.user
        .list({
          pageNo: 1,
          pageSize: -1,
          keyword
        })
        .then(res => {
          this.userList = res.result.data.map(i => {
            i.key = i.id
            i.title = i.name
            i.description = i.position
            i.chosen = false
            return i
          })
        })
    },
    show(title) {
      this.title = title
      this.visible = true
    },
    renderItem(item) {
      const customLabel = <span class="custom-item">{item.name}</span>

      return {
        label: customLabel, // for displayed item
        value: item.name // for title and filter matching
      }
    },
    close() {
      this.visible = false
    },
    handleOk() {
      const choosedUsers = this.userList.filter(i => this.targetKeys.includes(i.id))
      this.tags = choosedUsers
      this.close()
      this.triggerChange(choosedUsers)
    },
    filterOption(inputValue, option) {
      return option.name.indexOf(inputValue) > -1
    },
    triggerChange(choosedUsers) {
      this.$emit('change', choosedUsers)
    }
  }
}
</script>

<style lang="less">
.choose-user-input {
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  box-sizing: border-box;
  display: block;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  border-top-width: 1.02px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  min-height: 34px;
  position: relative;
  .ant-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
.choose-user-tags {
  display: block;
  margin-left: 11px;
  margin-right: 11px;
  position: relative;
  line-height: 30px;
  margin-left: 5px;
  margin-bottom: -3px;
  height: auto;
}
</style>
