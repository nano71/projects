import backgroundImage from "../assets/background.jpg"
import AppIcon from "../components/appIcon.tsx";
import {ReactElement, useState} from "react";
import "../stylesheets/home.less"
import {Icon} from "@iconify/react";
import {Swiper, SwiperContainer} from "../components/swiper.tsx";
import SwiperIndicator from "../context/swiperIndicator.tsx";

const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right"
};


export default function Home() {
    const dockApps: ReactElement[] = [
        <AppIcon name="拨号" icon="" key={1}/>,
        <AppIcon name="拨号" icon="public/react.svg" key={2}/>,
        // <AppIcon name="拨号" icon=""/>,
        // <AppIcon name="拨号" icon=""/>
    ]

    const [offset, setOffset] = useState(0)

    return (
        <div className="page homePage" style={pageStyle}>
            <SwiperIndicator.Provider value={{offset, setOffset}}>
                <Swiper className="iconArea">
                    <SwiperContainer>
                        <div className="content">
                            <div className="row">
                                <AppIcon name="拨号" icon="" key={1}/>
                            </div>
                            <div className="row">
                            </div>
                            <div className="row">
                            </div>
                            <div className="row">
                            </div>
                            <div className="row">
                                <AppIcon name="拨号" icon="" key={1}/>
                            </div>
                        </div>
                    </SwiperContainer>
                    <SwiperContainer>
                        <div className="content">
                            <div className="row">
                            </div>
                            <div className="row">
                            </div>
                            <div className="row"><AppIcon name="拨号" icon="" key={1}/>
                            </div>
                            <div className="row"><AppIcon name="拨号" icon="" key={1}/>
                            </div>
                            <div className="row">
                            </div>
                        </div>
                    </SwiperContainer>
                </Swiper>
                <div className="indicator">
                    {Math.abs(Math.round(offset / 393))}
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>
            </SwiperIndicator.Provider>

            <div className="dockArea">
                <div className="apps">
                    {dockApps}
                </div>
                <div className="searchBar">
                    <Icon icon="tabler:mood-crazy-happy"/>
                    <input type="text" placeholder="搜索或说点什么~"/>
                </div>
            </div>
            <div className="bottomSafeArea"></div>
        </div>
    )
}
