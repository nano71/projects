import {ReactNode} from "react";
import "../stylesheets/appIcon.less"
function AppIcon(params: {
    name: string,
    icon: string
}) {
    const appNameElement: ReactNode = <div className="appName">{params.name}</div>
    return (
        <div className="appIcon">
            <img src={params.icon || "./public/vite.svg"} alt=""/>
            {params.name ? appNameElement : null}
        </div>
    )
}

export default AppIcon
