function Popup(title, description, buttonName, action) { 
    return (
        <div className="global popup contener" id="popup">
            <h1 className="global popup title">{title}</h1>
            <p className="global popup description">{description}</p>
            <br></br>
            <br></br>
            <button onClick={() => {action(); document.getElementById("popup").remove()}} className="global button highlighted popup">{buttonName}</button>
    </div>
    );

}
export default Popup;