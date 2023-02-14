

// Code sahi hey bs es key End Points Nahi hyn

//let locationOptions = ["Karachi", "Lahore", "Islamabad"];
//yay data enter ho ga


// import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";
// import { useEffect, useState } from "react";
// // import swal from 'sweetalert';
// import {
//   faTrash,
//   faUndo,
// } from "@fortawesome/free-solid-svg-icons";
// import swal from "sweetalert";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconButton } from "@mui/material";
// import styled from "./Demo.module.css";
// const EditableCell = ({
//   editing,
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0,
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`,
//             },
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };
// const City = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState([]);
//   const [benefit, setBenefit] = useState("");
//   const [editingKey, setEditingKey] = useState("");

//   useEffect(()=>{

//     const fetchData = ()=>{
//       fetch(
//         `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/benefits/all`
//       )
//       .then( async (response) =>{
//         if(!(response.status>=200 && response.status<300) ){
//           throw new Error(response.status);
//         }  
//         return await response.json()
//       })
//       .then((data) => {
//         data = data.map(d=>{return {...d, key: d.id}})
//         setData(data);
//         // console.log(data);
//       })
//       .catch((err) => {
//         if(err.Error>400){
//           swal(
//             {
//               title: "Server Down",
//               icon: "error",
//             });
//         }
//         else if(err.Error>299){
//           swal({
//             title: "Server Busy",
//             icon: "error",
//           });
//         }
//       });
//     }

//     fetchData();
//   },[])


//   const isEditing = (record) => record.key === editingKey;
//   const edit = (record) => {
//     form.setFieldsValue({
//       Benefit:record.benefitPerks,
//       ...record,
//     });

    

//     setEditingKey(record.key);



//   };
//   const cancel = () => {
//     setEditingKey("");
//   };

//   const save = async (key) => {
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);
      


//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           benefitPerks: row.Benefit,
//           // ...row,
//         });
        
//         console.log(newData);

//         fetch(
//           `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/benefits/update/${key}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({benefitPerks: row.Benefit}),
//           },
    
//           {
//             mode: "cors",
//           }
          
//         )
//           .then((response) =>{
//             // console.log(response)
//             if(!(response.status>=200 && response.status<300) ){
//               throw new Error(response.status);
//             }  
              
//             return response.json()
//           })
//           .then((response) => {
//             setData(newData)
//             setEditingKey("");
//             // setBenefit("");
//           })
//           .catch((err) => {
//             if(err.Error>400){
//               swal(
//                 {
//                   title: "Server Down",
//                   icon: "error",
//                 });
//             }
//             else if(err.Error>299){
//               swal({
//                 title: "Server Busy",
//                 icon: "error",
//               });
//             }
//           });
    
//       } 
     

//     } catch (errInfo) {
//       console.log("Validate Failed:", errInfo);
//     }
//   };
//   //////////////////////////////////////////////////////////////////////
//   const handleChange = () => {
//     setData([...data, setBenefit]);
//   };



//   const addItem = () => { 
//     const requestData = {
//       benefitPerks: benefit,
//     };
    

//     fetch(
//       // `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/job/all`,
//       `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/benefits/add`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       },

//       {
//         mode: "cors",
//       }
      
//     )
//       .then((response) =>{
//         // console.log(response)
//         if(!(response.status>=200 && response.status<300) ){
//           throw new Error(response.status);
//         }  
          
//         return response.json()
//       })
//       .then((response) => {
//         response ={ ...response, key: response.id };
//         setData([...data, response]);
//         setBenefit("");
//       })
//       .catch((err) => {
//         if(err.Error>400){
//           swal(
//             {
//               title: "Server Down",
//               icon: "error",
//             });
//         }
//         else if(err.Error>299){
//           swal({
//             title: "Server Busy",
//             icon: "error",
//           });
//         }
//       });


//   };

//   //////////////////////////////////////////////////////////////////
//   const handleActiceJob = (record) => {
//     // setData(
//     //   data.map((j) => {
//     //     return j === record ? { ...j, active: false } : j;
//     //   })
//     // );
//     fetch(
//       `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/benefits/reactive/${record.id}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       },
//       {
//         mode: "cors",
//       }
//     )
//     .then((response) => {
//       if(!(response.status>=200 && response.status<300) ){
//         throw new Error(response.status);
//       }
//       // setJobs(job.filter(j => j !== job));
//       // setData(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
//       // setJobs(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));

//       // setFilteredData(filteredData.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
//       setData(data.map(j =>{ return (j === record) ?{...j, active:true} : j; }));
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
//     });

//   };

//   const handleDeleteJob = (record) => {

//     fetch(
//       `http://jobserviceelasticservice-env.eba-nivmzfat.ap-south-1.elasticbeanstalk.com/benefits/delete/${record.id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       },
//       {
//         mode: "cors",
//       }
//     )
//     .then((response) => {
//       if(!(response.status>=200 && response.status<300) ){
//         throw new Error(response.status);
//       }
//       // setJobs(job.filter(j => j !== job));
//       // setData(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
//       // setJobs(data.map(j =>{ return (j === job) ?{...j, active:false} : j; }));

//       // setFilteredData(filteredData.map(j =>{ return (j === job) ?{...j, active:false} : j; }));
//       setData(data.map(j =>{ return (j === record) ?{...j, active:false} : j; }));
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
//     });
//   };

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "id",
//       width: "30%",
//       editable: false,
//       sorter: (a, b) => a.id - b.id,
//       defaultSortOrder: "ascend" 
//     },
//     {
//       title: "Benefit",
//       dataIndex: "Benefit",
//       width: "38%",
//       editable: true,
//       render: (text, render)=>(<p>{render.benefitPerks}</p>),
//     },
//     {
//       title: "Action",
//       dataIndex: "Action",
//       render: (_, record) => {
//         // console.log(record);
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link
//               onClick={() => save(record.key)}
//               style={{
//                 marginRight: 8,
//               }}
//             >
//               Save
//             </Typography.Link>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <>
//             <Typography.Link
//               disabled={editingKey !== ""}
//               onClick={() => edit(record)}
//               style={{marginRight:"5px"}}
//             >
//               Edit
//             </Typography.Link>
//             {!record.active ? (



//               <Popconfirm
//                 title="Are you sure to Re-Active this Job?"
//                 onConfirm={() => handleActiceJob(record)}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <IconButton
//                   onClick={handleActiceJob}
//                   className={styled.DeleteBtn}
//                 >
//                   <FontAwesomeIcon 
//                     icon={faUndo}
//                     className={styled.cycle_btn}
//                   />
//                 </IconButton>
//               </Popconfirm>

//             ) : (
//               <Popconfirm 
//                 title="Are you sure De-Active this job?"
//                 onConfirm={() => handleDeleteJob(record)}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <IconButton
//                   onClick={handleDeleteJob}
//                   className={styled.DeleteBtn}
//                 >
//                   <FontAwesomeIcon
//                     icon={faTrash}
//                     className={styled.DeleteIcon}
//                   />
//                 </IconButton>
//               </Popconfirm>
//             )}
//           </>
//         );
//       },
//     },
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === "age" ? "number" : "text",
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     };
//   });
//   return (
//     <>
//       <section className={styled.heading}> City </section>
//       <div className={styled.textbox}>
//         <input
//           className={styled.text}
//           type={styled.textbar}
//           value={benefit}
//           onChange={(e) => setBenefit(e.target.value)}
//         />
//         <button
//           className={styled.button}
//           disabled={benefit === ""}
//           type="text"
//           onClick={addItem}
//         >
//           Add
//         </button>
        
//       </div>
//       <Form form={form} component={false}>
//         <Table
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           bordered
//           dataSource={data}
//           columns={mergedColumns}
//           rowClassName="editable-row"
//           pagination={{
//             onChange: cancel,
//           }}
//         />
//       </Form>
//     </>
//   );
// };
// export default City;
