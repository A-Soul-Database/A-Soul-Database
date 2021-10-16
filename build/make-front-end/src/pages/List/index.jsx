import React from 'react';
import { ReactDOM,findDOMNode } from 'react-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography,Avatar,Row,Col,Checkbox,Collapse, Space,Modal,List, Divider,Button,Option,Select,Input } from 'antd';
import { InfoCircleOutlined, UndoOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons';
import {match,reverseArray,getJsonData} from "../../../public/js/basic.js";
import config from "../../../public/js/basic.js";
import Highlighter from 'react-highlight-words';



const sourceUrl = config.sourceUrl;
console.log(sourceUrl);
const MainUrl = sourceUrl+"/db/2021/main.json"; // main.json文件url,直接从网页拿
const Coverurl = sourceUrl+"/db/2021/Cover.json"; //cover.json文件url,直接从网页拿

const CheckboxGroup = Checkbox.Group;
const Panel = Collapse.Panel;
const { Meta } = Card;
const {Title,Text} = Typography;

const highlightColor = "yellow";


  
  
// }
// let mainJson = [];
let mainJson = getJsonData(MainUrl);


let coverJson = getJsonData(Coverurl);

let InitialMainJson = [];


InitialMainJson = reverseArray(mainJson);//把mainJson反过来，为的是从新到旧展示卡片


const typeMap = {"song":"🎤","chat":"💬","game":"🎮️","birthday":"🎂","theater":"🎬","dance":"💃","vertical":"📱"};
const typeMapStr = {"song":"唱歌","chat":"杂谈","game":"游戏","birthday":"生日会","theater":"小剧场","dance":"跳舞","vertical":"竖屏"};
const avatar = {"A":"./avatars/a.jpg","B":"./avatars/b.jpg","C":"./avatars/c.jpg","D":"./avatars/d.jpg","E":"./avatars/e.jpg","F":"./avatars/f.jpg"};
const staffMap = {"A":"向晚","B":"贝拉","C":"珈乐","D":"嘉然","E":"乃琳","F":"阿草"};
const sceneMap = {"show":"展台","domroom":"客厅","spaceship":"太空船","ktv":"ktv","sky":"天空湖","Eroom":"乃琳房间","Aroom":"向晚房间","Droom":"嘉然房间","rooftop":"天台","beach":"海滩","classroom":"教室","singroom":"录音室","danceroom":"练舞房","filmstudio":"摄影棚","seaworld":"海底世界","broadcastroom":"演播室","YUEHUA":"乐华现场","DouNight":"抖音奇妙夜"};
const skinMap = {"swim":"泳装","official":"官方","sport":"运动服(贝拉)","jk":"jk(贝拉)","chinese":"古风旗袍(嘉然)","group":"团服","birthday":"生日会服装","sleep":"睡衣","christmas":"圣诞服","year":"新年装","DianaOfficialBlue":"蓝色常服(嘉然)","JinLing":"金陵"};
const platformMap = {"B":"B站","D":"抖音"}
const toolMap = {"staff":["出镜人物",staffMap],"skin":["服饰",skinMap],"scene":["出场场景",sceneMap],"platform":["平台",platformMap],"type":["活动",typeMapStr]};


class MyCheckbox extends React.Component{
  constructor(props){
    super(props);
    props.bindRef(this);
  }
  state = {
    checkedList:this.props.valueList,
    indeterminate:false,
    checkAll:true,
  }
  onChange = (list)=>{
    const {valueList} = this.props;
    this.setState({
      checkedList:list,
      indeterminate:!!list.length && list.length < valueList.length,
      checkAll:list.length === valueList.length
    })
  };
  onCheckAllChange = e => {
    const {valueList} = this.props;
    this.setState({
      checkedList:e.target.checked ? valueList : [],
      indeterminate: false,
      checkAll:e.target.checked
    })
  };
  onClear(){
    this.setState({
      checkedList:this.props.valueList,
      indeterminate: false,
      checkAll:true,
    })
  }
  getCheckedList(){
    return this.state.checkedList;
  }
  render(){
    
    const {checkedList,indeterminate,checkAll} = this.state;
    const {title,valueList} = this.props;
    let optionList = [];
    
    for(let v of valueList){
      optionList.push({label:toolMap[title][1][v],value:v});
    }
    
    
    return (
      <>
        <Collapse bordered={false}>
            <Panel header={toolMap[title][0]} extra={
               <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll} onClick={(e)=>{e.stopPropagation()}}>
                全选
              </Checkbox> 
            }>
              <CheckboxGroup options={optionList} value={checkedList} onChange={this.onChange} />
            </Panel>
          
        </Collapse>
      </>
    );
  }
}


class ToolKits extends React.Component{
  constructor(props){
    super(props);
  }
  state = {
    input:"",
    select:"all",
  }
  handleClear = (e) =>{
    this.props.parent.handleClear();
    this.staff.onClear();
    this.scene.onClear();
    this.activity.onClear();
    this.skin.onClear();
    this.platform.onClear();
    this.setState({input:"",select:"all"});
  }
  handleSearch = (e) =>{
    let queryJson = {};
    queryJson["staff"] = this.staff.getCheckedList();
    queryJson["scene"] = this.scene.getCheckedList();
    queryJson["type"] = this.activity.getCheckedList();
    queryJson["skin"] = this.skin.getCheckedList();
    queryJson["platform"] = this.platform.getCheckedList();
    if(this.state.select === "all"){
      queryJson["titlestr"] = this.state.input;
      queryJson["typestr"] = this.state.input;
      queryJson["tagstr"] = this.state.input;
      this.props.parent.setState({
        titleSearchWords:this.state.input,
        typeSearchWords:this.state.input,
        tagSearchWords:this.state.input
      });
      
    }else{
      queryJson[this.state.select] = this.state.input;
      if(this.state.select === "titlestr"){
        this.props.parent.setState({
          titleSearchWords:this.state.input,
          typeSearchWords:"",
          tagSearchWords:"",
        });
      }else if(this.state.select === "typestr"){
        this.props.parent.setState({
          titleSearchWords:"",
          typeSearchWords:this.state.input,
          tagSearchWords:"",
        });
      }else if(this.state.select === "tagstr"){
        this.props.parent.setState({
          titleSearchWords:"",
          typeSearchWords:"",
          tagSearchWords:this.state.input,
        });
      }

    }
    this.props.parent.filter(queryJson);
  }
  render(){
    
    const staffConfig = {
      title: "staff",
      valueList:Object.keys(toolMap["staff"][1]),
    }
    const sceneConfig = {
      title: "scene",
      valueList:Object.keys(toolMap["scene"][1]),
    }
    const activityConfig = {
      title: "type",
      valueList:Object.keys(toolMap["type"][1]),
    }
    const skinConfig = {
      title: "skin",
      valueList:Object.keys(toolMap["skin"][1]),
    }
    const platformConfig = {
      title: "platform",
      valueList:Object.keys(toolMap["platform"][1]),
    }
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
              onClick ={this.props.onReverse}
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
            <Title level={2}>视频库检索</Title>
          </Col>
        </Row>
        <Row gutter={[16,16]}>
        <Col xs={0} md={6}></Col>
        <Col xs={24} md={12} align="middle">
          <Input style={{"borderRadius":"50px"}}
          placeholder="ASDB一下，你就知道😘😘😘" 
          onChange={(e)=>{this.setState({input:e.target.value})}}
          value={this.state.input}
        ></Input>
        </Col>
        <Col xs={24} md={6} align="middle">
        <Select defaultValue="all" 
          onSelect={(e)=>{this.setState({select:e})}}
          value={this.state.select}
          >
          <Select.Option value="all">🥰搜索全部🥰</Select.Option>
          <Select.Option value="titlestr">📰标题📰</Select.Option>
          <Select.Option value="typestr">🏄️🎮️💃🎙活动</Select.Option>
          <Select.Option value="tagstr">🔖关键词🏷️</Select.Option>
        </Select>
        </Col>
        </Row>
        <Row style={{"marginTop":"50px"}}>
        <Col xs={24} md={24}>
        <Collapse>
          <Panel header="高级搜索" forceRender={true}>
          <MyCheckbox {...staffConfig} bindRef={(p)=>this.staff=p}></MyCheckbox>
          <MyCheckbox {...sceneConfig} bindRef={(p)=>this.scene=p}></MyCheckbox>
          <MyCheckbox {...activityConfig} bindRef={(p)=>this.activity=p}></MyCheckbox>
          <MyCheckbox {...skinConfig} bindRef={(p)=>this.skin=p}></MyCheckbox>
          <MyCheckbox {...platformConfig} bindRef={(p)=>this.platform=p}></MyCheckbox>
          </Panel>
        </Collapse>
        </Col>
        </Row>
      </Card>
      
    );
  }
}



class AvatarCard extends React.Component{
  constructor(props){
    super(props);
  }
  state={
    modalVisible:false
  }
  infoClick = () =>{
    this.setState({modalVisible:true});
    console.log(this.props.props);
  }
  infoCancel = () =>{
    this.setState({modalVisible:false});
  }
  imgClick = () =>{
    console.log("click");
    window.open("https://www.bilibili.com/"+this.props.props.bv);
  }

  skinToskinData(){
    let res = [];
    const skin = this.props.props.skin;
    for(let k in skin){
      let pair = {};
      pair.staff = k;
      pair.skins = skin[k];
      res.push(pair);
    }
    return res;
  }

  itemToReactNode = (item,name,bv)=>{
    const {typeSearchWords} = this.props;
    let time = item[1];
    const clip = time.split("-")[0];
    const min = parseInt(time.split("-")[1].split(":")[0]);
    const sec = parseInt(time.split("-")[1].split(":")[1]);
    const totalMinSec = (min*60+sec)*1000;
    const href = "https://www.bilibili.com/"+bv+"?p="+clip+"&start_progress="+totalMinSec;
    
    if(item.length >= 3){
      return (
        <Row style={{"borderBottom":"1px dotted"}}>
          <Col md={4}><a target="_blank" href={href}>{item[1]}</a></Col>
          <Col md={11}>
          {typeMap[name]}
          <Highlighter
            highlightStyle={{ backgroundColor: highlightColor, padding: 0 }}
            searchWords={[typeSearchWords]}
            autoEscape
            textToHighlight={item[0]}
          ></Highlighter>
          {typeMap[name]}</Col>
          <Col md={9}>{item[2].map((staff)=>{
            return(<Avatar src={avatar[staff]}></Avatar>);
          })}</Col>
        </Row>)
    }else{
      return(
      <Row style={{"borderBottom":"1px dotted"}}>
        <Col md={4}><a target="_blank" href={href}>{item[1]}</a></Col>
        <Col md={11}>{typeMap[name]+item[0]+typeMap[name]}
      </Col></Row>);
    }
  }
  
  render(){
    
    const {bv,clip,date,items,liveRoom,platform,scene,skin,staff,tags,time,title,type} = this.props.props;

    
    const {titleSearchWords,typeSearchWords,tagSearchWords} = this.props;
    
    let activityStr = "";
    type.map((a)=>{
      activityStr+=" "+typeMap[a];
    })
    return(
      
      <Card
    cover={
      
      <img
        alt="cover"
        src={coverJson[bv]}
        referrerPolicy='no-referrer'
        onClick={this.imgClick}
        style={
          {
            "cursor":"pointer",
          }
        }
      >
      </img>
      
    }
    actions={[
      <InfoCircleOutlined title="详细信息" key="info" onClick={this.infoClick}/>,
    ]}
  >
    
    <Row>
      <Highlighter
        highlightStyle={{ backgroundColor: highlightColor, padding: 0 }}
        searchWords={[titleSearchWords]}
        autoEscape
        textToHighlight= {title}></Highlighter>
    </Row>
    <Row gutter={[16,16]}>
      <Col xs={24} md={14}>
      <Avatar.Group maxCount={3}>
          {staff.map((s)=>{
            return (<Avatar src={avatar[s]}></Avatar>);
          })}
        </Avatar.Group>
      </Col>
      <Col xs={24} md={10}><div style={{"background":"#6c757d","borderRadius":"4px","display":"inline"}}>{activityStr}</div></Col>
        
    </Row>
    
    <Modal title={title} visible={this.state.modalVisible} maskClosable={true} onCancel={this.infoCancel} footer={null}
    >
        <Row>
          BV号:<a target="_blank" href={"https://www.bilibili.com/"+bv} target="_blank" style={{"color":"#BD7D74"}}>{bv}</a>
        </Row>
        <Row>
          日期:<b style={{"color":"#9AC8E2"}}>{date+" "+time}</b>
        </Row>
        <Row>
          场景:{scene.map((s,index)=>{
            if(index === scene.length-1){
              return(
                <b style={{"color":"#E799B0"}}>{sceneMap[s]}</b>
              )
            }else{
              return(
                <b style={{"color":"#E799B0"}}>{sceneMap[s]}、</b>
              )
            }
            
          })}
        </Row>
        
          <List
            itemLayout="horizontal"
            dataSource={this.skinToskinData()}
            header={
              <Row>
                <Col md={22}><b>出镜人物</b></Col>
                <Col><b align="right">服饰</b></Col>
              </Row>
            }
            renderItem={(item)=>{
              let skinDes = "";
              for(let s of item.skins){
                skinDes += skinMap[s]+" ";
              }
              
              return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={avatar[item.staff]}></Avatar>}
                  description={staffMap[item.staff]}
                ></List.Item.Meta>
              <div>{skinDes}</div>
              </List.Item>
            )}}
          >

          </List>
        <Divider></Divider>
        <Row style={{"height":"20px","borderBottom":"1px solid"}}>
          <Col md={4}><b>时间</b></Col>
          <Col md={11}><b>活动</b></Col>
          <Col ><b>出镜人物</b></Col>
        </Row>
        {items.map((i)=>{
          return i.item.map((it)=>{return this.itemToReactNode(it,i.name,bv)});
        })}
        <Divider></Divider>
        <Row><b>关键词:</b></Row>
        <code >
          {tags.map((tag)=>{
            return (<div style={{"color":"#D63384"}}>
                    <Highlighter
                      highlightStyle={{ backgroundColor: highlightColor, padding: 0 }}
                      searchWords={[tagSearchWords]}
                      autoEscape
                      textToHighlight= {tag}></Highlighter>
            </div>)
          })}
        </code>

    </Modal>
  </Card>
    )
  }
}

class ListPage extends React.Component{
  constructor(props){
    super(props);
  }

  state = {
    displayJson:this.props.initMainJson,
    titleSearchWords:"",
    typeSearchWords:"",
    tagSearchWords:""
  }

  handleReverse = (e) => {
    const {displayJson} = this.state;
    let newJson = reverseArray(displayJson);
    this.setState({displayJson:newJson});
  }

  handleClear = () =>{
    this.setState({
      displayJson:this.props.initMainJson,
      titleSearchWords:"",
      typeSearchWords:"",
      tagSearchWords:""
    });
  }
  
  //查找捏
  filter(queryJson){
    let newJson = [];
    for(let json of this.props.initMainJson){
      if(match(queryJson,json)) newJson.push(json);
    }
    this.setState({displayJson:newJson});
  }

  render(){
    const {displayJson,titleSearchWords,typeSearchWords,tagSearchWords} = this.state; 
    return(
      <PageContainer>
        <Row>
          <Col md={24}>
              <ToolKits onReverse={this.handleReverse} parent={this}/>
          </Col>
        </Row>
        <Row>
          <Text type="secondary">共展示{this.state.displayJson.length}条记录</Text>
        </Row>
        <Row style={{ marginTop: '20px' }} gutter={[16,16]} align="bottom">
          {
            displayJson.map((config)=>{
              return(
              <Col xs={12} md={6}>
                <AvatarCard 
                  props={config} 
                  titleSearchWords={titleSearchWords}
                  typeSearchWords={typeSearchWords}
                  tagSearchWords={tagSearchWords}
                />
              </Col>)
            })
          }
        </Row>
      </PageContainer>
    )
  }
}





export default () => {
    const ListPageProps = {
      initMainJson:InitialMainJson
    }
    return (
      <ListPage {...ListPageProps}/>
    );
};
