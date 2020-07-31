import React from 'react';
import logo from '@assets/image/logo-do.png';
const CommonHeader: React.FC = () => {
    return (
        <header style={{ background: '#000421', height: '7.4vh' }}>
            <img
                src={logo}
                alt="logo"
                style={{ height: '5vh', marginTop: '1.2vh', marginLeft: '7.8vw' }}
            />
        </header>
    );
};
export default CommonHeader;
