import { BlockData } from "@renderer/types/block";
import React, { useEffect, useState } from "react";
import "./index.css";

const CopyBlockItem: React.FC<{data: BlockData}> = (props) => {
    const [showFlag,setShowFlag] = useState(false);
    function showIcon():void {
        setShowFlag(!showFlag);
    }
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
    function writeInBlock(e:any):void {
        (window as any).myPoints.setItem(props.data.value)
        e.stopPropagation();
    }
    return (
        <div className="container" onMouseEnter={showIcon} onMouseLeave={showIcon} onClick={writeInBlock}>
            <div>
                {props.data.value}
            </div>
            {
                showFlag && (
                    <div className="clearIcon" onClick={clearItem}>
                        <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4038" width="16" height="16"><path d="M512.039909 121.103172c-216.187761 0-391.44225 175.254489-391.44225 391.44532 0 216.186737 175.254489 391.443273 391.44225 391.443273 216.175481 0 391.42997-175.255513 391.42997-391.443273C903.469879 296.358685 728.21539 121.103172 512.039909 121.103172L512.039909 121.103172zM677.341722 677.535127c-0.00614 0.007163-0.01228 0.013303-0.019443 0.019443-10.881838 10.881838-28.52466 10.893094-39.420825 0.017396L512.091074 551.987736 386.505821 677.81142c-0.007163 0.00614-0.013303 0.014326-0.019443 0.01842-10.882861 10.882861-28.52466 10.894118-39.419801 0.019443-10.914584-10.895141-10.933003-28.55229-0.052189-39.45357l125.586277-125.823684-125.82573-125.588323c-10.900258-10.881838-10.918677-28.538987-0.037862-39.440267 0.007163-0.00614 0.013303-0.013303 0.019443-0.019443 10.867512-10.867512 28.511357-10.877745 39.406498-0.00307l125.823684 125.586277 125.573997-125.826753c0.007163-0.00614 0.013303-0.013303 0.01842-0.01842 10.882861-10.882861 28.525684-10.893094 39.435151-0.005117 10.902304 10.880815 10.916631 28.538987 0.037862 39.440267l-125.5873 125.82573 125.82573 125.586277C688.190815 648.991024 688.208211 666.650219 677.341722 677.535127L677.341722 677.535127z" fill="#272536" p-id="4039"></path></svg>
                    </div>
                )
            }
        </div>
    )
}

export default CopyBlockItem;