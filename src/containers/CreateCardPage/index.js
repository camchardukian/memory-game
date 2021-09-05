import React from 'react'
import './styles.scss'

const CreateCardPage = ({ onChangeCreatedCardValue, onCreateCard }) => {
   const handleCreateCardAndResetInput = () => {
      onCreateCard()
      document.getElementById('createdCard').value = ''
   }
   return (
      <div>
         <div className="title">Create Card!</div>
         <input
            id="createdCard"
            onChange={onChangeCreatedCardValue}
            placeholder="enter your card's value here"
         ></input>
         <button onClick={handleCreateCardAndResetInput}>CREATE</button>
      </div>
   )
}

export default CreateCardPage
