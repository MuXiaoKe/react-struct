import { useRequest } from 'ahooks';
import * as api from '@services/index';

const useAllProducts = (func: any) => {
    return useRequest(api.queryAllProduct, {
        onSuccess: (data) => {
            func(data);
        },
        cacheKey: 'queryAllProduct',
        staleTime: 5 * 60 * 1000
    });
};
export default useAllProducts;
