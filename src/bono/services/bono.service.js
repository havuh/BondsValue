import http from '../../core/http-common'

class BonoService {
    endPoint = 'users';

    getAll() {
        return http.get(this.endPoint);
    }
    delete(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }
    getByName(name) {
        return http.get(`localhost:3000/users?name_like=${name}`);
    }
}

export default new BonoService();