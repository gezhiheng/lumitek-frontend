import BaseRequest from '@/service/base_request'

export default class QCA02Request extends BaseRequest {
  async brushInData(params) {
    const res = await this.POST('qca02/brushInData/', params)
    return res
  }

  async passStation(params) {
    const res = await this.POST('qca02/overStation/', params)
    return res
  }
}