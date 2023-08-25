import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify";
import Spiners from '../../components/spiner/Spiners';
import { editfunction, getsingleuserfunction } from '../../services/Apis';
import "./Edit.css";
import { BASE_URL } from '../../services/helper';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import {  updateData } from '../../components/Context/ContextProvider';

export default function Edit(){
  const {id}=useParams();
  // const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MZzUm3JUNZbn2H_D71zNStgWVHcEYvTdMg&usqp=CAU"
 
  const [image, setImage] = useState("");
const [imgdata,setImgdata]=useState("");  
  const [preview, setpreview] = useState("");
  const [showspin, setShowspin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    phonenumber: "",
    fullname: "",
    gender: "",
    location: ""
  });
  const nav=useNavigate();
  const {setUpdateadd}=useContext(updateData);
console.log(form)
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const setprofile = (e) => {
    setImage(e.target.files[0])
  }
  
  
  const user=async(id)=>{
    const response=await getsingleuserfunction(id); 
    console.log(response) 
    if(response.status === 200){
    setForm(response.data);
    setImgdata(response.data.image)
    }
    else{
      console.log("error")
    }
  }
  useEffect(()=>{
    user(id)
  },[id])

  useEffect(() => {
    if (image) {
      setImgdata("")
      setpreview(URL.createObjectURL(image))
    }
 
    setTimeout(() => {
      setShowspin(false)
    }, 1200)
  }, [image])

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, phonenumber, fullname, gender, location } = form;
    if (fullname === "") {
      toast.error("fullname is required")
    } else if (email === "") {
      toast.error("email is required")
    } else if (!email.includes("@")) {
      toast.error("enter valid email")
    } else if (phonenumber === "") {
      toast.error("phonenumber is required")
    } else if (phonenumber.length > 10) {
      toast.error("enter avlid phonenumber")
    } else if (gender === "") {
      toast.error("gender is required")
    
    } else if (location === "") {
      toast.error("location is required")
    }else {
      const data = new FormData();
      data.append("fullname", fullname);
      data.append("email", email);
      data.append("phonenumber", phonenumber);
      data.append("gender", gender);
      data.append("location", location);
      data.append("image", image||imgdata);

      const config = {
        "Content-Type": "multipart/form-data"
      }
      const response = await editfunction(id,data,config);
      console.log(response)
      if(response.status===200){      
        setUpdateadd(response.data)
        nav("/")
      }
       else{
        toast.error("error")
      }
      
    }
  }
  
    return (
      <div>
      { showspin? <Spiners/> :
      <div className='container'>
        <h1 className='text-center mt-1'>Edit the user details </h1>
        <Button variant="warning" onClick={()=>nav("/")}>BACK</Button>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center">
            <img src={image ? preview : `${BASE_URL}/images/${imgdata}`} alt="..." />
          </div>
          <Form onSubmit={handlesubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Full Name" name="fullname" value={form.fullname} onChange={handlechange} />
              </Form.Group>  
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" value={form.email} onChange={handlechange} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="mobile" placeholder="enter phone Number" name="phonenumber" value={form.phonenumber} onChange={handlechange} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>select ur profile</Form.Label>
                <Form.Control type="file" placeholder="image url" name="image" onChange={setprofile} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>select your gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"male"}
                  name="gender"
                  value="male"
                  checked={form.gender==="male"?true:false}
                  onChange={handlechange}
                />
                <Form.Check
                  type={"radio"}
                  label={"female"}
                  name="gender"
                  value="female"
                  checked={form.gender==="female"?true:false}
                  onChange={handlechange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>location</Form.Label>
                <Form.Control type="text" placeholder="location" name="location" value={form.location} onChange={handlechange} />
              </Form.Group>
              </Row>
              <Button variant="primary" type="submit" className='button'>
                Update
              </Button>
            
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>}
      </div>
    )
  }
  
  