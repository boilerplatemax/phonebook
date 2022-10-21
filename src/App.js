import React,{ useState, useEffect, useRef } from 'react'
import personService from './services/PersonService'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import './App.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [searchFilters, setSearchFilters] = useState('')
  const [message, setMessage] = useState(null)

  const personInfo = useRef({name:'',number:''})

  useEffect(()=>{
    personService.getAll()
    .then(response=>{
      setPersons(response)
    })
    
  },[])
  const removeHandler=id=>{
    personService.remove(id)
    const filteredPersons=persons.filter(person=>person.id!==id)
    setPersons(filteredPersons)
  }
  const inputInfoHandler=newInfo=>{
    personInfo.current={...personInfo.current, ...newInfo}
  }
  const submitHandler=e=>{
    e.preventDefault()
    const name = personInfo.current.name
    const alreadyHasName = persons.filter(person=>person.name===name).length>0
    if(alreadyHasName){
      alert(`${name} is already added to phonebook`)
      return
    }
    const currentInfo={name:personInfo.current.name, number: personInfo.current.number}
    personService.create(currentInfo)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))

      personInfo.current={name:'',number:''}
      setMessage(
        `${name} was successfully added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setMessage(
        `[ERROR] ${error.response.data.error}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      console.log(error.response.data)
    })
    setPersons([...persons,currentInfo])

    document.getElementById('myForm').reset()
  }
  const filterHandler = e =>{
    const filter = e.target.value
    setSearchFilters(filter)
  }
  const updateHandler = (id,newObj) =>{
    // const indexOfUpdate = persons.findIndex(person=>person.id===id)
    // const updatedPersons=persons
    // setPersons(updatedPersons)

    personService.update(id,newObj)
    personService.getAll()
    .then(response=>{
      setPersons(response)
    })
  }

  const personsToShow = searchFilters===''?persons:persons.filter(person=>(person.name.toLowerCase()).includes(searchFilters.toLowerCase()))
  return (
    <div className='app'>
      <div className='phonebook'>
      <h1 className='title'>My Phonebook</h1>
      <Filter filterHandler={filterHandler}/>
      <Persons personsToShow={personsToShow} removeHandler={removeHandler} updateHandler={updateHandler} inputInfoHandler={inputInfoHandler} submitHandler={submitHandler}/>
      </div>
    </div>
  )

}

export default App

// {
//   "persons": [
//     {
//       "name": "Miles Morales",
//       "number": "212-531-7705",
//       "id": 1
//     },
//     {
//       "name": "Walter White",
//       "number": "505-193-2475",
//       "id": 2
//     },
//     {
//       "name": "Dwight Schrute",
//       "number": "1-800-644-6437",
//       "id": 3
//     },
//     {
//       "name": "Marge Simpson",
//       "number": "409-630-2403",
//       "id": 4
//     }
//   ]
// }