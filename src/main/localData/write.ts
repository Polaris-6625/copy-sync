import fs from "fs";
import { readDataJSON } from "./readAll";

async function writeDataJSON(data: any): Promise<void> {
    let array:Array<any> = await readDataJSON();
    let result = 0;
    array.map((item)=>{
        result = Math.max(result,item.id);
    })
    array.push({
        id: result + 1,
        value: data,
        type: 'TEXT'
    })
    try {
        fs.writeFileSync("/Users/liuyuyang/Desktop/project/copy-mate/src/main/localData/data.json",JSON.stringify(array))
    } catch(err) {
        console.log(err)
    }
}

export { writeDataJSON };