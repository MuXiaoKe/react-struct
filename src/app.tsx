import React, { useState, useEffect } from "react";
import axios from "axios";
import "./http/config";
import "./style/todolist.scss";
import { List } from "antd";
import "antd/dist/antd.css";

interface ItodoItem {
    content: string;
}
export function App() {
    const initData: Array<string> = [];
    const [todos, settodos] = useState(initData);
    const [todo, settodo] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settodo(event.currentTarget ? event.currentTarget.value : "");
    };
    const addTodoList = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            settodos([...todos, todo]);
            settodo("");
            addListData();
        }
    };
    const addListData = async () => {
        try {
            const res = await axios.get("api/addList", {
                params: {
                    content: String(todo)
                }
            });
            console.log(res);
        } catch (error) {}
    };
    const getListData = async () => {
        try {
            const res = await axios.get("api/getList", {
                params: {
                    // content: String(todo)
                }
            });
            console.log(res.data);
            settodos(prevState => {
                const newState = [
                    ...prevState,
                    ...res.data.map((item: ItodoItem) => item.content)
                ];
                console.log(newState);
                return newState;
            });
        } catch (error) {}
    };
    useEffect(() => {
        getListData();
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
                <List
                    size="small"
                    header={<div>待办列表</div>}
                    footer={<div>{`${new Date()}`}</div>}
                    bordered
                    dataSource={todos}
                    renderItem={item => (
                        <List.Item>
                            <span className="checkSpan"></span>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}
