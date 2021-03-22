import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import img from './images/undraw_completed_tasks_vs6q.svg'
const localStorageData = ()=>{
  let list = localStorage.getItem("list")
  if(list){
    return JSON.parse(list)
  }else{
    return []
  }
}
function App() {
  const [name,setName]=useState("")
  const [list,setList] = useState(localStorageData())
  const [editId,setEditId] = useState(null)
  const [isEditing,setIsEditing] = useState(false)
  const [alert,setAlert]=useState({
    show:false, 
    msg:"", 
    type:"" // used as classname
  })
  // add item  
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!name){
      // display alert
      showAlert(true,"danger","please add task")
    }else if(name && isEditing){
      setList(
        
          list.map((item)=>{
            if(item.id === editId){
              return{...item,title:name}
            }
            return item
          })
        
      )
      setIsEditing(false)
      setName("")
      setEditId(null)
      showAlert(true,"success","task changed successfuly")
    }else{
      // if there is value then add it 
      showAlert(true,"success","task added successfuly")
      const newItem = {id:Math.floor(Math.random()*10), title:name }
      setList([...list,newItem])
      setName("")
      
    }
    
  }
  // delete item 
  const deleteItem = (id) =>{
    showAlert(true,"danger",'task removed')
    setList(list.filter((item)=>item.id!==id))
  }
  // if it done
  
  // edit item
  const editItem = (id)=>{
      const specificItem = list.find((item)=>item.id===id)
      setIsEditing(true)
      setEditId(id)
      setName(specificItem.title)
  }
  // clear all items
  const clearItems = ()=>{
    showAlert(true,"danger","taskes removed")
    setList([])
  }
  // show alert function 
  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,type,msg})
  }
  // store data in local storage
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])
  return(
      <main>
        <header>
          <h1 className="header-title">track your tasks <br/> every day</h1>
          <img src={img} alt="header-hmg"/>

        </header>
        <div className="task-tracker-container">
        <form className="task-tracker-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
          <h2>task tracker</h2>
          <div className="form-control">
            <input type="text" placeholder="e.g.shopping" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className="submit-btn" type="submit">{isEditing ? "edit":"submit"}</button>
          </div>
        </form>
        {list.length > 0 &&(
            <div className="task-tracker-list-container">
              <List listItems={list} deleteItem={deleteItem} editItem={editItem} />
              <div className="clear-btn-container">
                <button className="clear-btn" onClick={clearItems}>clear items</button>
              </div>
            </div>
        )
        }
      </div>
      </main>
    )
}

export default App
