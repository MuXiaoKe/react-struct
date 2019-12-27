import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../http/config";
import "./todolist.scss";
import { List } from "antd";
import "antd/dist/antd.css";
import { CloseOutlined } from '@ant-design/icons';
interface ItodoItem {
    content: string;
}
export default function TodoList() {
    const initData: Array<string> = [];
    const [todos, settodos] = useState(initData);
    const [todo, settodo] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settodo(event.currentTarget ? event.currentTarget.value : "");
    };
    const addTodoList = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
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
    // 删除行数据
    const deleteList = async(index : number) =>{
        const _todos:Array<string> = [...todos]
        _todos.splice(index , 1)
        settodos(_todos);
        try {
            const res = await axios.get("api/deleteList", {
                params: {
                    content: String(todo)
                }
            });
            console.log(res.data);
            
        } catch (error) {}
    }
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
                    renderItem={(item , index)=> (
                        <List.Item>
                            <span className="checkSpan" />
                            {item}
                            <CloseOutlined  onClick={()=>deleteList(index)} />
                        </List.Item>
                    )}
                />
            </div>
        </>
    );
}
