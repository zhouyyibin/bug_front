import resource from '@/utils/resource'
export default {
  addSystemClassfication(type, name) {
    return resource.post('/system/classification', {
      name,
      type
    })
  },
  getSystemClassfication(type) {
    return resource.get(`/system/classification/list/${type}`, {
      params: {
        pageNo: 1,
        pageSize: -1
      }
    })
  },
  getMailSetting() {
    return resource.get(`/system/mails`)
  },
  saveMailSetting(data) {
    return resource.put('/system/mails', data)
  }
}
