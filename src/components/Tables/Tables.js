import React from 'react'
import "./Table.css"
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import {BASE_URL} from "../../services/helper"
import { FaEdit,FaTrashAlt } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';
import {useNavigate} from "react-router-dom"
import Paginations from '../pagination/Paginations';
export default function Tables({data,deleteuser,handleprevious, handlenext,page,pagecount,setPage}) {
  const nav=useNavigate();
  return (
    <div className="container">
   <Row>
    <div className='col mt-0 table-responsive'>
    
    <Table  striped bordered hover size="sm" className='table align-middle'>
    <thead className='thead-dark'>
      <tr className='table-dark'>
        <th>s.no</th>
        <th>Full Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Profile</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {data.map((item,index)=>{
     
      return <tr>
      <td>{index+1+ (page-1)*4}</td>
      <td>{item.fullname}</td>
      <td>{item.email}</td>
      <td>{item.phonenumber}</td>
      <td className="profile_div text-center"><img src={`${BASE_URL}/images/${item.image}`} alt="..."/></td>
      <td>
      <Button variant="success" onClick={()=>nav("/profile/"+ item._id)}><GrView/></Button>
    <Button variant="warning" onClick={()=>nav("/edit/"+ item._id)}><FaEdit/></Button>
    <Button variant="danger" onClick={()=>deleteuser(item._id)}><FaTrashAlt/></Button>
      </td>
    </tr> 
    })}    
    </tbody>
  </Table>
  <Paginations
  handlenext={handlenext}
  handleprevious={handleprevious}
  page={page}
  pagecount={pagecount}
  setPage={setPage}
  />
  
  </div>
  </Row>
  </div> 
  )
}
