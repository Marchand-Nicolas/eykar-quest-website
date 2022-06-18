import { render } from "react-dom";
import { unmountComponentAtNode } from "react-dom";

function Popup(title, description, buttonName, action, content) { 
    render(
        <div className="global popup contener">
            <h1 className="global popup title">{title}</h1>
            <p className="global popup description">{description}</p>
            {content}
            <br></br>
            <br></br>
            <button onClick={() => {action(); unmountComponentAtNode(document.getElementById("popup"))}} className="global button highlighted popup">{buttonName}</button>
    </div>,
    document.getElementById("popup")
    );

}
export default Popup;