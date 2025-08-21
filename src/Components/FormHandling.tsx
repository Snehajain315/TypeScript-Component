import React, { useState } from "react";

interface FormData {
    id: number
    name: string,
    email: string,
    password: string
  // items:[{name: string, email: string, passsword: string}]
}


export default function FormHandling() {

    const [formData, setFormData] = useState<FormData>({id:Date.now() ,name:'', email:'', password:''});
    const [data, setData]= useState<FormData[]>([])


    //const [data, setData]= useState<any[]>([])

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setFormData({
        ...formData,
        [e.target.name]:e.target.value 
      })
    }

    const handleSubmit=(e: React.FormEvent)=>{
       e.preventDefault();
       setData([...data, formData])
       localStorage.setItem('userData', JSON.stringify(data))
       setFormData({id: Date.now(), name:'', email:'', password:''})
       // console.log(formData)
       let user: string | null= localStorage.getItem('userData')
       console.log(user)
    }
     
    const handleDelete=(id: number)=>{
        setData(data.filter((e)=>e.id!== id))
       // localStorage.clear()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Name:
                <input 
                 type="text" 
                 placeholder="Enter Your Name" 
                 name="name" 
                 value={formData.name}
                 onChange={handleChange} 
                 /></label>
                 
                 <label> Email:
                 <input 
                 type="email" 
                 placeholder="Enter Your Email" 
                 name="email" 
                 value={formData.email}
                 onChange={handleChange} 
                 /></label>

                 <label> Password: 
                 <input 
                 type="Password" 
                 placeholder="Enter Your Password" 
                 name="password" 
                 value={formData.password}
                 onChange={handleChange} 
                 /></label>

                <button>Submit</button>
            </form>

            <section>
                 {data.map((e, i)=>(
                  <ul key={i}>
                      <li>Name: {e.name} <span>Email: {e.email}</span> <button onClick={()=>handleDelete(e.id)}>Del</button></li>
                  </ul>
                 ))}
            </section>
          
        </div>
    )
}