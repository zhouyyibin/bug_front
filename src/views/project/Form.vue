<template>
  <div>
    <a-card>
      <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="项目标题">
              <a-input
                :disabled="isDetail"
                v-decorator="[
                  `name`,
                  {
                    rules: [{
                      required: true,
                      message: '请输入项目标题',
                    }],
                  }
                ]"
                placeholder
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="其他">
              <tab-other :value="mdl" :isDetail="isDetail" ref="tab"></tab-other>
            </a-form-item>
          </a-col>
          <a-col :span="24" style="text-align:center">
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              v-if="!isDetail"
              style="margin-right:10px"
            >保存</a-button>

            <a-button @click="$router.go(-1)">{{isDetail ? '返回' : '取消'}}</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <type-modal ref="modal" @ok="onAddedType"></type-modal>
  </div>
</template>

<script>
import { BUG_VARIABLES } from '@/utils/variables'
import TypeModal from './modules/TypeModal'
import FormChooseUser from './modules/FormChooseUser'
import Ueditor from '@/components/Ueditor'
import api from '@/api'
import pick from 'lodash.pick'
import TabOther from './modules/TabOther'

export default {
  components: {
    TypeModal,
    FormChooseUser,
    Ueditor,
    TabOther,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      uploadUrl:
        process.env.NODE_ENV === 'development'
          ? '/api/upload'
          : `http://${
              window.localStorage.getItem('VUE_APP_HOST')
                ? window.localStorage.getItem('VUE_APP_HOST')
                : process.env.VUE_APP_HOST
            }:${
              window.localStorage.getItem('VUE_APP_PORT')
                ? window.localStorage.getItem('VUE_APP_PORT')
                : process.env.VUE_APP_PORT
            }/upload`,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      BUG_VARIABLES,
      projectList: [],
      userList: [],
      modelList: [],
      mdl: {},
      editionList: [],
      loading: false,
      leading: [],
      sendMailUsers: [],
      modalType: 1,
      isDetail: this.$route.name === 'ProjectDetail',
      form: this.$form.createForm(this)
    }
  },
  created() {
    this.id && this.getDetail()
  },
  methods: {
    getDetail() {
      api.project.detail(this.id).then(res => {
        this.mdl = res.data
        this.form.setFieldsValue(pick(this.mdl, 'name'))
      })
    },
    fetchUser(keyword) {
      this.fetching = true
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
          this.fetching = false
        })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const others = this.$refs.tab.getData()
          const data = {
            id: this.id,
            ...values,
            ...others
          }
          this.loading = true

          const action = this.id ? 'update' : 'save'
          api.project[action](data)
            .then(res => {
              this.$message.success('保存成功')
              this.loading = false
              this.$router.replace('/project/dashboard')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    onAddedType(type, typename) {
      api.system.getSystemClassfication(type).then(res => {
        const key = {
          '1': 'projectList',
          '2': 'modelList',
          '3': 'editionList'
        }
        this[key[type]] = res
        const formKey = key[type].replace(/List/, '')
        const data = {}
        data[formKey] = typename
        this.form.setFieldsValue(data)
      })
    },
    onChoosedUers(users) {
      this.leading = users
    },
    onChoosedSendMails(users) {
      this.sendMailUsers = users
    },
    deleteUser(key, index) {
      this[key].splice(index, 1)
    },
    onDeleteLeading() {}
  }
}
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
.ant-advanced-search-form .ant-form-item-label {
  width: 128px;
}
</style>
