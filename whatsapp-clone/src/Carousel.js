import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
    const [pos, setPos] = useState(0);
    const [currView, setCurrView] = useState(1);
    const [rightButton, setRightButton] = useState(false);
    const [leftButton, setLeftButton] = useState(true);
    const [imageSrc, setImageSrc] = useState([
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/ee/ab/f6/taal-lake-formerly-known.jpg?w=900&h=-1&s=1",
        "https://a.cdn-hotels.com/gdcs/production84/d1438/b7bd3b9b-ad51-4879-a186-d9ec85d7f4e4.jpg",
        "https://cdn.britannica.com/s:300x169,c:crop/97/158797-050-ABECB32F/North-Cascades-National-Park-Lake-Ann-park.jpg"
    ]);

    useEffect(() => {
        if (currView === 1) {
          setLeftButton(true);
          setRightButton(false);
        } else if (currView === imageSrc.length) {
          setLeftButton(false);
          setRightButton(true);
        } else {
          setLeftButton(false);
          setRightButton(false);
        }
      }, [currView, imageSrc])

    return (
        <div className="container">
            <div className="slider">
                {
                imageSrc.map((img) => (
                    <div className = "sliding" style = {{left : `${pos}%`}}>
                      <img src={img} alt="" />
                    </div>
                ))
                }
            </div>
            <div className="buttonContainer">
                <button disabled = {leftButton} onClick = {() => {setPos((pos) => (pos + 100)); setCurrView((curr) => (curr - 1))}}>Left</button>
                <button disabled = {rightButton} onClick = {() => {setPos((pos) => (pos - 100)); setCurrView((curr) => (curr + 1))}}>Right</button>
            </div>
        </div>
    )
}

export default Carousel
