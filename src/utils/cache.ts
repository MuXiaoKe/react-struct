import deepEqual from 'fast-deep-equal';
type Key = any;
type TParam = any;
class Cache {
    private cache: Map<string, any>;
    private param: Map<string, any>;
    private timers: Map<string, any>;
    public constructor(initialData: any = {}) {
        this.cache = new Map(Object.entries(initialData)); // 键值对数组
        this.param = new Map();
        this.timers = new Map();
    }
    public get(key: Key): any {
        return this.cache.get(key);
    }
    public set(key: Key, value: any): any {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        } // 数据在不活跃 5min 后，删除掉

        const timer = setTimeout(() => {
            this.delete(key);
        }, 5 * 60 * 1000);
        this.timers.set(key, timer);

        this.cache.set(key, value);
    }
    public keys() {
        return Array.from(this.cache.keys());
    }
    public has(key: Key) {
        return this.cache.has(key);
    }
    public clear() {
        this.cache.clear();
    }
    public delete(key: Key) {
        this.cache.delete(key);
    }
    public trimParam(_param: TParam): TParam {
        // 为空或者为undefined的参数删除，否则会影响比较
        for (const o in _param) {
            if (_param[o] === undefined || _param[o] === null || _param[o] === '') {
                delete _param[o];
            }
        }
        return _param;
    }
    // 设置参数
    public setParam(key: Key, param: TParam) {
        const _param = JSON.parse(JSON.stringify(param));
        // 为空或者为undefined的参数删除，否则会影响比较
        this.trimParam(_param);
        // console.log('param' + _param)
        this.param.set(key, _param);
    }
    // 比较参数对象
    public compare(key: Key, param: TParam) {
        const _param = JSON.parse(JSON.stringify(param));
        // 为空或者为undefined的参数删除，否则会影响比较
        this.trimParam(_param);
        // console.log(this.param.get(key), _param);
        return deepEqual(this.param.get(key), _param);
    }
}

// cache
const cache = new Cache();
export { cache, Cache };
