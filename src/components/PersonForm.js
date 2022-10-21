const PersonForm=({inputInfoHandler})=>{
    return(
      <tr className='persons-row'>
        <td>
          <input
          placeholder='name'
          onChange={e=>inputInfoHandler({name:e.target.value})}
          className='personForm-input'/>
        </td>
        <td>
          <input
          placeholder='number'
          onChange={e=>inputInfoHandler({number:e.target.value})}
          className='personForm-input'/>
        </td>
        <td className='button-group'>
          <button
            type="submit"
            className='btn btn-primary'
            >
            Add
            </button>
        </td>
      
      </tr>
    )
  }

export default PersonForm