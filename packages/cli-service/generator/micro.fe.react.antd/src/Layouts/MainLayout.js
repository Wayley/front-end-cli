import React, { lazy, Suspense, useState } from 'react';
import { Layout, Menu, Divider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from '../pages/Home';
const About = lazy(() => import('../pages/About'));
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
  const history = useHistory();
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const rootSubmenuKeys = ['sub1', 'sub2'];
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    if (['/', '/about'].indexOf(key)) {
      history.push(key);
    }
    console.log({ item, key, keyPath, selectedKeys, domEvent });
  };
  return (
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react16' : '/'}>
      <Layout className="react16app-main-layout">
        <Sider
          width="280"
          style={{ background: '#e6f7ff' }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          {/* LOGO */}
          <div className="react16app-logo">React16 App Logo</div>
          {/* Nav */}
          <nav>
            <Link to="/">Home</Link>
            <Divider type="vertical" />
            <Link to="/about">About</Link>
          </nav>
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ width: 256 }}
            onSelect={onSelect}
          >
            <SubMenu
              key="sub1"
              icon={<MenuUnfoldOutlined />}
              title="Navigation One"
            >
              <Menu.Item key="/">Home</Menu.Item>
              <Menu.Item key="/about">About</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<MenuFoldOutlined />}
              title="Navigation Two"
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#ccc' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
              <Suspense fallback={null}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" component={About} />
                </Switch>
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}
