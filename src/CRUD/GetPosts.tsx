import  {useState, useEffect} from 'react'
import axios from 'axios';
import AddPosts from './AddPosts';


export default function GetPosts(){

    //const [page, setPage]= useState<number>(1)
    const [posts, setPosts]= useState<any[]>([]);
    const [editId, setEditId]= useState<number | null>(null);
    const [editPost, setEditPost]= useState<any>({title:'', body:''})

    useEffect(()=>{
        async function fetch(){
          const res= await axios.get(`https://jsonplaceholder.typicode.com/posts`)
          setPosts(res.data);
        }
        fetch();
    },[])

    const handleDelete=async(id:number)=>{
       const delData= await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
       console.log(delData.data)
       setPosts(posts.filter((e)=>e.id!== id))
       //console.log(id)
    }

    const handleUpdate =async(post:any)=>{  
        setEditId(post.id)
        setEditPost({title:post.title, body: post.body})
    }

    const handleSave= async(id:number)=>{
        const editData= await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, editPost)
        console.log(editData)

        setPosts((prev)=>(
          prev.map((e)=>(e.id===id) ? {...posts, ...editPost} : e)
        ))
        setEditId(null)
    }

    return(
        <div>
          <AddPosts />
          <div>
          {posts.map((post)=>(
           <ul key={post.id} 
            style={{backgroundColor: "white", margin:"10px"}}>
             
              {editId===post.id?(
              <div>
              <input type="text" value={editPost.title} onChange={(e)=>setEditPost({...editPost,title: e.target.value})} />
              <input type="text" value={editPost.body} onChange={(e)=>setEditPost({...editPost, body: e.target.value})} />
              <button onClick={()=>handleSave(post.id)}>Save</button>
              </div>
              ):(
                <div>
                <li> <u>Title:</u> {post.title} <br/> <u>Desc:</u> {post.body}</li>
                <button onClick={()=>handleDelete(post.id)}>Del</button>
                <button onClick={()=>handleUpdate(post)}>Edit</button>
                </div>
              )}
            </ul>
          ))}
          </div>
        </div>
    )
}