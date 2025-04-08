import fs from "fs";
import { join } from "path";
import { app } from 'electron';
import { readDataJSON } from "./readAll";

async function writeDataJSON(data: any, fromInternalCopy: boolean = false): Promise<void> {
    // 如果是应用内复制，直接返回
    if (fromInternalCopy) {
        return;
    }

    let array:Array<any> = await readDataJSON();
    let result = 0;
    array.map((item)=>{
        result = Math.max(result,item.id);
    })
    array.unshift({
        id: result + 1,
        value: data,
        type: 'TEXT'
    })
    try {
        const userDataPath = app.getPath('userData');
        const dataFilePath = join(userDataPath, 'data.json');
        fs.writeFileSync(dataFilePath, JSON.stringify(array))
    } catch(err) {
        console.log(err)
    }
}

export { writeDataJSON };