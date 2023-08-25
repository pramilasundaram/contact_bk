import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tables from '../../components/Tables/Tables';
import Alert from 'react-bootstrap/Alert';
import { deletefunction, exporttocsvfunction, usergetfunction } from '../../services/Apis';
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Spiners from '../../components/spiner/Spiners';
import { addData, updateData } from '../../components/Context/ContextProvider';


export default function Home() {
  const nav = useNavigate();
  const [showspin, setShowspin] = useState(true);
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("All")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(0);



  //get users
  const userGet = async (search, gender, sort, page) => {
    const response = await usergetfunction(search, gender, sort, page);
    if (response.status === 200) {
      setdata(response.data.users);
      setPagecount(response.data.pagination.pagecount)      
    } else {
      console.log("error")
    }
  }

  //delete user
  const deleteuser = async (id) => {        
    const response = await deletefunction(id);
    // console.log(response)
    if (response.status === 200) {
      userGet(search, gender, sort, page);
    } else {
      console.log("error in delete")
    }
  }

  const exportuser = async () => {
    const response = await exporttocsvfunction();
    if (response.status === 200) {
      window.open(response.data.url, "blank")
    } else {
      console.log("error")
    }
  }

//pagination
const handleprevious=()=>{
  setPage(()=>{
    if(page===1)
    return page;
    return page-1;
  })
}

const handlenext=()=>{
  setPage(()=>{
    if(page===pagecount)
    return page;
    return page+1;
  })
}

  useEffect(() => {
    userGet(search, gender, sort, page);
    setTimeout(() => {
      setShowspin(false)
    }, 1200)
  }, [search, gender, sort, page])

  const { useradd, setUseradd } = useContext(addData);
  const { updateadd, setUpdateadd } = useContext(updateData);
  return (
    <div>
      {useradd ? <Alert variant="danger" onClose={() => setUseradd("")} dismissible>{useradd.fullname.toUpperCase()} successfully added!!</Alert> : ""}
      {updateadd ? <Alert variant="danger" onClose={() => setUpdateadd("")} dismissible>{updateadd.fullname.toUpperCase()} successfully updated!!</Alert> : ""}
      <div className='container'>
        <Card className='shadow mt-3 p-3' >
          {/*search and add user*/}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className='search col-lg-4'>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value)
                    // console.log(search)
                  }}
                />
                <Button variant="primary">Search</Button>
              </Form>
            </div>

            <div className="add_btn">
              <Button variant="warning" onClick={() => nav("/register")}>Add user</Button>
            </div>
          </div>

          {/*export ,filter,sort*/}
          <div className="drop mt-4 d-flex justify-content-between flex-wrap">
            {/*export-begin*/}
            <div className="csv">
              <Button className="csv_btn" variant="success" onClick={exportuser} >Export To Csv</Button>
            </div>
            {/*export-end*/}

            {/*filter-begin */}
            <div className='filter_gender'>
              <div className="filter">
                <h4>Filter by Gender</h4>
                <div className='gender d-flex justify-content-around' >
                  <Form.Check
                    type={"radio"}
                    label={"All"}
                    name="gender"
                    value="All"
                    onChange={(e) => { setGender(e.target.value) }}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Male"}
                    name="gender"
                    value="male"
                    onChange={(e) => { setGender(e.target.value) }}
                  />
                  <Form.Check
                    type={"radio"}
                    label={"Female"}
                    name="gender"
                    value="female"
                    onChange={(e) => { setGender(e.target.value) }}
                  />
                </div>
              </div>
            </div>
            {/*filter-end*/}

            {/*sort-begin*/}
            <div className='filter_sort'>
              <div className="sort">
                <h4>sort by value</h4>
                <Dropdown className='text-center'>
                  <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                    Sort
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSort("new")} >New</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/*sort-end*/}
          </div>

          {/*table or spinner*/}
          <Card.Body className='text-center'>
            {showspin ? <Spiners /> : <Tables 
            data={data}
            deleteuser={deleteuser} 
            handlenext={handlenext}
            handleprevious={handleprevious}
            page={page}
            pagecount={pagecount}
            setPage={setPage}
            />}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
