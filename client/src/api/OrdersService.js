class OrdersService {
  _apiBase = `http://localhost:9966/api/v1/orders`;
  async getResourse(url, config) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ресурсы по адресу ${url} не доступны`);
    }
    return await res.json();
  }

  async getAllOrders() {
    const res = await this.getResourse(`${this._apiBase}/all/`);
    return res;
  }

  getOrder(id) {
    return this.getResourse(`${this._apiBase}/get/${id}`)
  }
}

export default OrdersService;