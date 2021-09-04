import React from 'react'
import { MODE } from '../../utils/constants'
import './styles.scss'

const SelectModePage = ({ onClickSetMode }) => {
   return (
      <div className="select-mode-page-container">
         <div className="title">Select Mode</div>
         <div className="btn-container">
            <button onClick={() => onClickSetMode(MODE.CUSTOM_PLAY)}>Custom Play</button>
            <button onClick={() => onClickSetMode(MODE.PLAY_NOW)}>Play Now</button>
         </div>
      </div>
   )
}

export default SelectModePage
