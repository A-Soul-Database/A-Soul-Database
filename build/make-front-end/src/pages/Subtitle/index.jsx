import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography,Avatar,Row,Col,Checkbox,Collapse,Table,Input, Button,Modal, ConfigProvider,Anchor } from 'antd';
import { InfoCircleOutlined, UndoOutlined, ClearOutlined, SearchOutlined,CaretUpFilled,CaretDownFilled } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {reverseArray,getJsonData,getData} from "../../../public/js/basic.js";
import config from "../../../public/js/basic.js";
import ProTable from '@ant-design/pro-table';

//import srtJson from "../../../../db/srt.json";//目前是本地加载
import zhCN from 'antd/lib/locale/zh_CN';
import { useIntl, FormattedMessage } from 'umi';
//dbUrl = "../../../../db/";
// import searchJson from "../../../../db/2021/search.json";
// import mainJson from "../../../../db/2021/main.json";
// import indexerList from "../../../../db/2021/indexer.json";
// import srtJson from "../../../../db/srt.json";
//本地加载也不失为一种办法，但坏处是每次都要在本地进行更新

const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const { Meta } = Card;
const {Title,Text} = Typography;

const sourceUrl = config.sourceUrl;
let searchJson = getJsonData(sourceUrl+"/db/2021/search.json");
let mainJson = getJsonData(sourceUrl+"/db/2021/main.json");
let indexerList = getJsonData(sourceUrl+"/db/2021/indexer.json");

const highlightColor = "yellow";


function getSubtitles(bv){
  //TODO:加强鲁棒性
  let index = indexerList.indexOf(bv);
  if(mainJson[index]["bv"] != bv){
    console.error("indexer.json don't match mainJson in bv fileds, index: "+index);
    return new Array();
  }
  let clip = 1;
  let month = "";
  try{
    clip = parseInt(mainJson[index]["clip"]);
    month = mainJson[index]["date"].split("-")[0];
  }catch{
    console.error("clip and month parse fault in bv: "+bv);
  }
  if(month === "" || clip === 0) return new Array();
  if(month.length===1){month="0"+month};

  let subtitles = new Array(clip);
  for(let i=0;i<clip;i++) subtitles[i] = [];
  if(clip===1){
      let srt = "";
      let url = sourceUrl+"/db/2021/"+month+"/srt/"+bv+".srt";
      try{
        srt = getData(url);
      }catch{
        console.error("Get subtitles fault on url: "+url);
        subtitles[0].push("||");
        return subtitles;
      }
      
      let srtArr = srt.split("\n");
      for(let i=0;i<srtArr.length-2;i+=4){
        let subtitle = srtArr[i]+"|"+srtArr[i+1]+"|"+srtArr[i+2];
        subtitles[0].push(subtitle);
      }
  }else{
      for(var i =1;i<clip+1;i++){
          let srt = "";
          let url = sourceUrl+"/db/2021/"+month+"/srt/"+bv+"-"+i.toString()+".srt";
          try{
            srt = getData(url);
          }catch{
            console.error("Get subtitles fault on url: "+url);
            subtitles[i-1].push("||");
            continue;
          }
          
          let srtArr = srt.split("\n");
          for(let j=0;j<srtArr.length-2;j+=4){
            let subtitle = srtArr[j]+"|"+srtArr[j+1]+"|"+srtArr[j+2];
            subtitles[i-1].push(subtitle);
          }
      }
  }
  return subtitles;
}

let tableListDataSource = [];

for(let n in mainJson){
  let title;
  let bv;
  let date;
  let hour;

  
  try{
    title = mainJson[n]["title"];
    bv = mainJson[n]["bv"];
    date = mainJson[n]["date"];
    hour = mainJson[n]["time"];
  }catch{
    console.error("mainJson parse fault for n: "+n);
  }
  

  tableListDataSource.push({key:n,date:date,hour:hour,bv:bv,title:title});
}
// console.log(tableListDataSource);
tableListDataSource = reverseArray(tableListDataSource);

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
    title: 'BV号',
    width: 80,
    dataIndex: 'bv',
    render:(bv)=>{
      return (<a href={"https://www.bilibili.com/"+bv} target="_blank" onClick={(e)=>{e.stopPropagation()}}>{bv}</a>)
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    // width:200,
    render:(title)=>{
      return (<Row><Col md={12}>{title}</Col></Row>)
    }
  },
  
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
    const initDatasrc = this.props.parent.props.initDatasrc;
    this.props.parent.setState({
      dataSource: initDatasrc,
      searchWords: "",
      currentID: 0
    })
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
          <Col xs={24} md={24} align="middle">
            <Title level={2}>字幕库检索</Title>
          </Col>
        </Row>
        <Row style={{"height":"50px"}}>
        <Col xs={0} md={6}></Col>
        <Col xs={24} md={12} align="middle">
          <Input style={{"borderRadius":"50px"}}
          placeholder="单条字幕检索🔍" 
          onChange={(e)=>{this.setState({input:e.target.value})}}
          value={this.state.input}
        ></Input>
        </Col>
        <Col md={6} align="middle">
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
    dataSource: this.props.initDatasrc,
    isModalVisible: false,
    displayBV:"",
    searchWords:"",
    currentID:0
  }
  handleCancel = ()=>{
    this.scrollTop();
    this.setState({isModalVisible:false,currentID:0});
  }
  handleSearch = (searchWords)=>{
    this.setState({searchWords:searchWords});
    let newDatasrc = [];
    for(let data of this.props.initDatasrc){
      let bv = data["bv"];
      let subtitles;
      try{
        subtitles = searchJson[bv]["srt"];
      }catch{
        continue;
      }
      
      
      if(subtitles.toLowerCase().indexOf(searchWords.toLowerCase())!== -1)  newDatasrc.push(data);
    }
    this.setState({dataSource:newDatasrc});
  }
  handleReverse(){
    let newDatasrc = reverseArray(this.state.dataSource);
    this.setState({dataSource:newDatasrc});
  }
  scrollTop = () => {
        let anchorElement = document.getElementById("Table-top");
        anchorElement.scrollIntoView({behavior:'auto'});
  }
  scrollNext = (className) =>{
    let anchorElements = document.getElementsByClassName(className);
    
    if(anchorElements.length === 0) return;
    const i = this.state.currentID;
    anchorElements[i].scrollIntoView({behavior:'smooth'});
    if(i >= anchorElements.length-1){
      this.setState({currentID:0})
    }else{
      this.setState({currentID:i+1});
    }
  }
  scrollPre = (className)=>{
    let anchorElements = document.getElementsByClassName(className);
    
    if(anchorElements.length == 0) return;
    const i = this.state.currentID;
    anchorElements[i].scrollIntoView({behavior:'smooth'});
    if(i <= 0){
      this.setState({currentID:anchorElements.length-1});
    }else{
      this.setState({currentID:i-1});
    }
  }
  render(){
    const {isModalVisible,displayBV,searchWords} = this.state;
    
    let subtitles = [];
    if(displayBV !== ""){
      subtitles = getSubtitles(displayBV);
    }
    return(
      <PageContainer>
        <ToolKits parent={this}/>
        <Row style={{"marginTop":"20px"}}>
          <Col xs={24} md={24}>
          <ProTable
            columns={this.props.initColumns}
            rowKey="key"
            dataSource={this.state.dataSource}
            search={false}
            onRow={(record)=>{
              return {
                onClick: (e)=>{
                  
                  this.setState({
                    isModalVisible:true,
                    displayBV: record["bv"]
                  });
                },
                style:{"cursor":"pointer"},
              }
            }}
          ></ProTable>
          </Col>
        </Row>
        
        <Modal id="modal"
          visible={isModalVisible} 
          maskClosable={true} 
          onCancel={this.handleCancel} 
          footer={null}
          
        >
          
          <Row><Col xs={24} md={24} align="middle"><Title>字幕表</Title></Col></Row>
          <Row><Col><a onClick={()=>this.scrollPre("active-highlight")} 
            
          ><CaretUpFilled/>上一条搜索结果</a></Col></Row>
          <Row><Col><a onClick={()=>this.scrollNext("active-highlight")}><CaretDownFilled/>下一条搜索结果</a></Col></Row>
          <Row>
            <Col xs={3} md={3}>序号</Col>
            <Col xs={10} md={10}>时间</Col>
            <Col xs={11} md={11}>字幕</Col>
          </Row>
          <Row style={{"borderBottom":"2px solid"}}><Text type="secondary">字幕搜索结果会以高亮展示，用按键上下移动吧💃💃💃</Text></Row>
          
          <Row>
          <Col span={24} style={{"height":"500px","overflowY":"scroll"}}>
          {subtitles.map((clipSubtitles,clip)=>{ 
            return (
            <>
            <Row><Col
                  style={{"color":"#9AC8E2","borderBottom":"1px solid"}} id="Table-top"
                ><a target="_blank" href={"https://www.bilibili.com/"+displayBV+"?p="+(clip+1)}>{"切片"+(clip+1)}</a></Col></Row>
            <>{
            clipSubtitles.map((s)=>{
              let srtArr = s.split("|");
              let index = srtArr[0];
              let time = srtArr[1];
              let text = srtArr[2];
              
              const hour = parseInt(time.split("-->")[0].split(":")[0]);
              const min = parseInt(time.split("-->")[0].split(":")[1]);
              const sec = parseInt(time.split("-->")[0].split(":")[2].split(",")[0]);
              const totalMinSec = (hour*3600+60*min+sec)*1000;
              const href = "https://www.bilibili.com/"+displayBV+"?p="+(clip+1)+"&start_progress="+totalMinSec;
              let className='';
              if(text.toLowerCase().indexOf(searchWords.toLowerCase())!== -1)  className='active-highlight';
              return (
              <>
              <Row style={{"borderBottom":"1px dashed"}} className={className}>
                <Col xs={3} md={3} style={{"color":"#B8A6D9"}}>{index}</Col>
                <Col xs={10} md={10}><a target="_blank" href={href}>{time}</a></Col>
                <Col xs={11} md={11} style={{"color":"#E799B0"}}>
                  <Highlighter
                    highlightStyle={{ backgroundColor: highlightColor, padding: 0 }}
                    searchWords={[searchWords]}
                    autoEscape
                    textToHighlight= {text}
                    ></Highlighter>
                  </Col>
                  </Row>
                </>
                  );
              })
            }
            </>
            </>

  )})}
  </Col>
  </Row>
        </Modal>
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
