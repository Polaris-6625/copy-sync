import fs, { readFileSync } from 'fs';
import { join } from 'path';
import { app } from 'electron';

function readDataJSON() {
    // 使用应用数据目录
    const userDataPath = app.getPath('userData');
    const dataFilePath = join(userDataPath, 'data.json');
    
    // 如果文件不存在，创建一个空数组文件
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '[]');
    }
    
    // 读取文件内容
    const data = readFileSync(dataFilePath, 'utf8').replaceAll("\n","");
    
    // 返回文件内容
    return JSON.parse(data);
}

export { readDataJSON }
  