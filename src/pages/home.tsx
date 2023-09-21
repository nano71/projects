import backgroundImage from "../assets/background.jpg"
import AppIcon from "../components/appIcon.tsx";
import {ReactElement} from "react";
import "../stylesheets/home.less"
import {Icon} from "@iconify/react";

export default function Home() {

    const dockApps: ReactElement[] = [
        <AppIcon name="拨号" icon=""/>,
        <AppIcon name="拨号" icon="public/react.svg"/>,
        // <AppIcon name="拨号" icon=""/>,
        // <AppIcon name="拨号" icon=""/>
    ]

    const pageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "auto 100%",
        backgroundPosition: "right"
    };
    return (
        <div className="page homePage" style={pageStyle}>
            <div className="iconArea">
                {/*{dockApps}*/}
                {/*{dockApps}*/}
                {/*{dockApps}*/}
                {/*{dockApps}*/}
                {/*{dockApps}*/}

            </div>
            <div className="indicator">
                <div className="dot active"></div>
                <div className="dot"></div>
            </div>
            <div className="dockArea">
                {dockApps}
                <div className="searchBar">
                    <Icon icon="tabler:mood-crazy-happy"/>
                    <input type="text" placeholder="搜索或说点什么~"/>
                </div>
            </div>
        </div>
    )
}
