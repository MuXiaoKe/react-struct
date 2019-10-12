import React from 'react';
interface MyType {
    aa : string
}
const mytype1: MyType = {aa :'23'}
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
            <p>{mytype1.aa}</p>
        </>
    );
}