import RestModel from '../utils/model'

class RoleModal extends RestModel {
  constructor() {
    super('role')
  }
  getRole(id) {
    return this.resource.get(`/role/${id}`)
  }
  // permissions:array<object>:角色权限列表
  // 		id:string:模块主键
  // 		name:string:模块名称
  // 		actionEntitySet：array<obje>:方法列表
  // 			action:string:方法标识
  // 			defaultCheck:boolean:是否选中
  // 			describe:string:描述
  setPermission(id, permissions) {
    this.resource.put(`/role/${id}/permissions`, permissions)
  }
}

export default new RoleModal()
