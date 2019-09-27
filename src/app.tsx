import React from 'react';
export function App() {
    const [todos, settodo] = React.useState([]);
    const addTodoList = (e) => {
        if (e.keyCode === 13) {
            settodo([...todos, e.currentTarget.value]);
        }
    };
    return (
        <>
            <div className="inputWrap">
                <input type="text" onKeyDown={(e) => { addTodoList(e) }} />
            </div>
            <div className="list">
                <ul>
                    {
                        todos.map((item, index) => (
                            <li key={index}><span className="checkSpan"></span><p>{item}</p></li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}