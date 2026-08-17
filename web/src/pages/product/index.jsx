import {PlusOutlined} from '@ant-design/icons'
import {Form, Input, InputNumber} from 'antd'
import React from 'react'
import {DictUtils, FieldDictSelect, FieldUploadFile, FormModal, HttpClient, Page, PermActions, ProTable, ViewImage} from "@jiangood/open-admin";

export default class extends React.Component {

    state = {}

    modalRef = React.createRef()
    tableRef = React.createRef()

    handleAdd = () => {
        this.modalRef.current.open({})
    }

    handleEdit = record => {
        this.modalRef.current.open(record)
    }

    onFinish = async values => {
        const isNew = !values.id;
        const url = isNew ? 'admin/product/create' : 'admin/product/update';
        await HttpClient.post(url, values)
        this.tableRef.current.reload()
    }

    handleDelete = record => {
        HttpClient.post('admin/product/delete', {id: record.id}).then(rs => {
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
                <PermActions actions={[
                    {label: '编辑', perm: 'product:update', onClick: () => this.handleEdit(record)},
                    {label: '删除', perm: 'product:delete', danger: true, confirm: '是否确定删除商品', onClick: () => this.handleDelete(record)},
                ]}/>
            ),
        },
    ]

    render() {
        return <Page title="商品管理" description="管理系统商品">
            <ProTable
                actionRef={this.tableRef}
                request={(params) => HttpClient.get('admin/product/page', params)}
                columns={this.columns}
                toolBarRender={() => (
                    <PermActions actions={[
                        {label: '新增', perm: 'product:create', type: 'primary', icon: <PlusOutlined/>, onClick: this.handleAdd}
                    ]}/>
                )}
                searchFormRender={() => (
                    <>
                        <Form.Item label='商品名称' name='name'>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='状态' name='status'>
                            <FieldDictSelect typeCode='product_status'/>
                        </Form.Item>
                    </>
                )}
            />

            <FormModal ref={this.modalRef} title='商品' onFinish={this.onFinish}>

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
            </FormModal>
        </Page>
    }
}
