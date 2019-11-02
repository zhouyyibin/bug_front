export const BUG_VARIABLES = {
  type: [
    '代码错误',
    '界面优化',
    '配置相关',
    '安装部署',
    '安全相关',
    '性能问题',
    '标准规范',
    '测试脚本',
    '其他',
    '设计缺陷'
  ],
  hardware_platform: [
    'all',
    'pc',
    'macintosh',
    'other'
  ],
  operating_system: [
    'all',
    'windows',
    'Mac OS',
    'other'
  ],
  browser: [
    '全部',
    'IE系列',
    'chrome',
    'firefox系列',
    'opera系列',
    'safari',
    '遨游',
    'UC'
  ],
  severity: {
    '1': '功能改进',
    '2': '普通问题',
    '3': '功能缺失',
    '4': '严重崩溃',
    '5': '阻碍进度'
  },
  priority: {
    '1': '低',
    '2': '一般',
    '3': '高',
    '4': '紧急'
  }
}

export const ERROR_CODES = {
  50101: '账号或者密码不正确',
  50102: '账号已经存在',
  50103: '部门已经存在',
  50104: '部门已经存在',
  50105: '角色已存在',
  50106: '系统类别名字已存在',
  50108: 'Bug名称已存在',
  50109: '项目名称已存在',
  50110: '旧密码不正确',
  50111: '账号已被禁用'
}

export const STATUS_CODES = {
  '0': '未确认',
  '1': '已确认',
  '2': '处理中',
  '3': '已解决',
  '4': '已通过'
}

export const STATUS_ACTION_CODES = {
  '0': '激活',
  '1': '确认',
  '2': '处理中',
  '3': '解决',
  '4': '通过'
}
