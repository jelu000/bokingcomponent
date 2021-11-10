import "./Menybar.css";

export default function Menybar(props) {
    return (
        <div className="rooten">    
            <nav className="menybar">
                <ul className="menybar-nav">
                    { props.children}
                </ul>  
            </nav>
        </div>
 
    )
}


