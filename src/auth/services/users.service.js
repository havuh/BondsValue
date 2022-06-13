import http from '../../core/http-common'

class UsersService {
    endPoint = 'http://localhost:3000/api/v1/users';

    getAll() {
        return http.get(this.endPoint);
    }
    getByEmail(email) {
        return http.get(`${this.endPoint}?email_like=${email}`);
    }
    create(createUserDto) {
        return http.post(`${this.endPoint}`, createUserDto);
    }
}

export default new UsersService();