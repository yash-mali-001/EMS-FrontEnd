import { useState } from "react"
import "./PostUser.css"
import { Form , Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const PostUser = ()=>{
    
    const [formData , setFormData] = useState({
        name :"",
        email:"",
        phone:"",
        department:""
    })

    const handleInputChange = (event)=>{
        const {name ,value}=event.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const navigate = useNavigate();
    const handleSumbit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/api/employee",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Employee Created ",data);
            navigate("/")

        }
        catch(error){
            console.log("Error creating employee",error.message);
        }
        console.log(formData);
    }
    
    return(
        <>
        <div className="center-form">
            <h1>Post New Employee</h1>
            <Form onSubmit={handleSumbit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                    type="text"
                    name="department"
                    placeholder="Enter Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">POST</Button>
            </Form>
        </div>
        </>
    )
}
    export default PostUser;
