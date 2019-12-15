import RestModel from '../utils/model'
class DepartmentModel extends RestModel {
  constructor() {
    super('department')
  }

  getSearchList() {
    return this.resource.get('/department/check/list')
  }
}

export default new DepartmentModel()