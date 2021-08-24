import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography,Avatar,Row,Col,Checkbox,Collapse,Table,Input, Button,Modal, ConfigProvider } from 'antd';
import { InfoCircleOutlined, UndoOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {reverseArray,getJsonData,getData} from "../../../public/js/basic.js";
import ProTable from '@ant-design/pro-table';
import { range } from 'lodash';
//import srtJson from "../../../../db/srt.json";//目前是本地加载
import zhCN from 'antd/lib/locale/zh_CN';
import { useIntl, FormattedMessage } from 'umi';
//dbUrl = "../../../../db/";
import searchJson from "../../../../db/2021/search.json";
import mainJson from "../../../../db/2021/main.json";
import indexerList from "../../../../db/2021/indexer.json";
import srtJson from "../../../../db/srt.json";
//本地加载也不失为一种办法，但坏处是每次都要在本地进行更新

const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const { Meta } = Card;
const {Title,Text} = Typography;

// const sourceUrl = "https://raw.githubusercontent.com/peterpei1186861238/A-Soul-Database/main";
const build = "V1.30";
const sourceUrl = "https://cdn.jsdelivr.net/gh/peterpei1186861238/ASDB@"+build;

//let searchJson = getJsonData(sourceUrl+"/db/2021/search.json");
//let mainJson = getJsonData(sourceUrl+"/db/2021/main.json");
//let indexerList = getJsonData(sourceUrl+"/db/2021/indexer.json");



//这个函数不能用啊。。。
function getSubtitles(bv){
  let index = indexerList.indexOf(bv);

  let clip = parseInt(mainJson[index]["clip"]);
  let month = mainJson[index]["date"].split("-")[0];
  let srt = "";
  if(month.length===1){month="0"+month}
  if(clip===1){
      srt = getData(sourceUrl+"/db/2021/"+month+"/srt/"+bv+".srt");
  }else{
      for(var i =1;i<clip+1;i++){
          srt =srt + getData(sourceUrl+"/db/2021/"+month+"/srt/"+bv+"-"+i.toString()+".srt");
      }
  }
  srt.replace(/[0-9]/,"");
  let srtArr = srt.split("\n");
  let subtitles = [];
  for(let i=0;i<srtArr.length;i+=4){
    let subtitle = srtArr[i]+"|"+srtArr[i+1]+"|"+srtArr[i+2];
    subtitles.push(subtitle);
  }
  return subtitles;
}

let tableListDataSource = [];

for(let n in indexerList){
  let title = searchJson[indexerList[n]]["title"];
  let bv = mainJson[n]["bv"];
  //let subtitles = getSubtitles(bv);//这样写，会导致加载时需要发送190多个http请求，而且用的是同步阻塞。直接把页面炸穿。希望能有大神给改成异步式或者是别的什么方法，比如直接从本地加载？
  let subtitles = srtJson[bv];
  //console.log(subtitles);
  let date = mainJson[n]["date"];
  let hour = mainJson[n]["time"];
  
  // let time = mainJson[n]["date"]+""+mainJson[n]["time"];
  tableListDataSource.push({key:n,date:date,hour:hour,title:title,subtitle:{subtitles:subtitles,searchWords:""}});
}
// console.log(tableListDataSource);
tableListDataSource = reverseArray(tableListDataSource);

class SubTitleBtn extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    isModalVisible:false,
  }
  showModal = () => {
    this.setState({isModalVisible:true});
  };

  handleOk = () => {
    this.setState({isModalVisible:false});
  };

  handleCancel = () => {
    this.setState({isModalVisible:false});
  };
  render(){
    const {isModalVisible} = this.state;
    const {subtitles,searchWords} = this.props;
    
    return(
      <>
      
      <Button type="default" onClick={this.showModal}>
        查看
      </Button>
      <Modal title="字幕展示" visible={isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
        <Row><Col span={24} align="middle"><Title>字幕表</Title></Col></Row>
        <Row>
          <Col span={3}>序号</Col>
          <Col span={10}>时间</Col>
          <Col span={11}>字幕</Col>
        </Row>
        <Row style={{"borderBottom":"2px solid"}}><Text type="secondary">字幕搜索结果会以高亮展示💃💃💃往下翻翻吧</Text></Row>
        {subtitles.map((s)=>{
          let srtArr = s.split("|");
          let index = srtArr[0];
          let time = srtArr[1];
          let text = srtArr[2];
          // console.log(srtArr);
          let ClipRow;
          if(index === "0"){
            ClipRow = ()=>{return (<Row><Col
              style={{"color":"#9AC8E2","borderBottom":"1px solid"}}
            >{"切片分割线"}</Col></Row>)}
          }else{
            ClipRow = ()=>{return (<></>)}
          }
          return (
          <>
          <ClipRow/>
          <Row style={{"borderBottom":"1px dashed"}}>
            <Col span={3} style={{"color":"#B8A6D9"}}>{index}</Col>
            <Col span={10} style={{"color":"#E799B0"}}>{time}</Col>
            <Col span={11} style={{"color":"#576690"}}>
              <Highlighter
                highlightStyle={{ backgroundColor: '#BD7D74', padding: 0 }}
                searchWords={[searchWords]}
                autoEscape
                textToHighlight= {text}></Highlighter>
              </Col>
              </Row>
            </>
              );
        })}
        
      </Modal>
      </>
    );
  }
}





const columns = [
  {
    title: '日期',
    width: 80,
    dataIndex: 'date',
  },
  {
    title: '时间',
    width: 80,
    dataIndex: 'hour',
  },

  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '字幕',
    dataIndex: 'subtitle',
    render:(subtitle) =>{
      const {subtitles,searchWords} = subtitle
      return (<SubTitleBtn subtitles={subtitles} searchWords={searchWords}/>);
    }
  }
]

class ToolKits extends React.Component{
  constructor(props){
    super(props);
  }
  state = {
    input:"",
  }
  handleSearch = (e) =>{
    this.props.parent.handleSearch(this.state.input);
  }
  handleClear = (e) =>{
    this.setState({input:""});
    this.props.parent.handleSearch("");
  }

  handleReverse = (e) =>{
    this.props.parent.handleReverse();
  }
  render(){
    return (
      <Card
        onKeyDown={(e)=>{
          if(e.keyCode === 13){
            this.handleSearch(e);
          }
        }}
        actions={
          [
            <UndoOutlined 
              title="逆序"
              onClick ={this.handleReverse}
            ></UndoOutlined>,
            <ClearOutlined
              title="清除选择"
              onClick = {this.handleClear}
            ></ClearOutlined>,
            <SearchOutlined
              title="搜索"
              onClick = {this.handleSearch}
            ></SearchOutlined>
          ]
        }
        ><Row>
          <Col span={10}></Col>
          <Col span={4} align="middle">
            <Title level={2}>字幕库检索</Title>
          </Col>
        </Row>
        <Row style={{"height":"50px"}}>
        <Col span={6}></Col>
        <Col span={12} align="middle">
          <Input style={{"borderRadius":"50px"}}
          placeholder="单条字幕检索🔍" 
          onChange={(e)=>{this.setState({input:e.target.value})}}
          value={this.state.input}
        ></Input>
        </Col>
        <Col span={6} align="middle">
        </Col>
        </Row>
      </Card>
      
    );
  }
}

class SubtitlePage extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    dataSource: this.props.initDatasrc
  }
  handleSearch(searchWords){
    let newDatasrc = [];
    for(let data of this.props.initDatasrc){
      let subtitles = data["subtitle"].subtitles;
      let flag = false;
      for(let subtitle of subtitles){
        let srtArr = subtitle.split("|");
        let text = srtArr[2];
        if(text.indexOf(searchWords) !== -1){
          flag = true;
          break;
        }
      }
      data["subtitle"] = {subtitles:subtitles,searchWords:searchWords};
      if(flag)  newDatasrc.push(data);
    }
    this.setState({dataSource:newDatasrc});
  }
  handleReverse(){
    let newDatasrc = reverseArray(this.state.dataSource);
    this.setState({dataSource:newDatasrc});
  }
  render(){
    return(
      <PageContainer>
        <ToolKits parent={this}/>
          <ProTable
            columns={this.props.initColumns}
            rowKey="key"
            dataSource={this.state.dataSource}
            search={false}
          ></ProTable>
        
      </PageContainer>
    );
  }
}

export default () => {
    
    const subPageProps = {
      initColumns:columns,
      initDatasrc:tableListDataSource
    }
    return (
      <ConfigProvider locale={zhCN}>
        <SubtitlePage {...subPageProps}/>
      </ConfigProvider>
    );
};
