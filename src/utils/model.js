import resource from './resource'

export default class RestModel {
  constructor (model) {
    this.model = '/' + model
    this.resource = resource
  }

  list (params) {
    const { pageNo, pageSize } = params
    delete params.pageNo
    delete params.pageSize
    return this.resource.get(this.model + '/list/' + pageNo, {
      params: {
        size: pageSize,
        ...params
      }
    })
  }

  remove (id) {
    return this.resource.delete(`${this.model}/${id}`)
  }

  save (data) {
    return this.resource.post(this.model, data)
  }

  detail (id) {
    return this.resource.get(`${this.model}/${id}`)
  }

  update (data) {
    return this.resource.put(`${this.model}/${data.id}`, data)
  }

  tree () {
    return this.resource.get(`${this.model}/tree`)
  }
}
