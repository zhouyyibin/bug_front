<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="16">
        <div>
          <a-button @click="$router.go(-1)">返回</a-button>
          <label style="margin-left:10px">
            {{ detail.title }}
            <a-popover title="当前状态">
              <template slot="content">
                <a-steps size="small" labelPlacement="vertical" :current="currentStatus">
                  <a-step title="未确认" />
                  <a-step title="已确认" />
                  <a-step title="处理中" />
                  <a-step title="已解决" />
                  <a-step title="已通过" />
                </a-steps>
              </template>
              <span
                class="status-bug status-active"
                style="margin-left:5px"
                :class="`status-bug_${currentStatus}`"
              >{{ STATUS_CODES[currentStatus] || '未确认' }}</span>
            </a-popover>
          </label>
        </div>

        <a-card style="margin-top:10px;">
          <h4>描述</h4>
          <div class="describe-content" v-html="decodedContent || '无'"></div>

          <HistoryList :list="history"></HistoryList>

          <div v-if="detail.annex">
            <h4>附件</h4>
            <div>
              <ul>
                <li v-for="item in detail.annexs" v-if="item && item != ''" :key="item">
                  <a :href="item" target="_blank">{{ item | fileName }}</a>
                </li>
              </ul>
            </div>
          </div>
        </a-card>

        <div class="main-actions">
          <div class="btn-toolbar">
            <!-- <a
              @click="$router.go(-1)"
              id="back"
              class="btn"
            >
            <a-icon type="back" />返回</a>-->
            <template v-action="`bug_detail_buttons`">
              <!-- 已通过 -->
              <a
                v-if="currentStatus == 4 && isAdmin"
                class="btn btn-link iframe"
                @click="showModal(0)"
              >
                <a-icon type="unlock" />
                <span class="text">激活</span>
              </a>
              <a class="btn btn-link iframe" @click="showModal(1)" v-if="!currentStatus">
                <a-icon type="eye" />
                <span class="text">确认</span>
              </a>
              <a class="btn btn-link iframe" @click="showModal(2)" v-if="currentStatus == 1">
                <a-icon type="code" />
                <span class="text">处理中</span>
              </a>
              <a class="btn btn-link iframe" @click="showModal(3)" v-if="currentStatus == 2">
                <a-icon type="check" />
                <span class="text">解决</span>
              </a>
              <a
                class="btn btn-link iframe"
                @click="showModal(4)"
                v-if="currentStatus == 3 && isCreatedByMe"
              >
                <a-icon type="smile" />
                <span class="text">通过</span>
              </a>
            </template>
            <!-- <a
              class="btn btn-link iframe"
              v-action="`bug_edit_bug`"
              @click="$router.push(`/bug/edit/${id}`)"
            >
              <a-icon type="edit" /> <span class="text">编辑</span></a>

            <a
              class="btn btn-link iframe"
              v-action="`bug_delete_bug`"
              @click="handleDelete(id)"
            >
            <a-icon type="delete" /> <span class="text">删除</span></a>-->
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div style="text-align:right">
          <a-button type="primary" @click="$router.push('/bug/add')">+提Bug</a-button>
        </div>
        <a-card style="margin-top:10px;">
          <table class="table table-data">
            <tbody>
              <tr valign="middle">
                <th class="w-70px">所属项目</th>
                <td>{{ detail.project }}</td>
              </tr>
              <tr>
                <th>所属模块</th>
                <td title="/">{{ detail.model }}</td>
              </tr>
              <tr valign="middle">
                <th>Bug版本</th>
                <td>{{ detail.edition }}</td>
              </tr>
              <tr>
                <th>Bug类型</th>
                <td>{{ detail.type }}</td>
              </tr>
              <tr>
                <th>严重程度</th>
                <td>
                  <span
                    class="severity_num"
                    :class="severityClass(detail.severity)"
                  >{{ BUG_VARIABLES.severity[detail.severity] }}</span>
                </td>
              </tr>
              <tr>
                <th>优先级</th>
                <td>
                  <span
                    class="priority_num"
                    :class="priorityClass(detail.priority)"
                  >{{ BUG_VARIABLES.priority[detail.priority] }}</span>
                </td>
              </tr>
              <tr>
                <th>Bug状态</th>
                <td>
                  <span
                    class="status-bug status-active"
                    :class="`status-bug_${currentStatus}`"
                  >{{ STATUS_CODES[currentStatus] || '未确认' }}</span>
                </td>
              </tr>
              <tr>
                <th>当前指派</th>
                <td>{{ detail.leading && detail.leading.name }}</td>
              </tr>
              <tr>
                <th>抄送给</th>
                <td>
                  <a-tag v-for="item in detail.sendMailUsers">{{item.name}}</a-tag>
                </td>
              </tr>
              <tr>
                <th>截止日期</th>
                <td>{{ detail.settlingTime | dateTrim }}</td>
              </tr>
              <!-- <tr>
                <th>操作系统</th>
                <td>{{ detail.operating_system }}</td>
              </tr>
              <tr>
                <th>浏览器</th>
                <td>{{ detail.browser }}</td>
              </tr>-->
            </tbody>
          </table>
        </a-card>
      </a-col>
    </a-row>

    <status-modal ref="modal" :history="history" @ok="onSetStatus"></status-modal>
  </div>
</template>

<script>
import api from '@/api'
import { BUG_VARIABLES, STATUS_CODES } from '@/utils/variables'
import DescriptionList from '@/components/DescriptionList'
import StatusModal from './modules/StatusModal'
import HistoryList from './modules/HistoryList'
const DescriptionListItem = DescriptionList.Item
export default {
  components: {
    DescriptionList,
    DescriptionListItem,
    StatusModal,
    HistoryList
  },
  data() {
    return {
      detail: {},
      history: [],
      id: this.$route.params.id,
      BUG_VARIABLES,
      STATUS_CODES
    }
  },
  created() {
    this.getDetail()
    this.getHistory()
  },
  computed: {
    currentStatus() {
      return this.detail.status
    },
    decodedContent() {
      return this.detail.describe ? decodeURIComponent(this.detail.describe) : '无'
    },
    isCreatedByMe() {
      return this.$store.getters.userInfo.name === this.detail.creatorName
    },
    isAdmin() {
      return this.$store.getters.userInfo.name === 'admin'
    }
  },
  methods: {
    priorityClass(num) {
      const classObj = {}
      classObj[`priority_num_${5 - num}`] = true
      return classObj
    },
    severityClass(num) {
      const classObj = {}
      classObj[`severity_num_${6 - num}`] = true
      return classObj
    },
    handleDelete(id) {
      this.$confirm({
        title: '温馨提示',
        content: '您确定要删除该Bug吗？删除后无法恢复',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.$router.replace('/dashboard/workplace')
        },
        onCancel: () => {
          console.log('Cancel')
        }
      })
    },
    getDetail() {
      api.bug.detail(this.id).then(res => {
        this.detail = res.data
      })
    },
    getHistory() {
      api.bug.history(this.id).then(res => {
        this.history = res.result.data
      })
    },
    showModal(status) {
      this.$refs.modal.show({ status, id: this.id })
    },
    onSetStatus(data) {
      this.getDetail()
      this.getHistory()
    }
  }
}
</script>
<style lang="less">
.table-data {
  margin: 0;
  table-layout: fixed;
}

.table-data tbody > tr > td,
.table-data tbody > tr > th {
  padding: 6px 8px;
  word-break: break-all;
  border: 0;
}

.table-data tbody > tr > th {
  width: 70px;
  padding-left: 0;
  font-weight: 400;
  color: #838a9d;
  text-align: right;
  vertical-align: middle;
}

.table-data tbody > tr > td {
  padding-right: 0;
}

.table-data tbody > tr > td > a {
  color: #0c60e1;
}

.table-data tbody > tr > td > a:not(.btn):visited {
  color: #082999;
}

.table-data tbody > tr > td > a:hover,
.table-data tbody > tr > td > a:visited:hover {
  color: #0c64eb;
}

.table-data ol,
.table-data ul {
  margin: 0;
}

.fixed-head-table {
  background: rgba(0, 0, 0, 0.7);
  border-bottom: 1px solid #ddd;
}

.fixed-head-table thead > tr > th {
  color: #fff;
}

.table-empty-tip {
  padding: 80px 10px;
  text-align: center;
  background: #fff;
}

.not-firefox .table-grouped > tbody > tr > td.c-side {
  background: #fff !important;
}

.table-grouped .group-toggle {
  cursor: pointer;
}
.main-actions {
  text-align: center;
  margin-top: 20px;
}

.main-actions .btn-toolbar {
  display: inline-block;
  padding: 10px 15px;
  color: #fff;
  pointer-events: auto;
  background: #717171;
  background-color: rgba(90, 90, 90, 0.85);
  border-radius: 4px;
}

.main-actions .btn-toolbar .divider {
  margin-right: 15px;
  margin-left: 15px;
  border-color: rgba(255, 255, 255, 0.1);
}

.main-actions .btn-toolbar .btn {
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 0;
  color: #fff;
  background-color: transparent;
  border: 0;
}

.main-actions .btn-toolbar .btn + .btn {
  margin-left: 10px;
}

.main-actions .btn-toolbar .btn:focus,
.main-actions .btn-toolbar .btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.main-actions .btn-toolbar .btn.btn-icon {
  min-width: 32px;
  padding-right: 0;
  padding-left: 0;
}

.main-actions .btn-toolbar .btn + .btn-group {
  margin-right: 0;
  margin-left: 10px;
}
.describe-content {
  img {
    max-width: 100%;
    width: 300px;
    margin: auto;
  }
}
</style>
