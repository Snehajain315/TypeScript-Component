import React, { useEffect, useState } from "react";
import { TextField,Button, CardContent, Typography, CardActions} from '@mui/material'
import {Card} from "@mui/material";

interface FormData {
    id: number
    name: string,
    email: string,
    password: string
  // items:[{name: string, email: string, passsword: string}]
}


export default function FormHandling() {

    const [formData, setFormData] = useState<FormData>({id:Date.now() ,name:'', email:'', password:''});
    const [data, setData]= useState<FormData[]>( [])

    
    useEffect(()=>{
      const storedData= localStorage.getItem('userData')
      if(storedData){
        setData(JSON.parse(storedData))
      }
    },[])


    useEffect(()=>{
       localStorage.setItem('userData', JSON.stringify(data))
    },[data])


    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value 
      })
    }

    const handleSubmit=(e: React.FormEvent)=>{
       e.preventDefault();
       setData([...data, formData])
       setFormData({id: Date.now(), name:'', email:'', password:''})
       // console.log(formData)
    }
    


    const handleDelete=(id: number)=>{
      const item= data.filter((e)=>e.id!== id)
      setData(item);
      const updatedItem= localStorage.removeItem('item')
      localStorage.setItem('userData', JSON.stringify(updatedItem))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <TextField 
                 label= "Name"
                 type="text" 
                 placeholder="Enter Your Name" 
                 name="name" 
                 value={formData.name}
                 onChange={handleChange} 
                 margin="normal"
                 />
                 
                <TextField
                 label="Email"
                 type="email" 
                 placeholder="Enter Your Email" 
                 name="email" 
                 value={formData.email}
                 onChange={handleChange} 
                 margin="normal"
                 />

                
                <TextField
                 label="Password"
                 type="Password" 
                 placeholder="Enter Your Password" 
                 name="password" 
                 value={formData.password}
                 onChange={handleChange} 
                 margin="normal"
                 />

                <Button type='submit' variant="contained"
                 style={{padding:"10px", margin:"18px"}}
                >Submit</Button>
            </form>

            <section style={{display:"flex", columnGap:"10px", margin:"10px"}}>
                 {data.map((e, i)=>(
                <div>
                  <Card sx={{maxWidth: 300}} key={i}  style={{border:"1px solid black"}}>
                     <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e.name}
                      </Typography>
                      <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {e.email}
                      </Typography>
                     </CardContent>
                     <CardActions>
                      <Button size="small" variant="contained" onClick={()=>handleDelete(e.id)}>Delete</Button>
                     </CardActions>
                  </Card>
                  </div>
                  // <ul key={i}>
                  //     <li>Name: {e.name} <span>Email: {e.email}</span> <button onClick={()=>handleDelete(e.id)}>Del</button></li>
                  // </ul>
                 ))}
            </section>
          
        </div>
    )
}