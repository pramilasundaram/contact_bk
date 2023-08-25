import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from "react-toastify";
import Spiners from '../../components/spiner/Spiners';
import { registerfunction } from '../../services/Apis';
import "./Register.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../components/Context/ContextProvider';

export default function Register(){

  const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0MZzUm3JUNZbn2H_D71zNStgWVHcEYvTdMg&usqp=CAU"
 
  const [image, setImage] = useState("");

  const [preview, setpreview] = useState("");
  const [showspin, setShowspin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    phonenumber: "",
    fullname: "",
    gender: "",
    location: ""
  });
  const Navigate=useNavigate();
  const {setUseradd}=useContext(addData);

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const setprofile = (e) => {
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
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
    } else if (phonenumber.length < 10) {
      toast.error("enter valid phonenumber")
    } else if (gender === "") {
      toast.error("gender is required")
    } else if (image === "") {
      toast.error("image is required")
    } else if (location === "") {
      toast.error("location is required")
    }else {
      const data = new FormData();
      data.append("fullname", fullname);
      data.append("email", email);
      data.append("phonenumber", phonenumber);
      data.append("gender", gender);
      data.append("location", location);
      data.append("image", image);

      const config = {
        "Content-Type": "multipart/form-data"
      }
      const response = await registerfunction(data, config);
      console.log(response)
      if(response.status===200){
        setForm({...form,
          email: "",
          phonenumber: "",
          fullname: "",
          gender: "",
          location: ""
        })
        setImage("");
        setUseradd(response.data)
        Navigate("/")
      }
      else{
        toast.error(response.error)
      }
      
    }
  }
  
    return (
      <div>
      { showspin? <Spiners/> :
      <div className='container'>
        <h1 className='text-center mt-1'>Create user </h1>
        <Card className='shadow mt-3 p-3'>
          <div className="profile_div text-center">
            <img src={preview ? preview : image1} alt="..." />
          </div>
          <Form onSubmit={handlesubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Full Name" name="fullname" value={form.fullname} onChange={handlechange} />
              </Form.Group>
  
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" value={form.email} onChange={handlechange} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formphonenumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="mobile" placeholder="enter phone Number" name="phonenumber" value={form.phonenumber} onChange={handlechange} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>select ur profile</Form.Label>
                <Form.Control type="file" placeholder="image url" name="image" value={form.image} onChange={setprofile} />
              </Form.Group>
  
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>select your gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"male"}
                  name="gender"
                  value="male"
                  onChange={handlechange}
                />
                <Form.Check
                  type={"radio"}
                  label={"female"}
                  name="gender"
                  value="female"
                  onChange={handlechange}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Label>location</Form.Label>
                <Form.Control type="text" placeholder="location" name="location" value={form.location} onChange={handlechange} />
              </Form.Group>
              </Row>
              <Button variant="primary" type="submit" className='button'>
                Submit
              </Button>
            
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div>}
      </div>
    )
  }
  
  