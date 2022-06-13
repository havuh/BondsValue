import http from '../../core/http-common'

class UsersService {
    endPoint = 'http://localhost:3000/api/v1/users';

    create(createUserDto) {
        return http.post(`${this.endPoint}`, createUserDto);
    }
}

export default new UsersService();