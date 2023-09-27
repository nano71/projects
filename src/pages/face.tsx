import {FC, ReactNode, useEffect, useState} from "react";
import "../stylesheets/global.less"
import {Icon} from '@iconify/react';
import touchDot from "../assets/circle-filled.svg"
import "../stylesheets/face.less"
import {ClientRects} from "../types.ts";
import FaceElementInfo, {defaultData} from "../context/faceElementInfo.ts";

interface FaceComponentProps {
    children: ReactNode;
}

const Face: FC<FaceComponentProps> = ({children}): ReactNode => {
    const [clientRects, setClientRects] = useState(defaultData.clientRects)
    const [currentTime, updateTime] = useState("")
    useEffect(() => {
        setInterval(() => getTime(), 60000)
        getTime()
    }, []);
    useEffect(() => {
        setClientRects(document.querySelector("#face")!.getClientRects()[0] as ClientRects)
    }, [clientRects.top]);

    function getTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        updateTime(`${currentHour}:${currentMinute}`)
    }

    return (
        <FaceElementInfo.Provider value={{clientRects, setClientRects}}>
            <div id="face" className="rootFace" style={{
                cursor: `url("${touchDot}") 16 16, auto`
            }}>
                <div className="statusBar">
                    <div className="notices">
                        {currentTime}
                        <Icon icon="solar:widget-6-broken"/>
                    </div>
                    <div className="status">
                        <Icon icon="tabler:wifi"/>
                        <Icon icon="tabler:cell-signal-4"/>
                        <Icon icon="tabler:signal-lte"/>
                        <Icon icon="tabler:battery-1-filled"/>
                    </div>
                </div>
                {children}
                <div className="bottomNavArea">
                    <div className="touchNavBar"/>
                </div>
            </div>
        </FaceElementInfo.Provider>
    )
}

export default Face
