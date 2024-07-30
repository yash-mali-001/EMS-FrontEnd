import { useEffect, useState } from "react";
import { Container, Table,Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Dashboard = () =>{

    const [employees , setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchEmloyees = async ()=>{
            try{
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();

                if(Array.isArray(data)){
                    setEmployees(data);
                }else{
                    console.error("Unexpected data format: ",data);
                    setEmployees([]);
                }
                
            }
            catch(error){
                console.error("Error fetching employees: ", error.message);
            }
        }
        fetchEmloyees();
    } , [])


    const handleDelete = async (employeeId)=>{

        try{
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`,{
                method:"DELETE",
            });
            if(response.ok){
                setEmployees((prevEmployees)=>{
                    prevEmployees.filter((employee)=> employee.id !== employeeId)
                })
            }else{
                console.error(`Failed to delete employee with ID ${employeeId}`);
            }
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        }catch(error){
            console.error("Error deleting employee",error.message());
        }

    }

    const handleUpdate = async (employeeId)=>{
        navigate(`/employee/${employeeId}`);
    }


    return(
        <div>
            <Container className="mt-5">
                <Row>
                    <Col>
                    <h1 className="text-center">Employees</h1>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Department</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            { employees && employees.length > 0 ?(employees.map((employee)=>(
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Button variant="outline-secondary btn-warning" onClick={()=>handleUpdate(employee.id)}>Update</Button>
                                        <br></br>
                                        <Button variant="outline-dange btn-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))):(
                                <tr>
            <td colSpan="5" className="text-center">No employees found</td></tr>
                            )
                        }
                        </tbody>
                    </Table>
                    </Col>
                </Row>

            </Container>
        </div>
    )   
}
export default Dashboard;