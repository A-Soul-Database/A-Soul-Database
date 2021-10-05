import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography,Row,Col,Image } from 'antd';
import {GithubFilled,LinkOutlined,createFromIconfontCN} from '@ant-design/icons';
const {Text,Title,Paragraph}  = Typography;
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2756813_9ml228rpprq.js",
});
  
  export default () => {
    
    return (
      <PageContainer>
        <Title level={1} align="middle">关于Asoul</Title>
        <Paragraph align="middle"> Asoul 是小姐姐们用动捕技术展现出的3D虚拟形象,是国内首个由娱乐公司运营的虚拟偶像企划。团队由五位性格、 特长、爱好各异的女孩组成。</Paragraph>
        <Title level={3} align="middle">成员链接</Title>
          <Row>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/672346917/"><li>向晚AvA</li></a></Col>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/672353429/"><li>贝拉Bella</li></a></Col>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/351609538/"><li>珈乐Carol</li></a></Col>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/672328094/"><li>嘉然Diana</li></a></Col>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/672342685/"><li>乃琳Eileen</li></a></Col>
            <Col md={4} align="middle"><a href="https://space.bilibili.com/703007996/"><li>阿草Furry😋</li></a></Col>
          </Row>
        <Title level={1} align="middle" style={{"marginTop":"50px"}}>关于我们</Title>
        
          <Paragraph align="middle">一个魂自制的asoul数据库捏，目前已有视频库与字幕库</Paragraph>

          <Title level={3} align="middle">网站功能</Title>
          <Row><Col md={{"offset":6}}><li>视频库:</li></Col></Row>
          <Row><Col md={{"offset":7}}><li>根据标题，活动，关键字对视频进行检索</li></Col></Row>
          <Row><Col md={{"offset":7}}><li>在视频卡片的下方点击详细信息按钮，可以查看该视频的出镜人物，服饰，活动表以及弹幕关键字</li></Col></Row>
          <Row><Col md={{"offset":7}}><li>根据出镜人物，出场场景，活动等项目对视频卡片进行高级筛查</li></Col></Row>

          <Row><Col md={{"offset":6}}><li>字幕库:</li></Col></Row>
          <Row><Col md={{"offset":7}}><li>根据对话找到相应的字幕及其出现位置，查找结果会高亮显示</li></Col></Row>
          <Row><Col md={{"offset":7}}><li>查看字幕对应的时间轴💃💃💃</li></Col></Row>
          <Paragraph></Paragraph>

          <Title level={3} align="middle">联系我们</Title>
          <Row>
            <Col md={{"offset":6,"span":3}}><li>数据库开发者:</li></Col>
            <Col md={3}><a href="https://github.com/peterpei1186861238"><GithubFilled/></a>Github主页</Col>
            <Col><a href="https://space.bilibili.com/19964039"><IconFont type="icon-icon_bilibili-circle" /></a>B站主页</Col>
          </Row>
          
          <Row>
            <Col md={{"offset":6,"span":3}}><li>前端开发者:</li></Col>
            <Col md={3}><a href="https://github.com/lrq619"><GithubFilled/></a>Github主页</Col>
            <Col><a href="https://space.bilibili.com/288586248"><IconFont type="icon-icon_bilibili-circle" /></a>B站主页</Col>
          </Row>

        <Title level={1} align="middle" style={{"marginTop":"50px"}}>技术文档</Title>
        <Paragraph align="middle">本产品由React编写，主要以antd(Ant Design-Pro),CrgC(Courageous Cattle)为前端脚手架进行搭建，并配以IzJJ(Iz-euJ-euJ)所提供的云服务进行网页优化</Paragraph>
        <Paragraph align="middle">以下为所涉及到的前端框架的链接，在使用本数据库之前请<b>务必</b>反复查看并确保无误。若不遵守本规定，由此产生的一切法律后果由使用者本人承担</Paragraph>
        <Row><Col md={{"offset":6}}><li>前端脚手架:</li></Col></Row>
        <Row><Col md={{"offset":7}}><li>Antd(Ant Design-Pro):<a href="https://ant.design/docs/react/introduce-cn"><LinkOutlined/>文档链接</a></li></Col></Row>
        <Row><Col md={{"offset":7}}><li>CrgC(Courageous Cattle):<a href="https://www.bilibili.com/video/BV14y4y1M7cC"><LinkOutlined/>文档链接</a>(<b>***使用前必看***</b>)</li></Col></Row>
        <Row><Col md={{"offset":6}}><li>云服务提供商:</li></Col></Row>
        <Row><Col md={{"offset":7}}><li>IzJJ(Iz-euJ-euJ):<a href="https://www.bilibili.com/video/BV1kg411778T"><LinkOutlined/>文档链接</a>(<b>***使用前必看***</b>)</li></Col></Row>

        <Title level={1} align="middle" style={{"marginTop":"50px"}}>未来规划</Title>
        <Paragraph align="middle" >
          <div style={{"width":"70%"}}>
            将该网站部署到真正的服务器上而非如今的Github Pages上，将数据库做成真正的数据库而非如今的json文件夹。
            一句话：希望一个魂们能有更好的Asoul Database，不像今天这个这么卡，我超。
            在网站开发过程中使用到了闭源的前端框架Crgc(<a href='https://www.bilibili.com/video/BV14y4y1M7cC'>Courageous Cattle</a>)和云服务提供商IzJJ(<a href='https://www.bilibili.com/video/BV1kg411778T'>Iz-euJ-euJ</a>),在此特别鸣谢。
          </div>
        </Paragraph>
        <Paragraph></Paragraph>
        <Row>
          <Col xs={24} md={24} align="middle">
            <Card style={{"width":"200px","height":"200px","borderRadius":"10px"}}>
              <Image src="./cheat.png"></Image>
              诈骗链接，爱扫不扫🤗
            </Card>
          </Col>
        </Row>
        
          
      </PageContainer>
    );
};