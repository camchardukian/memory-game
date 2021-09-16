import React from 'react'
import { MODE } from '../../utils/constants'
import './styles.scss'

const SelectModePage = ({ onClickSetMode }) => {
   return (
      <div className="select-mode-page-container">
         <div className="title">Select Mode</div>
         <div className="btn-container">
            <button
               onClick={() =>
                  onClickSetMode({ mode: MODE.CUSTOM_PLAY, shouldResetCardsArray: false })
               }
            >
               Custom Play
            </button>
            <button
               onClick={() =>
                  onClickSetMode({ mode: MODE.PLAY_NOW, shouldResetCardsArray: true })
               }
            >
               Play Now
            </button>
         </div>
      </div>
   )
}

export default SelectModePage
