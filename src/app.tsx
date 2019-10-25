import React, { useState, useEffect } from "react";
import axios from "axios";
import './http/config'
import './style/todolist.scss';
import {getRandom} from './utils';
export function App() {
    const [todos, settodos] = useState([]);
    const [todo, settodo] = useState("");

    const handleChange = e => {
        settodo(e.currentTarget.value);
    };
    const addTodoList = e => {
        if (e.keyCode === 13) {
            settodos([...todos, todo]);
            settodo("");
        }
    };
    useEffect(() => {
        axios
            .get("qqq", {
                params: {
                    content: String(getRandom(0,100))
                }
            })
            .then(function(response) {
                console.log(response);
                settodo(response.data)
            })
            .catch(function(error) {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="inputWrap">
                <input
                    type="text"
                    onKeyDown={e => {
                        addTodoList(e);
                    }}
                    onChange={handleChange}
                    value={todo}
                />
            </div>
            <div className="list">
                <ul>
                    {todos.map((item, index) => (
                        <li key={index}>
                            <span className="checkSpan"></span>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
