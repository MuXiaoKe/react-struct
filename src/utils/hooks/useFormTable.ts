import { useAntdTable } from 'ahooks';

type tableList = (obj: any) => Promise<any>;
// eslint-disable-next-line
const useFormTable = (func: tableList, form: any, formatData?: any, defVal?: any) => {
    // console.log(defVal);
    const { tableProps, search } = useAntdTable(
        ({ current, pageSize }, formData) => {
            const _formData = formatData?.(formData) ?? formData;
            return func({ current, pageSize, ..._formData });
        },
        {
            form,
            defaultParams: [{ current: 1, pageSize: 10 }, defVal]
        }
    );
    return { tableProps, search };
};
export default useFormTable;
