import axios from "axios";
import  {useEffect, useState} from "react";
import './Api.css'

// interface Cards{
//     name: string
//     url: any
// }

export default function ApiFetch(){

    let [page, setPage]= useState<number>(1);
    let [cards, setCards]= useState<any[]>([]);
    let [editId, setEditId]= useState<number | null>(null)
    let [editCard, setEditCard]= useState<any>();

    useEffect(()=>{
        async function fetchData(){
        const res= await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
        //console.log(res.data.results)
        setCards(res.data.results);
        }
    fetchData();
    },[page])

    const handleDelete=(id: number)=>{
        setCards(cards.filter((e)=>e.id !== id))
    }

    // const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    //    setEditCard({
         
    //    })
    // }

    const handleEdit=(card: any)=>{
       setEditId(card.id)
       setEditCard({name: card.name, status: card.status, species: card.species})
    }

    const handleSave=(id:number)=>{
        setCards((item)=>(
            item.map((e)=>(e.id===id)? {...e,...editCard}: e)
        ))
        setEditId(null);
    }

    return(
        <div className="api-fetch-container">
            <h1 className="page-title">Rick & Morty Characters</h1>
           <div className="cards-grid">
            {cards.map((item) => (
                <div key={item.id}>
                    {editId===item.id?(
                        <div>
                        <img src={item.image} alt={item.name} className="character-image" />
                         <div className="character-info">
                            <h3 className="character-name">
                            Name:
                            <input
                             type="text"
                             value={editCard?.name}
                             onChange={(e)=>setEditCard({...editCard, name: e.target.value})}
                            />
                            </h3>
                            <h3 className="character-status">
                            Status:
                            <input
                            type="text"
                            value={editCard?.status}
                            onChange={(e)=>setEditCard({...editCard, status: e.target.value})}
                            />
                            </h3>
                            <h3 className="character-status">
                            Species:
                            <input
                            type="text"
                            value={editCard?.species}
                            onChange={(e)=>setEditCard({...editCard, species: e.target.value})}
                            />
                            </h3>
                            <button onClick={()=>handleSave(item.id)}>Save</button>
                          </div>
                        </div>
                      ):(
                    <div  className="character-card">
                        <img src={item.image} alt={item.name} className="character-image" />
                        
                        <div className="character-info">
                            <h3 className="character-name">
                                Name: <span>{item.name}</span>
                            </h3>

                           <h3 className="character-status">
                                Status: <span>{item.status}</span>
                            </h3>

                           <h3 className="character-species">
                            Species:  <span>{item.species}</span>
                           </h3>

                       <div className="card-buttons">
                            <button className="btn btn-view">View Detail</button>
                            <button 
                                className="btn btn-delete" 
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                            <button
                               className="btn btn-delete"
                               onClick={() => handleEdit(item)} 
                            >Edit
                            </button>
                        </div>
                    </div>
                </div>
             )}
            </div>
           ))}
            
             <div className="pagination">
                <button 
                    className="pagination-btn" 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button 
                    className="pagination-btn" 
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
          
          
        </div>
        </div>
    )
}