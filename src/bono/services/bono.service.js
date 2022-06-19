import http from '../../core/http-common'

class BonoService {
    endPoint = 'http://localhost:3000/api/v1/bonds';

    getAll() {
        return http.get(this.endPoint);
    }
    getAllByUserId(userId) {
        return http.get(`${this.endPoint}?userId=${userId}`);
    }
    delete(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }
    getByName(name) {
        return http.get(`localhost:3000/users?name_like=${name}`);
    }
}

export default new BonoService();