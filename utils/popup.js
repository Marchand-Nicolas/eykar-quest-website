import { render } from "react-dom";
import { unmountComponentAtNode } from "react-dom";

function popup(title, description = "", buttonName = "Okay", action, content, custom = {}, init) { 
    if (init) init()
    render(
            <div className="popup background">
            <div className="popup contener">
                <h1 className="popup title">{title}</h1>
                <p className="popup description">{description}</p>
                {content}
                <br></br>
                {
                    !custom.button ? <button onClick={() => {action ? action() : null; unmountComponentAtNode(document.getElementById("popup"))}} className="button highlighted popup">{buttonName}</button> : custom.button
                }
        </div>
        </div>,
        document.getElementById("popup")
    );

}
export default popup;