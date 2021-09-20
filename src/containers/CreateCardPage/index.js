import React from 'react'
import './styles.scss'

const CreateCardPage = ({ onChangeCreatedCardValue, onCreateCard }) => {

   const handleOnKeyDown = (e) => {
      if (e.code === 'Enter') {
         handleCreateCardAndResetInput()
      }
   }

   const handleCreateCardAndResetInput = () => {
      if (document.getElementById('createdCard').value.trim()) {
         onCreateCard()
      }
      document.getElementById('createdCard').value = '';
   }

   return (
      <div>
         <div className="title">Create Your Cards Below!</div>
         <input
            id="createdCard"
            onChange={onChangeCreatedCardValue}
            onKeyDown={handleOnKeyDown}
            placeholder="Enter your card's value here"
         ></input>
         <button onClick={handleCreateCardAndResetInput}>CREATE</button>
      </div>
   )
}

export default CreateCardPage
