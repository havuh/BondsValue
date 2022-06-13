class AuthService {
    logIn (user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    logOut() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();