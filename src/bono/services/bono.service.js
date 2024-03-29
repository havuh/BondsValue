import http from '../../core/http-common'

class BonoService {
    endPoint = 'https://bonds-value-api.herokuapp.com/bonds';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getAllByUserId(userId) {
        return http.get(`${this.endPoint}?userId=${userId}`);
    }
    create(createBonoDto) {
        return http.post(`${this.endPoint}`, createBonoDto);
    }
    delete(id) {
        return http.delete(`${this.endPoint}/${id}`);
    }
    saveSecondMarket(secondMarket) {
        localStorage.setItem('secondMarket', JSON.stringify(secondMarket));
    }
    removeSecondMarket() {
        localStorage.removeItem('secondMarket');
    }
}

export default new BonoService();