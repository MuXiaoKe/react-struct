import React from 'react';
import { Layout, Dropdown, Menu, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './style.scss';
import { CollapsedContext } from '../BasicLayout';
const menu = (
  <Menu>
    <Menu.Item key="0">
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        &nbsp; 退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const MainHeader: React.SFC = () => {
  const { state, dispatch } = React.useContext(CollapsedContext);
  return (
    <Layout.Header className="main-header">
      <Row style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
        {
                !!state && state.collapsed ?
                <MenuUnfoldOutlined className="menuTrigger"
                onClick={() => {
                    !!dispatch && dispatch({ type: 'toggle' })
                }}/>
                    :
                <MenuFoldOutlined className="menuTrigger"
                onClick={() => {
                    !!dispatch && dispatch({ type: 'toggle' })
                }}/>
            }
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-img" />
              <span className="user-name">zhou</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default MainHeader;
