import RestModel from '../utils/model'
var qs = require('qs')
class BugModel extends RestModel {
  constructor() {
    super('bug')
  }

  updateBug(data) {
    return this.resource.put(`/bug/${data.id}/base`, data)
  }

  getExportUrl(query, userid) {
    return `http://${window.localStorage.getItem('VUE_APP_HOST') ? window.localStorage.getItem('VUE_APP_HOST') :  process.env.VUE_APP_HOST}:${window.localStorage.getItem('VUE_APP_PORT') ? window.localStorage.getItem('VUE_APP_PORT') :  process.env.VUE_APP_PORT}/bug/` + userid + '/export?' + qs.stringify(query)
  }

  getTop10() {
    return this.resource.get('/bug/top/list')
  }

  // 0=查找所有未解决的
  // 1=查找所有已解决的
  // 2=查找所有超时的
  // 10=查找个人指派给我，我未解决的
  // 11=查找个人指派给我，我已解决的
  // 12=查找个人指派给我，超时的
  // 20=查找个人我创建的，我未解决的
  // 21=查找个人我创建的，我已解决的
  // 22=查找个人我创建的，超时的
  getCount(query) {
    return this.resource.get(`/bug/statistics/count`, {
      params: query
    })
  }

  history(id) {
    return this.resource.get(`/bug/log/list/${id}`)
  }

  // id:string:bug主键
  //  describe:string:描述
  // annex:string:附件地址
  // status:int:状态：
  // 0=激活
  // 1=确认
  // 2=处理中
  // 3=解决
  // 4=通过
  setStatus(data) {
    data['annexs'] && data['annexs'].length > 0 && (data['annex'] = data['annexs'][0])
    return this.resource.put(`/bug/${data.id}`, data)
  }
}

export default new BugModel()
