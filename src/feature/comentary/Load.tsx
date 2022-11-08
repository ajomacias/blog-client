function Load({message}:props) {

    return (
        <div className="load-container cross-center">
            <div className="item-load load-1 "></div>
            <div className="item-load load-2 " ></div>
            <div className="item-load load-3 " ></div>
            { message &&<p className="px-1" > {message} </p>}
        </div>
    )
}

export default Load;

type props = { message? : string }