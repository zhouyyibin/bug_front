<template>
  <a-card>
    <h2>{{$route.query.title}}-权限设置</h2>
    <a-spin :spinning="spinning">
      <table
        width="100%"
        class="table table-hover table-striped table-bordered"
      >
        <thead>
          <tr>
            <th class="w-150px">模块(页面显示)</th>
            <th>方法</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in permissions">
            <td>
              <a-checkbox
                @change="onCheckAllChange($event, item)"
                :value="item.action"
                :checked="isDefaultChecked(item.action)"
              >{{item.name}}</a-checkbox>
            </td>
            <td>
              <a-checkbox-group
                @change="onChange($event, item)"
                style="width:100%"
                :defaultValue="checkedObj[item.action]['actionEntitySet']"
              >
                <a-row>
                  <a-col
                    :span="4"
                    v-for="action in item.actionEntitySet"
                  >
                    <a-checkbox :value="action.action">{{action.name}}</a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: center;margin-top:10px">
        <a-button
          type="primary"
          @click="savePermission"
          style="margin-right:10px;"
        >保存</a-button>
        <a-button @click="$router.go(-1)">取消</a-button>
      </div>
    </a-spin>
  </a-card>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      permissions: [],
      checkedObj: {},
      indeterminate: true,
      checkAll: {},
      pageChecked: [],
      myPermissions: [],
      spinning: true
    }
  },
  async created() {
    await this.getRoleInfo()
    await this.getPermissions()
    this.makeChecked()
    this.spinning = false
  },
  methods: {
    isDefaultChecked(action) {
      return this.pageChecked.includes(action)
    },
    getRoleInfo() {
      return new Promise((resolve) => {
        api.role.getRole(this.$route.params.id).then(res => {
          this.myPermissions = res.data.permissions || []
          resolve()
        })
      })
    },
    getPermissions() {
      return new Promise(resolve => {
        api.permission.list().then(res => {
          this.permissions = res.result.data.sort((a, b) => Number(a.id) - Number(b.id))
          this.permissions.forEach(i => {
            let actionEntitySet = []
            const finded = this.myPermissions.find(my => my.action === i.action)
            if (finded) {
              actionEntitySet = finded.actionEntitySet
            }
            this.checkedObj[i.action] = {
              name: i.name,
              action: i.action,
              actionEntitySet
            }
          })
          resolve()
        })
      })
    },
    makeChecked() {
      this.pageChecked = this.myPermissions.map(i => i.action)
    },
    onChange(val, action) {
      this.$set(this.checkedObj[action.action], 'actionEntitySet', val)
    },
    onCheckAllChange(e, action) {
      if (e.target.checked) {
        this.pageChecked.push(action.action)
      } else {
        const index = this.pageChecked.findIndex(i => i === action.action)
        this.pageChecked.splice(index, 1)
      }
    },
    savePermission() {
      const permissions = Object.values(this.checkedObj)
      const arr = []
      permissions.forEach(i => {
        if (this.pageChecked.includes(i.action)) {
          arr.push(i)
        }
      })
      api.permission.saveRolePermissions(this.$route.params.id, arr).then(res => {
        if (res.success) {
          this.$message.success('保存成功')
          setTimeout(() => {
            this.$router.replace('/')
            setTimeout(() => {
               window.location.reload()
            })
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.w-150px {
  width: 150px;
}
.table-bordered {
  border: 1px solid #cbd0db;
}

.table-bordered th {
  text-align: center;
}

.table-bordered td,
.table-bordered th {
  border: 1px solid #cbd0db;
}

.table tbody > tr > td,
.table thead > tr > th {
  vertical-align: middle;
}

.table td,
.table th {
  padding: 8px 10px;
  line-height: 1.42857143;
  vertical-align: top;
  border-bottom: 1px solid #cbd0db;
  -webkit-transition: background 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
  -o-transition: background 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
  transition: background 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
}
</style>
