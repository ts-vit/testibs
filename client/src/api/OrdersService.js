class OrdersService {
    //_apiBase = `http://localhost:9966/api/v1/orders`;

    async getData(url) {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Ресурсы по адресу ${url} не доступны`);
        }
        return await res.json();
    }

    async postData(url = '', method, data = {}) {
        const res = await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(data),
        });
        const bodyRes = await res.json();
        return bodyRes;
    }

    async deleteData(url = '') {
        const res = await fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',

        });
        return res;
    }

    async getAllOrders() {
        const res = await this.getData(`/all/`);
        return res;
    }

    async getOrder(id) {
        const res = await this.getData(`/get/${id}`);
        return res;
    }

    async addOrder(data) {
        const res = await this.postData(`/save/`, "POST", data);

        return res;

    }

    async updateOrder(data) {
        const res = await this.postData(`/update/`, "PUT", data);
        return res;
    }

    async deleteOrder(id) {
        const res = await this.deleteData(`/delete/${id}`);
        return res;
    };


}

export default OrdersService;