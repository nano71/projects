import {createContext} from "react";
import {Offset} from "../types.ts";

interface IndicatorContext {
    offset: Offset,
    setOffset: (offset: Offset) => void
}

export const defaultData = {
    offset: {x: 0, y: 0}
}

const swiperIndicatorContext = createContext<IndicatorContext>(defaultData as IndicatorContext)


export default swiperIndicatorContext
