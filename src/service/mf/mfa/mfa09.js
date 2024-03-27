import BaseRequest from '@/service/base_request'

export class holdTypeRequest extends BaseRequest {
  async init(staffNo) {
    const res = await this.GET('mfa09/hold-info/init', {
      staffNo: staffNo
    })
    return res
  }

  async add(params) {
    const res = await this.POST('mfa09/hold-info/', params)
    return res
  }

  async update(params) {
    const res = await this.PUT('mfa09/hold-info/', params)
    return res
  }

  async delete(params) {
    const res = await this.DELETE('mfa09/hold-info/', params)
    return res
  }

  async saveOrder(params) {
    const res = await this.PUT('mfa09/hold-info/order/', params)
    return res
  }
}

export class cancelRequest extends BaseRequest {
  async init(staffNo) {
    const res = await this.GET('mfa09/cancel-info/init', {
      staffNo: staffNo
    })
    return res
  }

  async add(params) {
    const res = await this.POST('mfa09/cancel-info/', params)
    return res
  }

  async update(params) {
    const res = await this.PUT('mfa09/cancel-info/', params)
    return res
  }

  async delete(params) {
    const res = await this.DELETE('mfa09/cancel-info/', params)
    return res
  }
}