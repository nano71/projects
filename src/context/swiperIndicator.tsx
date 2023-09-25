import {createContext} from "react";

type indicatorContext = {
    offset: number,
    setOffset: (offset: number) => void
}

const defaultData = {
    offset: 0,
    setOffset: (offset: number) => console.log("未提供, offset当前为:" + offset)
}

const swiperIndicatorContext = createContext<indicatorContext>(defaultData)


export default swiperIndicatorContext
