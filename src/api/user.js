/*
 * @Author: pengzhiming
 * @Date: 2019-05-20 22:01:14
 * @LastEditors: pengzhiming
 * @LastEditTime: 2019-08-21 22:34:28
 * @Description: 
 */
import RestModel from '../utils/model'
class UserModal extends RestModel {
  constructor() {
    super('user')
  }

  resetPwd(id) {
    return this.resource.put(`/user/${id}/reset`, {
      id
    })
  }

  deleteUser(id) {
    return this.resource.delete(`/user/del/${id}`)
  }

  changePassword(data) {
    return this.resource.put('/user/change/password', data)
  }
}

export default new UserModal()