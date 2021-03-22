import React,{useState} from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({listItems,deleteItem,editItem}) => {

  return(
      <div className="task-tracker-list">
        {listItems.map((item)=>{
          const{id,title}=item
          return(
            <div className="task-tracker-item">
              <p className="title" >{title}</p>
              <div className="btn-container">
                <button className="edit" onClick={()=>editItem(id)}>
                  <FaEdit/>
                </button>
                <button className="delete" onClick={()=>deleteItem(id)}>
                  <FaTrash/>
                </button>
              </div>
            </div>
          )
        })}
      </div>
  )
}

export default List
