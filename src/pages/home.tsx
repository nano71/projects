import backgroundImage from "../assets/background.jpg"
import AppIcon from "../components/appIcon.tsx";
import {ReactElement, useEffect, useState} from "react";
import "../stylesheets/home.less"
import G from "../assets/20230925-G.png"
import {Swiper, SwiperContainer} from "../components/swiper.tsx";
import SwiperIndicator, {defaultData} from "../context/swiperIndicator.tsx";
import {useImmer} from "use-immer";

const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right"
};
let currentIndex = 0
let timer: NodeJS.Timeout
export default function Home() {
    const dockApps: ReactElement[] = [
        <AppIcon name="拨号" icon="" key={1}/>,
        <AppIcon name="拨号" icon="public/react.svg" key={2}/>,
        // <AppIcon name="拨号" icon=""/>,
        // <AppIcon name="拨号" icon=""/>
    ]
    const [offset, setOffset] = useState(defaultData.offset)
    const [indicatorOpacity, setOpacity] = useState(0)
    const [dotTransformStyle, setTransformStyle] = useImmer({
        transform: "translateX(0)",
        width: "6px"
    })
    useEffect(() => {
        function setWidth(width: number) {
            setTransformStyle(draft => {
                draft.width = width + "px"
            })
        }

        function setTranslateX(offset: number) {
            setTransformStyle(draft => {
                draft.transform = `translateX(${offset}px)`
            })
        }

        const originalData = Math.abs(offset.x / 393)
        const progress = Math.abs(offset.x / 393) % 1
        if (indicatorOpacity == 0) {
            if (progress > 0.02) {
                setOpacity(1)
            }
        } else {
            if (progress < 0.1) {
                setWidth(6)
            } else if (progress > 0.1) {
                if (originalData > currentIndex) {
                    setWidth(18)
                } else {
                    setTranslateX((currentIndex - 1) * 12)
                    setWidth(18)
                }
            }
            if (progress === 0) {
                currentIndex = originalData
                setWidth(6)
                setTranslateX(currentIndex * 12)
                clearTimeout(timer)
                timer = setTimeout(() => {
                    setOpacity(0)
                }, 1000)
            }
        }
    }, [indicatorOpacity, offset, setOpacity, setTransformStyle]);

    return (
        <div className="page homePage" style={pageStyle}>
            <SwiperIndicator.Provider value={{offset, setOffset}}>
                <Swiper className="iconArea">
                    <SwiperContainer>
                        <div className="content">
                            <div className="row">
                                <AppIcon name="桂工助手N" icon={G} key={1}/>
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
                    <SwiperContainer>
                        <div className="content">
                            <div className="row">
                                <div className="row"><AppIcon name="拨号" icon="" key={1}/>
                                </div>
                                <div className="row">
                                </div>
                            </div>
                            <div className="row"><AppIcon name="拨号" icon="" key={1}/>
                            </div>
                            <div className="row">
                            </div>
                        </div>
                    </SwiperContainer>
                </Swiper>
                <div className="indicator">
                    <div className="dotBox" style={{opacity: indicatorOpacity}}>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot active" style={dotTransformStyle}></div>
                    </div>
                </div>
            </SwiperIndicator.Provider>

            <div className="dockArea">
                <div className="apps">
                    {dockApps}
                </div>
                <div className="searchBar">
                    <img src={G} alt=""/>
                    <input type="text" placeholder="搜索或说点什么~"/>
                </div>
            </div>
            <div className="bottomSafeArea"></div>
        </div>
    )
}
