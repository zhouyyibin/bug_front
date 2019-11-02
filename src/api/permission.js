import RestModel from '../utils/model'
class PermissionModel extends RestModel {
  constructor() {
    super('permission')
  }

  list() {
    return this.resource.get('/permission/list')
  }

  saveRolePermissions(id, permissions) {
    return this.resource.put(`/role/${id}/permissions`, {
      id,
      permissions
    })
  }
}

export default new PermissionModel()
