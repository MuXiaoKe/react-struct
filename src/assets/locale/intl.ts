import { createIntl, createIntlCache } from 'react-intl';
import zh_CN from '@assets/locale/zh_CN';
const cache = createIntlCache();
export const intl = createIntl(
    {
        locale: 'zh',
        messages: zh_CN
    },
    cache
);
