import React ,{useState}from 'react'
import FormContainer from '../components/FormContainer'
import { Card ,DropdownButton,Dropdown,Form,Button} from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'
const AddAlert = () => {
    const [trend,setTrend]=useState('Trend Alert');
    const [change,setChange]=useState('Change To');
    const [symbol,setSymbol]=useState('');
    const [target,setTarget]=useState('');
    const [subject,setSubject]=useState('');
    const [note,setNote]=useState('');
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');
    const freeSpace=()=>{
        setTrend('')
        setChange('')
        setSymbol('')
        setTarget('')
        setSubject('')
        setNote('')
    }
  const handleTrendSelect=(e)=>{
    
    setTrend(e)
  }
  const handleChangeSelect=(e)=>{
    
    setChange(e)
  }
  const onSubmit=(e)=>{
    e.preventDefault()
    if( trend !=='Trend Alert' && change !=='Change To'){
        const {data}=axios.post('http://localhost:5000/api/addAlert',{trend,change,symbol,target,subject,note})
   .then(
        setTimeout(()=>{
            setError('')
          
            },4000),
             setMessage(data.message)

      )
      .catch(setTimeout(()=>{
        setError('')
      
        },4000),
         setError('Error! Alert Not Generated'))

    }
    else{
        setTimeout(()=>{
            setError('')
          
            },4000)
             setError("Parameter Missing")
    }
    }

  return (
    <>
    <FormContainer xs='12' md='12' >
    <Card className='my-3 p-5 rounded'>
      <Card.Body>
          <Card.Title as='h3'>
            <strong>Add Alert:</strong>
          </Card.Title>
         {message && <Message variant="success" >{message}</Message>}
         {error && <Message variant="danger" >{error}</Message>}
    <Form onSubmit={onSubmit}>
    <div className='form-inline'>
         <Form.Control type='text' placeholder="symbol" value={symbol}
            onChange={(e) => setSymbol(e.target.value)} required
            ></Form.Control>&nbsp;
         <DropdownButton variant="success" id="dropdown-item-button" title={trend}  onSelect={handleTrendSelect}>
        <Dropdown.Item eventKey='Trend Alert'>Clear</Dropdown.Item>
        <Dropdown.Item eventKey="Add Price Alert">Add Price Alert</Dropdown.Item>
        <Dropdown.Item eventKey="Add Activity Alert">Add Activity Alert</Dropdown.Item>
        <Dropdown.Item eventKey="Add Data Alert">Add Data Alert</Dropdown.Item>
        <Dropdown.Item eventKey="Add Custom RS Alert">Add Custom RS Alert</Dropdown.Item>
      </DropdownButton>&nbsp;&nbsp;
      <DropdownButton variant="success" id="dropdown-item-button" title={change}  onSelect={handleChangeSelect}>
        <Dropdown.Item eventKey='Change To'>Clear</Dropdown.Item>
      <Dropdown.Item eventKey='above'>Above</Dropdown.Item>
      <Dropdown.Item eventKey="blow">Below</Dropdown.Item>
      <Dropdown.Item eventKey="cross">Cross</Dropdown.Item>
      <Dropdown.Item eventKey="equal">Equal</Dropdown.Item>
      <Dropdown.Item eventKey="contains">Contains</Dropdown.Item>
    </DropdownButton>&nbsp;&nbsp;
    <Form.Control type='text'value={target} required
            onChange={(e) => setTarget(e.target.value)}
             placeholder="Target Current Value: -34.21"></Form.Control>
        </div>
        <br/>
        <Form.Group>
    <Form.Label>Subject</Form.Label>
    <Form.Control type='text' value={subject} required
            onChange={(e) => setSubject(e.target.value)}
            ></Form.Control>
    </Form.Group>
    <Form.Group>
    <Form.Label>Note</Form.Label>
     <Form.Control value={note} required
            onChange={(e) => setNote(e.target.value)}
             as="textarea"rows="10"></Form.Control> 
     </Form.Group> <br/>
    
        <Button type='submit' variant='primary'>
          Add Alert
        </Button>
          
     </Form>
            </Card.Body>
    </Card>
   
    </FormContainer>
    </>
  )
}

export default AddAlert