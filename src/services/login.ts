import http from '../utils/http';
export function getUserInfo(data): Promise<any> {
    return http.post('/api/getUserInfo', data || {});
}

export function login(data): Promise<any> {
    return http.post('/api/login', data);
}

export function logout(data): Promise<any> {
    return http.post('/api/logout', data);
}
