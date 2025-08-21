import axios from "axios";
import React, { useState } from "react";

interface Post{
    title: string,
    body: string
}

export default function AddPosts(){

    const [newPost, setNewPost]= useState<Post>({title:'', body:''})
    const [data, setData]= useState<any[]>([])


    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();
        try{
        const addData= await axios.post("https://jsonplaceholder.typicode.com/posts",newPost)
        console.log(addData.data)
        setData([...data, addData.data ])
       }catch(err: any){
         console.log(err.message)
       }

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Title...' name='title' onChange={handleChange}/>
            <input type="text" placeholder='Enter Description...' name='body' onChange={handleChange}/>
            <button>Add Post</button>
            </form> 
            {data.map((e)=>(
                <ul key={e.id}>
                    <li>Title: {e.title} <br /> Desc: {e.body}</li>
                </ul>
            ))}
        </div>
    )
}