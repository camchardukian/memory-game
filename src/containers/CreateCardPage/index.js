import React, { useState, useEffect } from 'react'
import { CARD_TYPES } from '../../utils/constants'
import './styles.scss'

const CreateCardPage = ({
   onChangeCreatedTextCardValue,
   onChangeCreatedImageCardValue,
   onCreateCard,
}) => {
   const [selectedImage, setSelectedImage] = useState('')
   const [previewImageSrc, setPreviewImageSrc] = useState('')
   const [typeOfCard, setTypeOfCard] = useState(CARD_TYPES.TEXT)

   useEffect(() => {
      if (selectedImage && !previewImageSrc) {
         const reader = new FileReader()
         reader.addEventListener('load', function () {
            setPreviewImageSrc(this.result)
            onChangeCreatedImageCardValue(this.result)
         })
         reader.readAsDataURL(selectedImage)
      }
   }, [onChangeCreatedImageCardValue, previewImageSrc, selectedImage])

   const handleChangeCardType = (e) => {
      setTypeOfCard(e.target.value)
   }

   const handleOnKeyDown = (e) => {
      if (e.code === 'Enter') {
         handleCreateTextCard()
      }
   }

   const handleCreateTextCard = () => {
      if (document.getElementById('createdCard').value.trim()) {
         onCreateCard()
      }
      document.getElementById('createdCard').value = ''
   }

   const handleCreateImageCard = () => {
      if (selectedImage) {
         onCreateCard()
         setSelectedImage('')
         setPreviewImageSrc('')
      }
   }

   const handleChangeImageInput = (e) => {
      setSelectedImage(e.target.files[0])
      setPreviewImageSrc('')
   }

   return (
      <div>
         <div className="title">Create Your Cards Below!</div>
         <label id="cardType" htmlFor="cardType">
            Card type:
         </label>
         <select onChange={handleChangeCardType} name="cardType">
            {Object.keys(CARD_TYPES).map((item) => {
               return (
                  <option key={CARD_TYPES[item]} value={CARD_TYPES[item]}>
                     {CARD_TYPES[item]}
                  </option>
               )
            })}
         </select>
         {typeOfCard === CARD_TYPES.TEXT ? (
            <div className="create-text-card-container">
               <input
                  id="createdCard"
                  onChange={onChangeCreatedTextCardValue}
                  onKeyDown={handleOnKeyDown}
                  placeholder="Enter your card's value here"
               ></input>
               <button onClick={handleCreateTextCard}>Create Text Card</button>
            </div>
         ) : (
            <div className="create-image-card-container">
               <input
                  id="imageInput"
                  type="file"
                  onChange={handleChangeImageInput}
                  accept="image/*"
               ></input>
               <div className="image-preview-container">
                  <img
                     className={`${!selectedImage && 'hidden'} image-preview-image`}
                     src={previewImageSrc}
                     alt="preview"
                  />
                  <div className={`${selectedImage && 'hidden'}`}>Image Preview</div>
               </div>
               <button onClick={handleCreateImageCard}>Create Image Card</button>
            </div>
         )}
      </div>
   )
}

export default CreateCardPage
