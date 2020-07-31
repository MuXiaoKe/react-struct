import http from '../utils/http';
// 获取用户信息
export function getUserInfo(data: any): Promise<any> {
    return http.post('/login/getAccountInfo', data || {});
}
// 登录
export function login(data: any): Promise<any> {
    return http.post('/login', data);
}
// 登出
export function logout(data: any): Promise<any> {
    return http.post('/login/logout', data);
}
// 注册
export function register(data: any): Promise<any> {
    return http.post('/login/register', data);
}
