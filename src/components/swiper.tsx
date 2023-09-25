import {Children, FC, isValidElement, ReactNode, useContext, useEffect, useRef, useState} from "react";
import "../stylesheets/swiper.less"
import {useImmer} from "use-immer";
import swiperIndicatorContext from "../context/swiperIndicator.tsx";


type SwiperProps = {
    children: ReactNode;
    className: string
}

let currentIndex = 0,
    swiperWidth = 0,
    baseXPosition = 0,
    canCaptureMouseMove = false,
    mouseStatus = "up"

export function Swiper({className, children}: SwiperProps): ReactNode {
    const swiper = useRef<HTMLDivElement>(null)
    const swiperContainers = Children.toArray(children).filter(
        (child) => isValidElement(child) && child.type === SwiperContainer
    );
    const [moveDistance, setDistance] = useImmer({
        transform: "unset"
    })
    const [activeClass, setActive] = useState("")
    const {offset, setOffset} = useContext(swiperIndicatorContext)

    useEffect(() => {
        console.log(offset);
        window.document.querySelector("html")!.onmouseup = (e) => onMouseUp(e.clientX)
        window.document.querySelector("html")!.onmousemove = (e) => onMouseMove(e.clientX)
    }, []);


    function getCurrentOffset() {
        return currentIndex * swiperWidth
    }

    function onMouseUp(clientX: number) {
        if (mouseStatus === "up")
            return
        mouseStatus = "up"
        console.log("onMouseUp");
        const difference = baseXPosition - clientX
        canCaptureMouseMove = false
        setActive("active")

        if (difference > (swiperWidth / 4) && currentIndex < swiperContainers.length - 1) {
            console.log("next");
            currentIndex++
        } else if (difference < -(swiperWidth / 4) && currentIndex > 0) {
            console.log("previous");
            currentIndex--
        }
        hit()
    }

    function onMouseMove(clientX: number) {
        if (!canCaptureMouseMove || mouseStatus === "up")
            return
        if (clientX > window.innerWidth - 20)
            return onMouseUp(clientX)
        let offset = -(baseXPosition - clientX)
        const scaleX = Math.abs(offset / 100000) + 1
        if (offset > 0 && currentIndex === 0) {
            const slightOffset = offset / 30
            setDistance(draft => {
                draft.transform = `scaleX(${scaleX}) translateX(${slightOffset}px)`
            })
        } else if (offset < 0 && currentIndex === swiperContainers.length - 1) {
            offset = -offset
            const slightOffset = -(getCurrentOffset() + offset / 30)
            setDistance(draft => {
                draft.transform = `scaleX(${scaleX}) translateX(${slightOffset}px)`
            })
        } else {
            setOffset(-(getCurrentOffset() - offset))
            setDistance(draft => {
                draft.transform = cssFormat(-(getCurrentOffset() - offset))
            })
        }

    }

    function cssFormat(offset: number, isHit: boolean = false): string {
        if (isHit) {
            return `translateX(-${getCurrentOffset()}px)`
        }
        return `translateX(${offset}px)`
    }

    function onMouseDown(clientX: number) {
        mouseStatus = "down"
        console.log("onMouseDown");
        swiperWidth = swiper.current!.clientWidth
        baseXPosition = clientX
        canCaptureMouseMove = true
        setActive("")
    }

    function hit() {
        setOffset(-(getCurrentOffset()))
        setDistance(draft => {
            draft.transform = cssFormat(currentIndex, true)
        })
    }

    return (
        <div className={className}>
            <div className={"swiper " + activeClass} ref={swiper} style={moveDistance} onMouseDown={e => onMouseDown(e.clientX)}>
                {swiperContainers}
            </div>
        </div>
    );
}

interface SwiperContainerProps {
    children: ReactNode;
}

export const SwiperContainer: FC<SwiperContainerProps> = ({children}) => {
    return (
        <div className="swiperContainer">{children}</div>
    );
}
