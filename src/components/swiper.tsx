import {Children, FC, isValidElement, ReactNode, useContext, useEffect, useRef, useState} from "react";
import "../stylesheets/swiper.less"
import {useImmer} from "use-immer";
import swiperIndicatorContext from "../context/swiperIndicator.tsx";
import faceElementInfoContext from "../context/faceElementInfo.ts";


type SwiperProps = {
    children: ReactNode;
    className: string
}

let currentIndex = 0,
    swiperWidth = 0,
    basePositionX = 0,
    basePositionY = 0,
    canCaptureMouseMove = false,
    mouseStatus = "up",
    movementDirection = ""

export function Swiper({className, children}: SwiperProps): ReactNode {
    const swiper = useRef<HTMLDivElement>(null)
    const swiperContainers = Children.toArray(children).filter(
        (child) => isValidElement(child) && child.type === SwiperContainer
    );
    const [moveDistance, setDistance] = useImmer({
        transform: "unset"
    })
    const [activeClass, setActive] = useState("")
    const {setOffset} = useContext(swiperIndicatorContext)
    const {clientRects} = useContext(faceElementInfoContext)

    useEffect(() => {
        window.onmouseup = (e) => onMouseUp(e.clientX, e.clientY)
        window.onmousemove = (e) => onMouseMove(e.clientX, e.clientY)
        window.ontouchmove = (e) => onMouseMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
        window.ontouchend = (e) => onMouseUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    }, []);
    useEffect(() => {
        console.log(clientRects.top);
    }, [clientRects.top]);
    function getCurrentOffset() {
        return currentIndex * swiperWidth
    }

    function onMouseUp(clientX: number, clientY: number) {
        if (mouseStatus === "up")
            return
        console.log("onMouseUp");

        const differenceX = basePositionX - clientX
        setActive("active")
        if (differenceX > (swiperWidth / 4) && currentIndex < swiperContainers.length - 1) {
            console.log("next");
            currentIndex++
        } else if (differenceX < -(swiperWidth / 4) && currentIndex > 0) {
            console.log("previous");
            currentIndex--
        }
        hit()

        mouseStatus = "up"
        movementDirection = ""
        canCaptureMouseMove = false
    }

    function onMouseMove(clientX: number, clientY: number) {
        if (!canCaptureMouseMove || mouseStatus === "up")
            return
        if (clientX > window.innerWidth - 20)
            return onMouseUp(clientX, clientY)
        const originalDifferenceX = basePositionX - clientX
        const differenceX = Math.abs(originalDifferenceX)
        const differenceY = Math.abs(basePositionY - clientY)

        if (!movementDirection) {
            if (differenceX < 5 && differenceY > 5) {
                movementDirection = "y"
                console.log(movementDirection);
            } else if (differenceY < 5 && differenceX > 5) {
                movementDirection = "x"
                console.log(movementDirection);
            }
        }

        if (movementDirection === "x")
            return xSliding()
        ySliding()

        function ySliding() {
            if (differenceY < 5) return
        }

        function xSliding() {
            if (differenceX < 5) return
            let offset = -originalDifferenceX
            offset < 0 && (offset += 5)
            offset > 0 && (offset -= 5)
            const scaleX = Math.abs(offset / 100000) + 1
            if (offset > 0 && currentIndex === 0) {
                const slightOffset = offset / 30
                setLimitState(slightOffset)
            } else if (offset < 0 && currentIndex === swiperContainers.length - 1) {
                offset = -offset
                const slightOffset = -(getCurrentOffset() + offset / 30)
                setLimitState(slightOffset)
            } else {
                setOffset({x: -(getCurrentOffset() - offset), y: 0})
                setDistance(draft => {
                    draft.transform = cssFormat(-(getCurrentOffset() - offset))
                })
            }

            function setLimitState(slightOffset: number) {
                setDistance(draft => {
                    draft.transform = `scaleX(${scaleX}) translateX(${slightOffset}px)`
                })
            }
        }

    }

    function cssFormat(offset: number, isHit: boolean = false): string {
        if (isHit) {
            return `translateX(-${getCurrentOffset()}px)`
        }
        return `translateX(${offset}px)`
    }

    function onMouseDown(clientX: number, clientY: number) {
        mouseStatus = "down"
        console.log("onMouseDown");
        swiperWidth = swiper.current!.clientWidth
        basePositionX = clientX
        basePositionY = clientY
        canCaptureMouseMove = true
        setActive("")
    }

    function hit() {
        setOffset({
            x: -(getCurrentOffset()), y: 0
        })
        setDistance(draft => {
            draft.transform = cssFormat(currentIndex, true)
        })
    }

    return (
        <div className={className}>
            <div className={"swiper " + activeClass}
                 ref={swiper}
                 style={moveDistance}
                 onMouseDown={e => onMouseDown(e.clientX, e.clientY)}
                 onTouchStart={e => onMouseDown(e.touches[0].clientX, e.touches[0].clientY)}
            >
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
