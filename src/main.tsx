import ReactDOM from 'react-dom/client'
import Home from './pages/home.tsx'
import "./stylesheets/colors.less"
import Face from "./pages/face.tsx";

export const root: HTMLElement = document.querySelector("#root") || document.body
ReactDOM.createRoot(root).render(
    <Face>
        <Home/>
    </Face>
)
