import {FC, ReactNode, useEffect} from "react";
import "../stylesheets/global.less"
import {useImmer} from "use-immer";
import {Icon} from '@iconify/react';
import "../stylesheets/face.less"

interface FaceComponentProps {
    children: ReactNode;
}

const Face: FC<FaceComponentProps> = ({children}): ReactNode => {

    const [currentTime, updateTime] = useImmer("")
    useEffect(() => {
        setInterval(() => getTime(), 60000)
        getTime()
    });

    function getTime() {
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        updateTime(`${currentHour}:${currentMinute}`)
    }

    return (
        <div id="face" className="rootFace">
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
    );
};

export default Face
