import '../../styles/css/mb_content.css';
import React from 'react';
// 引入其他内部文件
import Component_Group from './component_group.js';
import MB_Psychology from './mb_psychology.js';
import MB_Oil from './mb_oil.js';

import {
    Tabs
} from 'antd';
const TabPane = Tabs.TabPane;



class MB_Content extends React.Component {
    render() {
        return (
            <Tabs defaultActiveKey="hot" className='mb-content'>
                <TabPane tab="本周热搜" key="hot">
                    <Component_Group urlsMapkey='hot'></Component_Group>
                </TabPane>
                <TabPane tab="健康资讯" key="healthy">
                    <Component_Group urlsMapkey='healthy'></Component_Group>
                </TabPane>
                <TabPane tab="心理测试" key="psychology">
                    <MB_Psychology></MB_Psychology>
                </TabPane>
                <TabPane tab="油价查询" key="oil">
                    <MB_Oil></MB_Oil>
                </TabPane>
            </Tabs>
        )
    }
}

export default MB_Content;