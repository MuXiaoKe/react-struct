import * as React from 'react';
import ReactDOM from 'react-dom';
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

export { download };
