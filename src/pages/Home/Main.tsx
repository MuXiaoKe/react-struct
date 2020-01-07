import React, { FC, useState } from 'react';
import '../../services/config';

interface ItemType {
    id: number;
    name: string;
}

const MainPage: FC = () => {
    const [state] = useState<ItemType[]>([
        { id: 1, name: 'shrek' },
        { id: 2, name: 'fiona' }
    ]);
    return (
        <div>
            {state.map((item) => (
                <div  key={item.id}>
                    <div>{item.name}</div>
                </div>
            ))}
        </div>
    );
};
export default MainPage;
