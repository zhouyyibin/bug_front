<template>
  <div>
    <a-spin tip="加载中..." :spinning="spinning">
      <a-card title="提Bug">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSubmit">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-row>
                <a-col :span="12">
                  <a-form-item label="Bug标题">
                    <a-input
                      style="border-right:none;border-radius:4px 0 0 4px"
                      v-decorator="[
                        `title`,
                        {
                          rules: [{
                            required: true,
                            message: '请输入Bug标题',
                          }],
                        }
                      ]"
                      placeholder
                    ></a-input>
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item>
                    <a-input-group class="inline-select-label" compact>
                      <a-input
                        style="width: 40%;border-radius:0;text-align:center;color:#333"
                        defaultValue="严重程度"
                        disabled
                      />

                      <a-select
                        v-decorator="[
                          `severity`,
                          {
                            rules: [{
                              required: true,
                              message: '请选择严重程度',
                            }],
                          }
                        ]"
                        class="compact-select"
                        style="width:60%;"
                      >
                        <a-select-option
                          :value="key"
                          v-for="(item, key) in BUG_VARIABLES.severity"
                          :key="item"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </a-input-group>
                  </a-form-item>
                </a-col>

                <a-col :span="6">
                  <a-form-item>
                    <a-input-group class="inline-select-label" compact>
                      <a-input
                        style="width: 40%;border-radius:0;text-align:center;color:#333"
                        defaultValue="优先级"
                        disabled
                      />

                      <a-select
                        v-decorator="[
                          `priority`,
                          {
                            rules: [{
                              required: true,
                              message: '请选择优先级',
                            }],
                          }
                        ]"
                        style="width:60%;border-left:none;border-radius:0"
                      >
                        <a-select-option
                          :value="key"
                          v-for="(item, key) in BUG_VARIABLES.priority"
                          :key="key"
                        >{{ item }}</a-select-option>
                      </a-select>
                    </a-input-group>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属项目">
                <a-select
                  showSearch
                  @change="handleChangeProject"
                  allowClear
                  :filterOption="filterOption"
                  v-decorator="[
                    `project`,
                    {
                      rules: [{
                        required: true,
                        message: '请选择所属项目',
                      }],
                    }
                  ]"
                  placeholder
                >
                  <a-select-option
                    v-for="item in projectList"
                    :value="item.name"
                    :key="item.id"
                  >{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属模块">
                <a-select
                  showSearch
                  @change="handleChangeModel"
                  :filterOption="filterOption"
                  v-decorator="[
                    `model`,
                    {
                      rules: [{
                        required: true,
                        message: '请选择所属模块',
                      }],
                    }
                  ]"
                  placeholder
                >
                  <div slot="dropdownRender" slot-scope="menu">
                    <v-nodes :vnodes="menu" />
                  </div>
                  <a-select-option
                    v-for="item in modelList"
                    :value="item.name"
                    :key="item.id"
                  >{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="bug影响版本">
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  v-decorator="[
                    `edition`,
                    {
                      rules: [{
                        required: true,
                        message: '请选择影响版本',
                      }],
                    }
                  ]"
                  placeholder
                >
                  <div slot="dropdownRender" slot-scope="menu">
                    <v-nodes :vnodes="menu" />
                  </div>
                  <a-select-option v-for="item in editionList" :value="item" :key="item">{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="bug类型">
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  v-decorator="[
                    `type`
                  ]"
                  placeholder
                >
                  <a-select-option
                    v-for="item in BUG_VARIABLES.type"
                    :value="item"
                    :key="item"
                  >{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="Bug开始时间">
                <a-date-picker
                  style="width:100%"
                  v-decorator="[
                    `start_time`,
                    {
                      initialValue: moment(new Date()),
                      rules: [{
                        required: true,
                        message: '请选择开始日期',
                      }],
                    }
                  ]"
                  :showTime="{ format: 'HH' }"
                  format="YYYY-MM-DD HH:mm"
                  placeholder
                ></a-date-picker>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="bug解决日期">
                <a-date-picker
                  style="width:100%"
                  v-decorator="[
                    `settling_time`,
                    {
                      rules: [{
                        required: true,
                        message: '请选择截止日期',
                      }],
                    }
                  ]"
                  :showTime="{ format: 'HH' }"
                  format="YYYY-MM-DD HH"
                  placeholder
                ></a-date-picker>
              </a-form-item>
            </a-col>

            <!-- <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="硬件平台"
              >
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  v-decorator="[
                    `hardware_platform`,
                    {
                      initialValue: 'all'
                    }
                  ]"
                  placeholder=""
                >
                  <a-select-option
                    v-for="item in BUG_VARIABLES.hardware_platform"
                    :value="item"
                    :key="item"
                  >{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="操作系统"
              >
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  v-decorator="[
                    `operating_system`,
                    {
                      initialValue: 'all'
                    }
                  ]"
                  placeholder=""
                >
                  <a-select-option
                    v-for="item in BUG_VARIABLES.operating_system"
                    :value="item"
                    :key="item"
                  >{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="浏览器"
              >
                <a-select
                  showSearch
                  :filterOption="filterOption"
                  v-decorator="[
                    `browser`,
                    {
                      initialValue: '全部'
                    }
                  ]"
                  placeholder=""
                >
                  <a-select-option
                    v-for="item in BUG_VARIABLES.browser"
                    :value="item"
                    :key="item"
                  >{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="当前指派">
                <a-select
                  showSearch
                  :disabled="true"
                  v-decorator="[
                    `leading_id`,
                    {
                      rules: [{
                        required: true,
                        message: '请选择要指派的用户',
                      }],
                    }
                  ]"
                  placeholder
                  style="width: 100%"
                  :filterOption="filterOption"
                  :notFoundContent="fetching ? undefined : null"
                >
                  <a-spin v-if="fetching" slot="notFoundContent" size="small" />
                  <a-select-option v-for="d in userList" :value="d.id" :key="d.id">{{ d.name }}</a-select-option>
                </a-select>
                <!-- <FormChooseUser
                title="当前指派"
                :is-single="true"
                v-decorator="[
                  `leading_id`,
                  {
                    rules: [{
                      required: true,
                      message: '请选择要指派的用户',
                    }],
                  }
                ]"
                placeholder=""
                />-->
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="抄送给">
                <div class="senders-box">
                  <a-tag
                    :key="item.id"
                    :closable="false"
                    v-for="item in fixedSenders"
                  >{{ item.name }}</a-tag>
                  <a-select
                    showSearch
                    id="sender-select"
                    mode="multiple"
                    v-decorator="[
                      `sendMailUsers`
                    ]"
                    placeholder="选择其他需要抄送的用户"
                    style="width: 100%"
                    :filterOption="filterOption"
                    :notFoundContent="fetching ? undefined : null"
                  >
                    <a-spin v-if="fetching" slot="找不到用户" size="small" />
                    <a-select-option v-for="d in userList" :value="d.id" :key="d.id">{{ d.name }}</a-select-option>
                  </a-select>
                </div>

                <!-- <FormChooseUser
                title="抄送给"
                :is-single="false"
                v-decorator="[
                  `sendMails`
                ]"
                placeholder=""
                />-->
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="Bug问题描述">
                <Ueditor
                  v-decorator="[
                    `describe`,
                    {
                      rules: [{
                        required: true,
                        message: '请添加Bug问题描述',
                      }],
                    }
                  ]"
                ></Ueditor>
                <!-- <a-textarea
                :autosize="{ minRows: 6, maxRows: 6 }"
                v-decorator="[
                  `describe`
                ]"
                placeholder=""
              >
                </a-textarea>-->
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="附件">
                <div style="width: 300px">
                  <a-upload
                    v-decorator="[
                      'annexs', {
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      }
                    ]"
                    :withCredentials="true"
                    name="file"
                    extra="文件最大限制10M"
                    list-type="text"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                    :action="uploadUrl"
                  >
                    <a-button>
                      <a-icon type="upload" />选择文件
                    </a-button>
                  </a-upload>
                  <div>
                    附件文件类型：
                    <br />文档：doc docx xls xlsx ppt pptx pdf csv
                    <br />图片：bmp jpg png gif
                    <br />视频：3GP MP4 AVI
                  </div>
                </div>
              </a-form-item>
            </a-col>

            <a-col :span="24" style="text-align:center">
              <a-button
                type="primary"
                html-type="submit"
                :loading="loading"
                style="margin-right:10px"
              >保存</a-button>

              <a-button @click="$router.go(-1)">取消</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </a-spin>
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
import moment from 'moment'

export default {
  components: {
    TypeModal,
    FormChooseUser,
    Ueditor,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  data() {
    return {
      moment,
      spinning: false,
      id: this.$route.params.id,
      hasAdded: false,
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
      fixedSenders: [],
      fixedLeading: null,
      projectList: [],
      userList: [],
      modelList: [],
      mdl: {},
      editionList: [],
      loading: false,
      leading: [],
      sendMailUsers: [],
      modalType: 1,
      fetching: false,
      form: this.$form.createForm(this),
      currentProject: {}
    }
  },
  mounted() {
    this.getProjectList()
    try {
      this.$route.params.id && this.getDetail()
    } catch (error) {
      console.log(error)
    }

    this.fetchUser()
  },
  methods: {
    beforeUpload(file) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]
      const arr = file.name.split('.')
      const ext = arr[arr.length - 1]
      const valid = fileTypes.includes(ext)
      if (!valid) {
        this.$notification.error({
          message: '温馨提示',
          description: `附件上传限于以下文件类型： \n
                  文档：doc docx xls xlsx ppt pptx pdf csv\n
                  图片：bmp jpg png gif\n
                  视频：3GP MP4 AVI\n`
        })
      }
      return valid
    },
    isValidFile(file) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]
      const arr = file.name.split('.')
      const ext = arr[arr.length - 1]
      const valid = fileTypes.includes(ext)

      return valid
    },
    handleChange({ fileList, file, event }) {
      const newList = fileList.filter(this.isValidFile)
      console.log(newList)
      this.form.setFieldsValue({
        annexs: newList
      })
    },
    getProjectList() {
      api.project
        .list({
          pageNo: 1,
          pageSize: -1
        })
        .then(res => {
          this.projectList = res.result.data
        })
    },
    handleChangeModel(value) {
      const item = this.currentProject.modelBeans.find(i => i.name === value)
      this.form.setFieldsValue({
        leading_id: item.leadingId
      })
    },
    handleChangeProject(value) {
      const item = this.projectList.find(i => i.name === value)
      this.currentProject = item
      this.modelList = item.modelBeans
      this.editionList = item.versionBeans

      const sendMailUsers = item.senderBeans
      this.fixedSenders = sendMailUsers
    },
    async getDetail() {
      this.spinning = true
      try {
        const res = await api.bug.detail(this.id)
        this.mdl = res.data
        this.mdl.leading_id = this.mdl.leadingId
        this.mdl.start_time = moment(this.mdl.startTime)
        this.mdl.settling_time = moment(this.mdl.settlingTime)
        this.mdl.describe = decodeURIComponent(this.mdl.describe)
        this.fixedSenders = this.mdl.sendMailUsers
        this.mdl.annexs = this.mdl.annexs.map((i, index) => {
          const arr = i.split('/')
          const name = arr[arr.length - 1]
          return {
            uid: index,
            name: name,
            status: 'done',
            url: i
          }
        })
        this.form.setFieldsValue(
          pick(
            this.mdl,
            'title',
            'severity',
            'annexs',
            'priority',
            'project',
            'model',
            'edition',
            'type',
            'start_time',
            'describe',
            'settling_time',
            'leading_id'
          )
        )
      } catch (error) {
        console.log(error)
      } finally {
        this.spinning = false
      }
    },
    fetchUser(keyword) {
      this.fetching = true
      api.user
        .list({
          pageNo: 1,
          pageSize: -1,
          keyword,
          status: this.id ? 2 : 1
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
          const data = this.reformatData(values)
          this.loading = true
          const action = this.id ? 'updateBug' : 'save'
          this.hasAdded = true
          api.bug[action](data)
            .then(res => {
              this.$message.success('保存成功')
              this.loading = false
              this.$router.replace('/bug/dashboard')
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    reformatData(data) {
      data.describe = encodeURIComponent(data.describe)
      if (data.settling_time.isBefore(data.start_time)) {
        this.$message.error('解决日期不能在开始日期之前')
        return
      }
      data.settling_time = data.settling_time.toDate()
      data.start_time = data.start_time.toDate()
      if (data.annexs && data.annexs.length > 0) {
        data.annexs = data.annexs.map(i => {
          return i.hasOwnProperty('response')
            ? `http://${
                window.localStorage.getItem('VUE_APP_HOST')
                  ? window.localStorage.getItem('VUE_APP_HOST')
                  : process.env.VUE_APP_HOST
              }:${
                window.localStorage.getItem('VUE_APP_PORT')
                  ? window.localStorage.getItem('VUE_APP_PORT')
                  : process.env.VUE_APP_PORT
              }/download?path=${i.response.data}`
            : i
        })
      }
      data.sendMails = this.fixedSenders.length > 0 ? this.fixedSenders.map(i => i.id).join(',') : ''
      if (data.sendMailUsers) {
        data.sendMails = data.sendMails + ',' + data.sendMailUsers.join(',')
      }
      console.log(data.sendMails)
      delete data.sendMailUsers
      if (this.id) {
        data['id'] = this.id
      }

      data['type'] = data['type'] || ''
      return data
    },
    filterValidFile(files) {
      const fileTypes = [
        'doc',
        'docx',
        'xls',
        'xlsx',
        'ppt',
        'pptx',
        'pdf',
        'csv',
        'bmp',
        'jpg',
        'png',
        'gif',
        '3gp',
        'mp4',
        'avi'
      ]

      return files.filter(i => {
        const arr = i.name.split('.')
        const ext = arr[arr.length - 1]
        const valid = fileTypes.includes(ext)
        return valid
      })
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return this.filterValidFile(e)
      }
      return e && this.filterValidFile(e.fileList)
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
    }
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    this.hasAdded && (to.meta.keepAlive = false) // C 跳转到 A 时让 A 不缓存，即刷新
    next()
  }
}
</script>
<style lang="less">
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
.compact-select .ant-select-selection {
  border-right: none;
  border-radius: 4px 0 0 4px !important;
}
// #sendMailUsers .ant-select-selection__choice__remove {
//   display: none;
// }
.inline-select-label {
  position: relative;
  &:before {
    content: '*' !important;
    position: absolute;
    display: inline-block;
    font-family: SimSun;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
    z-index: 10;
    left: 30px;
    top: 5px;
  }
}
</style>
