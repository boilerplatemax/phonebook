//import edit state, when editstate ===true display inputs instead of name and number
//inputs have place holders
//pass input vals to update handler as an object
//in app.js updatehandler
import React from "react"
import Person from "./Person"
import PersonForm from "./PersonForm"

const Persons=({personsToShow, removeHandler, updateHandler, submitHandler, inputInfoHandler})=>{
  
    return(
      <form onSubmit={e=>submitHandler(e)}  id='myForm' className='personform__form'>
      <table className='persons-table'>
        <tr className='persons-header'>
          <th className='persons-name'>
            Name
          </th>
          <th className='persons-number'>
            Number
          </th>
          <th></th>

        </tr>
        <tbody>
        <PersonForm submitHandler={submitHandler} inputInfoHandler={inputInfoHandler}/>
      {
        personsToShow.length>=0?
        personsToShow.map((person)=>{return(
          
        <Person key={person.name} updateHandler={updateHandler} removeHandler={removeHandler} person={person}/>
  
        )
      }):null
      }
      </tbody>
    </table>
    </form>
    )
  }

  export default Persons