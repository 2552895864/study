import React from "react";
import { Form, Input, Button, Message } from 'element-react';
import css from '@/css/editcn.less'
import { ChinaPoTickList, UpdateP0tick } from '@/request/api'

export default class EditCN extends React.Component {
  constructor() {
    super();
    this.state = {
      P0DataForm: {
        China: '',
        HongKong: ''
      },
      rules: [
        {
          required: false
        }
      ],
      serverData: []
    };
    this.init();
  }
  init(){
    ChinaPoTickList().then(
        res => {
          if(res.err == 0){
            let data = res.data;
            let p0Data = data.reduce((acc,val)=>{
              return Object.assign({},acc,{ [val.name]: +val.p0ticket});
            },{});
            this.setState({
              P0DataForm: p0Data,
              serverData: p0Data
            });
          }else{
            Message.error(res.data);
          }
        }
    ).catch(err=>{
      Message.error(err.message);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.refs.P0DataForm.validate((valid) => {
      if (valid) {
        this.handleUpdate();
      } else {
        Message.error('校验失败，请检查输入类型');
        return false;
      }
    });
  }
  handleUpdate(){
    let needUpdate = Object.getOwnPropertyNames(this.state.P0DataForm).reduce((acc,k)=>{
      if(this.state.P0DataForm[k] !== this.state.serverData[k]){
        acc.push({
          name: k,
          p0: this.state.P0DataForm[k]
        });
      }
      return acc;
    },[]);
    let promises = [];
    needUpdate.forEach(ele=>{
      promises.push(UpdateP0tick({
        p0: ele.p0,
        name: ele.name
      }).then(result=>{
        if(result.err == 0){
          Message({
            message: result.data,
            type: 'success'
          });
        }else{
          Message.error(result.data);
        }
      }));
    });
    Promise.all(promises).then(()=>{
      this.init();
    }).catch(err=>{
      Message.error(err.message);
    });
  }
  handleReset(e) {
    e.preventDefault();
    let p0dataForm = Object.getOwnPropertyNames(this.state.P0DataForm).reduce((acc,val)=>{
      return Object.assign({},acc,{ [val]: '' });
    },{});
    this.setState({
      P0DataForm: Object.assign({}, this.state.P0DataForm, p0dataForm)
    });
  }
  onChange(key, value) {
    this.setState({
      P0DataForm: Object.assign({}, this.state.P0DataForm, { [key]: +value })
    });
  }
  render() {
    return (
      <div className={css.container}>
        <h1 className={css.header}>SEPHORA P0 Ticket(CN)</h1>
        <Form ref="P0DataForm" model={this.state.P0DataForm} labelWidth="100px" labelPosition="top" className={[css["bg-gray"],css["P0-data-form"]].join(' ')}>
          <Form.Item label="China" prop="China" rules={this.state.rules}>
            <Input type="number" value={this.state.P0DataForm.China} onChange={this.onChange.bind(this, 'China')} autoComplete="off" />
          </Form.Item>
          <Form.Item label="HongKong" prop="HongKong" rules={this.state.rules}>
            <Input type="number" value={this.state.P0DataForm.HongKong} onChange={this.onChange.bind(this, 'HongKong')} autoComplete="off" />
          </Form.Item>
          <Form.Item className={css["mt-1"]}>
            <Button type="success" onClick={this.handleSubmit.bind(this)} className={css["mx-2"]}>提交</Button>
            <Button onClick={this.handleReset.bind(this)} className={[css["mx-2"],css["btn-black"]].join(" ")}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}