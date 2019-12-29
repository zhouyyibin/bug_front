<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <span class="title">欢迎来到艾鑫集团，选择您需要的系统</span>
        </div>
        <div class="desc"></div>
      </div>

      <div class="app-list">
        <router-link class="app-item" to="/dashboard/workplace">
          <img :src="require('@/assets/bug.svg')" />
          <div>Bug管理系统</div>
        </router-link>
        <a class="app-item" href="javascript:void(0)">
          <img :src="require('@/assets/project.svg')" />
          <div>业务流程问题收集系统(未开放)</div>
        </a>
      </div>

      <div class="footer">
        <div class="links">深圳市鑫信腾科技有限公司</div>
        <!-- <div class="copyright">技术支持：珠海研新信息技术有限公司&nbsp;&nbsp;&nbsp;&nbsp;服务热线：18825622418</div> -->
      </div>
    </div>
    <ResetPwd
      ref="resetModal"
      title="初次登录修改密码"
      :closable="false"
      @success="handleChangePwd"
      :maskClosable="false"
      :isFirstLogin="isFirstLogin"
    ></ResetPwd>
  </div>
</template>

<script>
import BugSvg from '@/assets/bug.svg?inline'
import projectSvg from '@/assets/project.svg?inline'
import { mixinDevice } from '@/utils/mixin'
import ResetPwd from '@/components/ResetPwd'
export default {
  name: 'ChooseApp',
  components: { BugSvg, projectSvg, ResetPwd },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  computed: {
    isFirstLogin() {
      return this.$store.state.user.isFirstLogin
    }
  },
  mounted() {
    document.body.classList.add('userLayout')
    this.showModal()
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  },
  methods: {
    showModal() {
      const whiteList = ['login', 'register', 'registerResult']
      if (!whiteList.includes(this.$route.name) && this.isFirstLogin) {
        this.$nextTick(() => {
          this.$refs.resetModal.show()
        })
      }
    },
    handleChangePwd() {
      this.$store.dispatch('Logout')
      this.$router.replace('/user/login')
    }
  }
}
</script>

<style lang="less" scoped>
.app-list {
  text-align: center;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .app-item {
    display: inline-block;
    width: 350px;
    border: 2px solid #dedede;
    border-radius: 8px;
    background: #333;
    margin: 0 30px;
    color: #fff;
    font-size: 24px;
    padding: 40px 0;
    transition: background 0.3s ease-in-out;
    img {
      width: 100px;
      margin-bottom: 10px;
    }

    &:hover {
      background: #1890ff;
    }
  }
}
#userLayout.user-layout-wrapper {
  height: 100%;

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, 0.85);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
