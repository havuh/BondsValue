import http from '../../core/http-common'

class UsersService {
    endPoint = 'https://bonds-value-api.herokuapp.com/users';

    getAll() {
        return http.get(this.endPoint);
    }
    getByEmail(email) {
        return http.get(`${this.endPoint}?email=${email}`);
    }
    create(createUserDto) {
        return http.post(`${this.endPoint}`, createUserDto);
    }
}

export default new UsersService();