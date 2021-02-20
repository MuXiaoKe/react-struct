import * as React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import {  notification } from 'antd';
const download = (url: string, data: PlainObject = {}) => {
    const divElement = document.getElementById('downloadBox') as HTMLElement;
    ReactDOM.render(
        <form action={`${url}`} method="post">
            {Object.keys(data).map((item, index) => (
                <input key={index} name={item} type="text" defaultValue={data[item]} />
            ))}
        </form>,
        divElement
    );
    const divNode = ReactDOM.findDOMNode(divElement) as HTMLElement;
    divNode.querySelector('form')?.submit();
    ReactDOM.unmountComponentAtNode(divElement);
};
const axiosDownload = (url: string, data: PlainObject = {}, fileName: string) => {
    axios
        .post(
            url,
            {
                ...data
            },
            {
                headers: {
                    'content-type': 'application/json; charset=utf-8',
                    Authorization: sessionStorage.getItem('access_token') || ''
                },
                responseType: 'blob' // --设置请求数据格式
            }
        )
        .then((res) => {
            // console.log(res);
            let filename = fileName;
            let blob = res.data;
            let reader = new FileReader();
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function(e: any) {
                let a = document.createElement('a');
                a.download = filename;
                a.href = e.target.result;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        });
};

export { download, axiosDownload };
