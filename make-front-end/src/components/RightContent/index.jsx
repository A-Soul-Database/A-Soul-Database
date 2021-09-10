import { Row,Col,Dropdown,Menu,Button } from 'antd';
import { DownOutlined} from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a target="_blank" href="https://www.asoulfan.com/">AsoulFan</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a target="_blank" href="https://asoulcnki.asia/">枝网查重</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a target="_blank" href="https://www.asoul.cloud/">一个魂二创</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a target="_blank" href="https://asoulwiki.com/">一个魂维基</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a target="_blank" href="https://www.bilibili.com/video/BV1wo4y1X7Tk?p=1">宇宙的终点站</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Row style={{"height":"80%"}}>
      <Dropdown overlay={menu}>
        <Button>
         
            <b>友情链接</b>

        </Button>
      </Dropdown>
    </Row>
  );
};

export default GlobalHeaderRight;
