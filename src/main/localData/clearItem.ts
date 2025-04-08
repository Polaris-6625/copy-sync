import fs from 'fs';
import { join } from 'path';
import { app } from 'electron';
import { readDataJSON } from './readAll';

async function clearItem(flag:number) {
    const array:any = await readDataJSON();
    //console.log(array[0].id)
    const a = array.filter((item)=>{
        return item.id != flag;
    })
    //console.log(a)
    try {
        const userDataPath = app.getPath('userData');
        const dataFilePath = join(userDataPath, 'data.json');
        fs.writeFileSync(dataFilePath, JSON.stringify(a))
    } catch(err) {
        console.log(err)
    }
}

export { clearItem };