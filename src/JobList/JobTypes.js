import React, { useEffect, useState } from 'react';
import { Table, Input, DatePicker, Popconfirm, Divider } from 'antd';
import { Form, InputNumber, Typography } from 'antd';
// import {SearchOutlined, FilterOutlined} from "@ant-design/icons";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import './JobList.css';
// import styled from "./JobList.module.css" 
// import swal from "sweetalert";
import { IconButton } from '@mui/material';
// import env from "react-dotenv";

const CustomColor ={
  iconColor: {color:"#f0f0f0"},
  edit:   "rgb(50, 145, 240) ",
  view:   "#f1f8ff",
  viewText:   "#f1f8ff",
  deleteIcon:"#ff4747"
}

const { RangePicker } = DatePicker;

const JobTypes = ({jobsProp}) => {

  const [form] = Form.useForm();
  const [jobs, setJobs] = useState([
    {id:1, jobType:"Full Time"},
    {id:2, jobType:"Part Time"},
    {id:3, jobType:"Remote"}
  ]);
  const [filteredData, setFilteredData] = useState(jobs);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredDate, setFilteredDate] = useState([]);
  const [data, setData] = useState(jobs)

  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      jobType: '',
      ...record,
    });
    setEditingKey(record.key);
  };


  // useEffect(() => {  
  //   fetch(
  //     `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/all`,
  //     // `http://localhost:5000/job/post`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     },
  //     {
  //       mode: "cors",
  //     }
  //   )
  //     .then((response) =>{
  //       if(!(response.status>=200 && response.status<300) ){
  //         throw new Error(response.status);
  //       }  
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setJobs(data);
  //       setFilteredData(data);
  //     })
  //     .catch((err) => {
  //       if(err.Error>400){
  //         swal(
  //           {
  //             title: "Server Down",
  //             icon: "error",
  //           });
  //       }
  //       else if(err.Error>299){
  //         swal({
  //           title: "Server Busy",
  //           icon: "error",
  //         });
  //       }
  //       // else{
  //       //   console.log("fdkmfk" +type(err.Error));
  //       //   swal({
  //       //     title: "Job posted sucessfully!",
  //       //     icon: "success",
  //       // });
  //       // }
  //     });
  // }, [])
  

  const handleSearch = (selectedKeys, confirm) => {
    // confirm();
    // setSearchText(selectedKeys[0]);
    // setFilteredData(

    //   jobs.filter(job => job.title.toLowerCase().includes(selectedKeys[0].toLowerCase()))
    // );
  };

  const handleReset = clearFilters => {
    // clearFilters();
    // setSearchText('');
    // setFilteredData(jobs);
  };

  const handleDateChange = (dates, dateStrings) => {
    // setFilteredDate(dateStrings);
    // setFilteredData(
    //   jobs.filter(
    //     job => moment(job.expireDate).isBetween(moment(dateStrings[0]), moment(dateStrings[1]))
    //   )
    // );
  };
  const handlePostDateChange = (dates, dateStrings) => {
    // setFilteredDate(dateStrings);
    // setFilteredData(
    //   jobs.filter(
    //     job => moment(job.postDate).isBetween(moment(dateStrings[0]), moment(dateStrings[1]))
    //   )
    // );
  };

  const handleViewJob = (record) => {
    // console.log(record);
    // your logic for view job
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteJob = job => {
    setFilteredData(filteredData.filter(j => j !== job));
  };

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
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [    
    {     title: '#',
          dataIndex: 'id', 
          key: 'id'
    },
    {
    title: 'job type',
    dataIndex: 'jobType',
    key: 'jobType',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'operation',
    dataIndex: 'operation',
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
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  }, 
  {
    title: 'Action',
    key: 'action',
    render: (text, record) =>
    (
      <>
      <span >
        {/* <Button onClick={() => handleViewJob(record)}>View</Button> */}
        
        {/* <Link state={{...record }} to="/job/update"> */}
        {/* {editingId === record.id ? ( */}
            {/* <Button onClick={() => handlePostDateChange(record.id)}>Save</Button> */}
          {/* ) : ( */}
            {/* <Button onClick={() => setEditingId(record.id)}>Edit</Button> */}
          {/* )} */}
          {/* <Divider type="vertical" /> */}
          {/* <Button onClick={() => handleDeleteJob(record.id)}>Delete</Button>   */}
          {/* //yahn change kia hey */}
        <IconButton  style={{color: CustomColor.edit}}>
          <FontAwesomeIcon icon={faEdit}/>
        </IconButton>
        {/* </Link> */}
        
        
        <Popconfirm
            title="Are you sure delete this job?"
            onConfirm={() => handleDeleteJob(record)}
            okText="Yes"
            cancelText="No"
          >
          <IconButton >
            <FontAwesomeIcon icon={faTrash} style={{color:CustomColor.deleteIcon}} />
          </IconButton>
        </Popconfirm>
      </span>
      {/* <span>
          {editingId === record.id ? (
            <Button onClick={() => saveChanges(record.id)}>Save</Button>
          ) : (
            <Button onClick={() => setEditingId(record.id)}>Edit</Button>
          )}
          <Divider type="vertical" />
          <Button onClick={() => deleteItem(record.id)}>Delete</Button>
        </span> */}
      
      
    </>
    ),
  },
];

return <Table
   rowKey={(record) => record.uid} 
   columns={columns} 
   dataSource={filteredData} />;
};

export default JobTypes;



      