import http from '../utils/http';
export function getUserInfo(data: any): Promise<any> {
    return http.post('/api/getUserInfo', data || {});
}

export function login(data: any): Promise<any> {
    return http.post('/api/login', data);
}

export function logout(data: any): Promise<any> {
    return http.post('/api/logout', data);
}
