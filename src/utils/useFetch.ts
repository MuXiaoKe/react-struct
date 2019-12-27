import { useState, useCallback, useEffect } from 'react';
import axios,{AxiosResponse} from 'axios';
interface Ires extends AxiosResponse {
    code?: number
}
export function useFetch(params: any, visible = true) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    // 缓存参数
    const [newParams, setNewParams] = useState(params);
    const fetchApi = useCallback(async () => {
        // console.log("useCallback");
        if (visible) {
            setLoading(true);
            // console.log("fetch===>");
            const res : Ires = await axios(newParams);
            if (res.code === 1) {
                setData(res.data);
            }
            setLoading(false);
        }
    }, [fetch, newParams, visible]);

    useEffect(() => {
        // console.log("useEffect");
        fetchApi();
    }, [fetchApi]);
    const doFetch = useCallback(
        (rest) => {
            setNewParams({ ...newParams, ...(rest || {}) });
        },
        [newParams]
    );

    const reFetch = () => {
        setNewParams({...newParams});
    };
    return {
        loading,
        data,
        doFetch,
        reFetch
    };
}
