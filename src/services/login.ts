import http from '../utils/http';
import { BASE_URL } from '@src/constants/index';
// 获取用户信息
export function getUserInfo(data: any): Promise<any> {
    return http.post(`${BASE_URL}/login/getAccountInfo`, data || {});
}
