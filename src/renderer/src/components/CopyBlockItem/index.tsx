import { BlockData } from "@renderer/types/block";
import React, { useState } from "react";
import "./index.css";

const CopyBlockItem: React.FC<{data: BlockData}> = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    function clearItem(e?:any):string {
        // 渲染线程向主线程发起通信
        (window as any).myPoints.clearItem(props.data.id)
        e.stopPropagation();
        if (true) {
            return "success";
        }
        else {
            return "failed";
        }
    }
    
    function copyToClipboard():void {
        (window as any).myPoints.setItem(props.data.value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000); // 延长动画时间到1秒
    }

    return (
        <div 
            className={`container ${isCopied ? 'copied' : ''}`} 
            onClick={copyToClipboard}
            title="点击复制"
        >
            <div className="content">
                {props.data.value}
            </div>
            <div className="copy-tip">已复制</div>
            <div className="clearIcon" onClick={clearItem} title="删除此项">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#7fb9aa"/>
                    <path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670c-1.2 1.5-1.9 3.3-1.9 5.2 0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z" fill="#7fb9aa"/>
                </svg>
            </div>
        </div>
    )
}

export default CopyBlockItem;