import React from 'react';
export function App() {
    const [todo, settodo] = React.useState('');
    return (
        <>
            <div className="inputWrap">
                <input type="text" onChange={(e) => { settodo(e.currentTarget.value) }} />
            </div>
            <div className="list">
                <ul>
                    <li>{todo}</li>
                </ul>
            </div>
        </>
    );
}