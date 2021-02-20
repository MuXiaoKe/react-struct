import http from '../utils/http';

export function queryProductList(data: any): Promise<any> {
    // console.log(data);
    return http.post('/product/queryProductList', data || {});
}
