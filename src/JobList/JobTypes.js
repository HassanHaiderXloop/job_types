import React, { useEffect, useState } from 'react';
import { Table, Input, DatePicker, Popconfirm } from 'antd';
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

 
  const [jobs, setJobs] = useState([]);
  const [filteredData, setFilteredData] = useState(jobs);
  const [searchText, setSearchText] = useState('');
  const [filteredDate, setFilteredDate] = useState([]);

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

  const handleDeleteJob = job => {
    // setFilteredData(filteredData.filter(j => j !== job));
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
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span >
        {/* <Button onClick={() => handleViewJob(record)}>View</Button> */}
        <Link state={{ ...record }} to={`/job/view/${record.id}`}>
          <Button  variant='contained' style={{backgroundColor:CustomColor.view, color: CustomColor.edit }}>
            View
          </Button>
        </Link>
        <Link state={{...record }} to="/job/update">
        <IconButton  style={{color: CustomColor.edit}}>
          <FontAwesomeIcon icon={faEdit}/>
        </IconButton>
        </Link>
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
    ),
  },
];

return <Table
   rowKey={(record) => record.uid} 
   columns={columns} 
   dataSource={filteredData} />;
};

export default JobTypes;



      