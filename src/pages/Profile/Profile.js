import React,{useEffect,useState} from 'react';
import {BASE_URL} from "../../services/helper";
import {useNavigate} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import "./Profile.css";
import Spiners from '../../components/spiner/Spiners';
import { useParams } from 'react-router-dom';
import { getsingleuserfunction } from '../../services/Apis';
import moment from "moment"

export default function Profile() {
  const nav=useNavigate();
  const[showspin,setShowspin]=useState(true);
  const [data,setdata]=useState([]);
  const {id}=useParams();
  
  const user=async(id)=>{
    const response=await getsingleuserfunction(id); 
    console.log(response) 
    if(response.status === 200){
    setdata(response.data);
    }
    else{
      console.log("error")
    }
  }
useEffect(()=>{
  user(id);
  setTimeout(()=>{
    setShowspin(false)
  },1200)
},[id])
  return (
    <div>
    {showspin?<Spiners/>:<div className='container'>
    <div className='heading'>
      <h1 className='text-center mt-1'>profile</h1>
      <Button variant="warning" onClick={()=>nav("/")}>BACK</Button>
      </div>
      
      
    <div>
      <Card className='shadow mt-3 p-3' >
      <div className="profile_div text-center">
      <img src={`${BASE_URL}/images/${data.image}`} alt="..." />
    </div>
      <Card.Body className='text-center'>
        <Card.Title>{data.fullname}</Card.Title>       
      </Card.Body>
      <ListGroup className="list-group-flush text-center">
        <ListGroup.Item><h6 style={{display:"inline-block"}}>EMAIL:&nbsp;</h6>{data.email}</ListGroup.Item>
        <ListGroup.Item><h6 style={{display:"inline-block"}}>PHONENUMBER:&nbsp;</h6>{data.phonenumber}</ListGroup.Item>
        <ListGroup.Item><h6 style={{display:"inline-block"}}>GENDER:&nbsp;</h6>{data.gender}</ListGroup.Item>
        <ListGroup.Item><h6 style={{display:"inline-block"}}>LOCATION:&nbsp;</h6>{data.location}</ListGroup.Item>
        <ListGroup.Item><h6 style={{display:"inline-block"}}>DATE CREATED:&nbsp;</h6>{moment(data.dateCreated).format("DD-MM-YY:hh.mm.ss")}</ListGroup.Item>
        <ListGroup.Item><h6 style={{display:"inline-block"}}>DATE UPDATED:&nbsp;</h6>{moment(data.dateUpdated).format("DD-MM-YY:hh.mm.ss")}</ListGroup.Item>
      </ListGroup>
           </Card>
      </div>
    </div>} 
    
    </div>
  )
}
