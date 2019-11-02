// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  PageView,
  SubmenuView
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页',
      permission: 'page_workplace'
    },
    redirect: '/choose-app',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: PageView,
        hideChildrenInMenu: true,
        meta: {
          title: '工作台',
          keepAlive: true,
          icon: bxAnaalyse
        },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '指派给我的',
              keepAlive: true,
              permission: 'page_Workplace'
            }
          }
        ]
      },

      // bug
      {
        path: '/project',
        name: 'project',
        redirect: '/project/dashboard',
        component: PageView,
        hideChildrenInMenu: true,
        meta: {
          title: '项目',
          keepAlive: true,
          icon: 'file-text',
          permission: 'page_project'
        },
        children: [{
          path: '/project/dashboard',
          name: 'ProjectDashboard',
          component: () => import('@/views/project/Dashboard'),
          meta: {
            title: '项目列表',
            permission: 'page_project'
          }
        },
        {
          path: '/project/add',
          name: 'ProjectAdd',
          component: () => import('@/views/project/Form'),
          meta: {
            title: '添加项目',
            permission: 'page_add_project'
          }
        },
        {
          path: '/project/edit/:id',
          name: 'ProjectEdit',
          component: () => import('@/views/project/Form'),
          meta: {
            title: '编辑项目',
            permission: 'page_edit_project'
          }
        },
        {
          path: '/project/detail/:id',
          name: 'ProjectDetail',
          component: () => import('@/views/project/Form'),
          meta: {
            title: '项目详情',
            permission: 'page_detail_project'
          }
        }
        ]
      },

      // bug
      {
        path: '/bug',
        name: 'bug',
        redirect: '/bug/dashboard',
        component: PageView,
        hideChildrenInMenu: true,
        meta: {
          title: 'Bug',
          keepAlive: true,
          icon: 'file-text',
          permission: 'page_bug'
        },
        children: [{
          path: '/bug/dashboard',
          name: 'BugDashboard',
          component: () => import('@/views/bug/Dashboard'),
          meta: {
            title: '总览',
            permission: 'page_bug'
          }
        },
        {
          path: '/bug/detail/:id',
          name: 'BugDetail',
          component: () => import('@/views/bug/BugDetail'),
          meta: {
            title: '详情',
            permission: 'page_bug'
          }
        },
        {
          path: '/bug/add',
          name: 'BugAdd',
          component: () => import('@/views/bug/BugAdd'),
          meta: {
            title: '提Bug',
            permission: 'page_bug'
          }
        },
        {
          path: '/bug/edit/:id',
          name: 'BugEdit',
          component: () => import('@/views/bug/BugAdd'),
          meta: {
            title: 'Bug编辑',
            permission: 'page_bug'
          }
        }
        ]
      },

      // 报表
      {
        path: '/report',
        name: 'report',
        redirect: '/report/dashboard',
        component: PageView,
        hideChildrenInMenu: true,
        meta: {
          title: '报表',
          keepAlive: true,
          icon: 'book',
          permission: 'page_report'
        },
        children: [{
          path: '/report/dashboard',
          name: 'ReportDashboard',
          component: () => import('@/views/report/Analysis'),
          meta: {
            title: '总览',
            keepAlive: true,
            permission: 'page_report'
          }
        }]
      },

      // 组织
      {
        path: '/org',
        name: 'org',
        redirect: '/org/user-list',
        component: SubmenuView,
        hideChildrenInMenu: true,
        meta: {
          title: '组织',
          keepAlive: true,
          icon: 'book',
          permission: 'page_org'
        },
        children: [{
          path: '/org/user-list',
          name: 'UserList',
          component: () => import('@/views/org/UserList'),
          meta: {
            title: '用户',
            keepAlive: true,
            permission: 'org_user'
          }
        },
        {
          path: '/org/department-list',
          name: 'DepartmentList',
          component: () => import('@/views/org/DepartmentList'),
          meta: {
            title: '部门',
            permission: 'org_department'
          }
        },
        {
          path: '/org/role-list',
          name: 'RoleList',
          component: () => import('@/views/org/RoleList'),
          meta: {
            title: '角色',
            permission: 'org_role'
          }
        },
        {
          path: '/org/permission-list',
          name: 'PermissionList',
          component: () => import('@/views/org/PermissionList'),
          meta: {
            title: '权限',
            permission: 'org_permission'
          }
        },
        {
          path: '/org/permission/:id',
          name: 'PermissionEdit',
          component: () => import('@/views/org/PermissionEdit'),
          meta: {
            title: '角色权限',
            hideInMenu: true,
            permission: 'org_role'
          }
        },
        {
          path: '/org/company',
          name: 'Company',
          component: () => import('@/views/org/Company'),
          meta: {
            title: '公司',
            permission: 'org_company'
          }
        }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/settings',
        name: 'account',
        hideChildrenInMenu: true,
        meta: {
          title: '个人中心',
          icon: 'user',
          keepAlive: true,
          permission: 'page_usercenter'
        },
        children: [{
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/account/settings/Index'),
          meta: {
            title: '个人设置',
            hideHeader: true,
            permission: 'page_usercenter'
          },
          redirect: '/account/settings/base',
          hideChildrenInMenu: true,
          children: [{
            path: '/account/settings/base',
            name: 'BaseSettings',
            component: () => import('@/views/account/settings/BaseSetting'),
            meta: {
              title: '基本设置',
              hidden: true,
              permission: 'page_usercenter'
            }
          },
          {
            path: '/account/settings/security',
            name: 'SecuritySettings',
            component: () => import('@/views/account/settings/Security'),
            meta: {
              title: '安全设置',
              hidden: true,
              keepAlive: true,
              permission: 'page_usercenter'
            }
          },
          {
            path: '/account/settings/custom',
            name: 'CustomSettings',
            component: () => import('@/views/account/settings/Custom'),
            meta: {
              title: '个性化设置',
              hidden: true,
              keepAlive: true,
              permission: 'page_usercenter'
            }
          },
          {
            path: '/account/settings/mail',
            name: 'MailSettings',
            component: () => import('@/views/account/settings/Mail'),
            meta: {
              title: '发信配置',
              hidden: true,
              keepAlive: true,
              permission: 'page_mailsetting'
            }
          }
          ]
        }]
      }

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
  path: '/user',
  component: UserLayout,
  redirect: '/user/login',
  hidden: true,
  children: [{
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
  }]
},

{
  path: '/choose-app',
  name: 'chooseApp',
  component: () => import(/* webpackChunkName: "user" */ '@/views/app/ChooseApp')
},

{
  path: '/404',
  component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
}
]
