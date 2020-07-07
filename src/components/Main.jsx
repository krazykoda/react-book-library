import React, { useState } from 'react'

function Main(props) {
    const { data, close } = props
    const hide = data? 'view': 'view hide'

    const [url, setUrl] = useState('')
    if(data && data.photo) {
        const reader = new FileReader() 
        reader.onload = () => setUrl(reader.result)
        reader.readAsDataURL(data.photo)
    }

    return (
       <div className={hide} >
           <div className="img">
               {
                  url? <img src={url} alt="cover" /> :<span>No Image</span>
               }
                
           </div>
           <div className="text">
                <h1> {data? data.name: null} </h1>
                <h4><span>by</span> {data? data.author: null} </h4>
                <p> 
                    {data && data.desc? data.desc: <span>No Description</span>} 
                </p>
                <button onClick={close} >Close</button>
           </div>
       </div>
    )
}

export default Main
