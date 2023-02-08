import { Form, InputNumber, Popconfirm, Table, Typography , Input} from 'antd';
import { useState } from 'react';
import { faTrash, faEdit, faClone, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import styled from "./Demo.module.css";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const Demo = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [benefit, setBenefit] = useState('');
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  }
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      }
      else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
//////////////////////////////////////////////////////////////////////
  const handleChange =()=>{
    setData([...data,setBenefit])
  }
  const addItem = () => {
    const benefitObj = {
      key: data.length+1,
      id: data.length+1,
      Benefit: benefit,
      active:""
    };
    setData([...data, benefitObj]);
    setBenefit('');
  };
  //////////////////////////////////////////////////////////////////
  const handleDeleteJob = record => {
    setData(data.map(j =>{ return (j=== record) ?{...j, active:true} : j; }));
    // setJobs(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
    // fetch(
    //   `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/delete/${job.id}`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   },
    //   {
    //     mode: "cors",
    //   }
    // )
      // .then((response) => {
      //   if(!(response.status>=200 && response.status<300) ){
      //     throw new Error(response.status);
      //   }
      //   // setJobs(job.filter(j => j !== job));
      //   setData(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
      //   setJobs(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
      // })
      // .catch((err) => {
      //   if(err.Error>400){
      //     swal(
      //       {
      //         title: "Server Down",
      //         icon: "error",
      //       });
      //   }
      //   else if(err.Error>299){
      //     swal({
      //       title: "Server Busy",
      //       icon: "error",
      //     });
      //   }
      // });
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      width: '30%',
      editable: false,
    },
    {
      title: 'Benefit',
      dataIndex: 'Benefit',
      width: '38%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
        <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
            <Popconfirm
              title="Are you sure delete this job?"
              onConfirm={() => handleDeleteJob(record)}
              okText="Yes"
              cancelText="No"
            >
            <IconButton onClick={handleDeleteJob} disabled={record.active} className={styled.DeleteBtn} >
            <FontAwesomeIcon icon={faTrash} className={styled.DeleteIcon} />
           </IconButton>
          </Popconfirm>
        </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
    <section className={styled.heading}  > Benefits </section>
    <div className={styled.textbox}>
        <input className={styled.text} type={styled.textbar} value={benefit} onChange={e => setBenefit(e.target.value)}/>
        <button className={styled.button}  disabled={benefit === ''} type="text" onClick={addItem}>Add</button>
    </div>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        // dataSource={data}.map((entry,i)=>{ return (
        //   {
        //     id: i+1,
        //     Benefit:entry,
        //     active: entry
        //   }
        //    )})}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    </>
  );
};
export default Demo;