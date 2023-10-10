import fs from 'fs';
import { readDataJSON } from './readAll';

async function clearItem(flag:number) {
    const array:any = await readDataJSON();
    //console.log(array[0].id)
    const a = array.filter((item)=>{
        return item.id != flag;
    })
    //console.log(a)
    try {
        fs.writeFileSync("/Users/liuyuyang/Desktop/project/copy-mate/src/main/localData/data.json",JSON.stringify(a))
    } catch(err) {
        console.log(err)
    }
}

export { clearItem };