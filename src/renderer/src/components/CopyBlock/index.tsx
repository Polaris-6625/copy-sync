import CopyBlockItem from '../CopyBlockItem'
import { BlockData } from '../../types/block'
import { useEffect, useState } from 'react'

function CopyBlock(): JSX.Element {
  const [array,setArray] = useState<Array<BlockData>>([
    {
        "id": 0,
        "value": "",
        "type": "TEXT"
    }
])
useEffect(() => {
  (window as any).read.getArray((_event, value) => {
    setArray(value)
  })
})
  return (
    <div>
      {
        array.map((item)=>{
         return (
            <>
              <CopyBlockItem data={item}/>
            </>
         )
        })
      }
    </div>
  )
}

export default CopyBlock
