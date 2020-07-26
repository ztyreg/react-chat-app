import React from "react";
import {Table, Button} from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class RoomTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };

    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <div style={{marginBottom: 16}}>
                    <Button key={"1"} type={"primary"}>&nbsp;&nbsp;Join&nbsp;&nbsp;</Button>
                    <Button key={"2"} style={{marginLeft: 8}}>Create</Button>
                    <Button key={"3"} style={{marginLeft: 8, float: "right"}} danger>&nbsp;Leave&nbsp;</Button>
                    <span style={{marginLeft: 8}}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
            </div>
        );
    }
}

export default RoomTable;
