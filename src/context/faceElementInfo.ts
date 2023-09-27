import {createContext} from "react";
import {ClientRects} from "../types.ts";

interface ElementInfoContext {
    clientRects: ClientRects,
    setClientRects: (clientRects: ClientRects) => void
}

export const defaultData = {
    clientRects: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    }
}

const faceElementInfoContext = createContext<ElementInfoContext>(defaultData as ElementInfoContext)
export default faceElementInfoContext
