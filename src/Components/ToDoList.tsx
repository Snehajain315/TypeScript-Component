import React, { useState } from "react";

interface ToDo{
    id:number,
    text:string,
    isCompleted: boolean
}

export default function ToDoList(){

    const [toDos, setToDos]= useState<ToDo[]>([])
    const [tasks, setTasks]= useState<string>("")
    console.log(tasks)

    const addToDo=(e: React.FormEvent)=>{
     e.preventDefault();
     if(tasks.trim() ==="") return;

     const newToDo: ToDo= {
        id: Date.now(),
        text: tasks,
        isCompleted: false
     }
     setToDos([...toDos, newToDo])
     setTasks("");
    }
 
    const DeleteToDo=(id: number)=>{
      setToDos(toDos.filter((e)=>e.id !== id))
    }

    return(
        <div>
           <form>
            <input type="text" placeholder="Enter task here" onChange={(e)=>setTasks(e.target.value)}/>
            <button onClick={addToDo}>Add</button>
           </form>

            <section>
                {toDos.map((e)=>(
                    <div key={e.id}>
                        <p>{e.text}</p>
                        {/* <button >Edit</button> */}
                        <button onClick={()=>DeleteToDo(e.id)}>Del</button>
                    </div>
                ))}
            </section>

        </div>
    )
}