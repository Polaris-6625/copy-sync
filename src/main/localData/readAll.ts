import fs, { readFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

function readDataJSON() {
    // 获取当前模块的文件路径
    //const __filename = fileURLToPath(import.meta.url);
    
    // 获取当前模块所在的目录路径
    //const __dirname = dirname(__filename);
    
    // 拼接"data.json"文件的路径
    const dataFilePath = `/Users/liuyuyang/Desktop/project/copy-mate/src/main/localData/data.json`;
    
    // 读取文件内容
    const data = readFileSync(dataFilePath, 'utf8').replaceAll("\n","");
    
    // 返回文件内容
    return JSON.parse(data);
  }
  export { readDataJSON }
  