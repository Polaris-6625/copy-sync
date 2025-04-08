import Versions from './components/Versions'
import icons from './assets/icons.svg'
import CopyBlockItem from './components/CopyBlockItem'
import { BlockData } from './types/block'
import { useEffect, useState } from 'react'
import CopyBlock from './components/CopyBlock'
import './styles/global.css'

function App(): JSX.Element {
  return (
    <div>
      <CopyBlock/>
    </div>
  )
}

export default App