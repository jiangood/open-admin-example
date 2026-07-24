import {PlusOutlined} from '@ant-design/icons'
import {Button, Form, Input, InputNumber, Modal, Popconfirm} from 'antd'
import React from 'react'
import {DictUtils, FieldDictSelect, FieldUploadFile, HttpUtils, Page, PermActions, ProTable, ViewImage} from "@jiangood/open-admin";

export default class extends React.Component {

    state = {
        formValues: {},
        formOpen: false
    }

    formRef = React.createRef()
    tableRef = React.createRef()

    handleAdd = () => {
        this.setState({formOpen: true, formValues: {}})
    }

    handleEdit = record => {
        this.setState({formOpen: true, formValues: record})
    }

    onFinish = values => {
        const isNew = !values.id;
        const url = isNew ? 'admin/product/create' : 'admin/product/update';
        HttpUtils.post(url, values).then(rs => {
            this.setState({formOpen: false})
            this.tableRef.current.reload()
        })
    }

    handleDelete = record => {
        HttpUtils.post('admin/product/delete', {id: record.id}).then(rs => {
            this.tableRef.current.reload()
        })
    }

    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(v) {
                return DictUtils.dictLabel('product_status', v) || v
            },
        },
        {
            title: '图片',
            dataIndex: 'image',
            render(v) {
                return v ? <ViewImage value={v}/> : null
            }
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (_, record) => (
                <PermActions>
                    <Button size='small' perm='product:update' onClick={() => this.handleEdit(record)}>编辑</Button>
                    <Popconfirm perm='product:delete' title='是否确定删除商品'
                                onConfirm={() => this.handleDelete(record)}>
                        <Button size='small'>删除</Button>
                    </Popconfirm>
                </PermActions>
            ),
        },
    ]

    render() {
        return <Page title="商品管理" description="管理系统商品" actions={<Button perm='product:create' type='primary' icon={<PlusOutlined/>} onClick={this.handleAdd}>新增</Button>}>
            <ProTable
                actionRef={this.tableRef}
                request={(params) => HttpUtils.get('admin/product/page', params)}
                columns={this.columns}
            >
                <Form.Item label='商品名称' name='name'>
                    <Input/>
                </Form.Item>
                <Form.Item label='状态' name='status'>
                    <FieldDictSelect typeCode='product_status'/>
                </Form.Item>
            </ProTable>

            <Modal title='商品'
                   open={this.state.formOpen}
                   onOk={() => this.formRef.current.submit()}
                   onCancel={() => this.setState({formOpen: false})}
                   destroyOnHidden
            >
                <Form ref={this.formRef} labelCol={{flex: '100px'}}
                      initialValues={this.state.formValues}
                      onFinish={this.onFinish}
                >
                    <Form.Item name='id' noStyle></Form.Item>

                    <Form.Item label='商品名称' name='name' rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='价格' name='price'>
                        <InputNumber style={{width: '100%'}} min={0} precision={2}/>
                    </Form.Item>

                    <Form.Item label='描述' name='description'>
                        <Input.TextArea rows={3}/>
                    </Form.Item>

                    <Form.Item label='状态' name='status'>
                        <FieldDictSelect typeCode='product_status'/>
                    </Form.Item>

                    <Form.Item label='图片' name='image'>
                        <FieldUploadFile accept="image/*" maxCount={1}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Page>
    }
}
