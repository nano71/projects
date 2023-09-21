import React, {useEffect} from "react";
import "../stylesheets/global.less"
import {useImmer} from "use-immer";
import {Icon} from '@iconify/react';
import "../stylesheets/face.less"

interface FaceComponentProps {
    children: React.ReactNode;
}

const Face: React.FC<FaceComponentProps> = ({children}) => {

    const [currentTime, updateTime] = useImmer("")
    useEffect(() => {
        resize()
        setInterval(() => getTime(), 60000)
        getTime()
    });

    function getTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        updateTime(`${currentHour}:${currentMinute}`)
    }

    window.onresize = function () {
        resize()
    }

    function resize() {
        if (innerWidth < 450)
            return
        document.querySelector("html")!.style.fontSize = 0.0013869626 * innerHeight + "px"
    }


    return (
        <div id="face">
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
            <div className="dynamicIsland"></div>
            {children}
            <div className="touchBar"/>
        </div>
    );
};

export default Face
