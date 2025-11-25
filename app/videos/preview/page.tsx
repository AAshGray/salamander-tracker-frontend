'use client'
import Link from "next/link"
import Image from "next/image"
import Results from "@/components/results"
import {useState, useEffect} from 'react'
import placeholderThumbnailImg from '@/mock/thumbnail/Thumbnail.jpg'
import binarizedThumbnailImg from '@/mock/thumbnail/Binarized.jpg'

export default function Preview() {
    const [videoThumbnail, setVideoThumbnail] = useState(placeholderThumbnailImg)
    const [binarizedThumbnail, setBinarizedThumbnail] = useState(binarizedThumbnailImg)

    
    useEffect(() => {
        //actual fetch

        // mock data
        Promise.resolve().then(() =>{
            setVideoThumbnail(placeholderThumbnailImg)
            setBinarizedThumbnail(binarizedThumbnailImg)
        })
    }, [])

    const [sliderValue, setSliderValue] = useState(50)
    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
    }

    const [colorValue, setColorValue] = useState('#000000')
    const handleColorChange = (event) => {
        setColorValue(event.target.value)
    }

    return (
        <div id="preview-page">
            <div id="preview-page-cont">
                <Image 
                    className="preview-thumb"
                    src={videoThumbnail || placeholderThumbnailImg} 
                    alt='video thumbnail' 
                    width={320}
                    height={320}
                />
                <div className="image-target-select">
                    <label htmlFor="color-picker">Target Color: 
                        <input type="color" id="color-picker" defaultValue={colorValue} onChange={handleColorChange}/>
                    </label>
                    <p>Color: {colorValue}</p>
                    <label htmlFor="range-slider">Threshold: 
                        <input type="range" id="range-slider" min="0" max="455" defaultValue={sliderValue} onChange={handleSliderChange}/>
                    </label>
                    <p>Value: {sliderValue}</p>
                </div>
                <Image 
                    className="preview-thumb"
                    src={binarizedThumbnail || binarizedThumbnailImg} 
                    alt='binarized thumbnail'
                    width={320}
                    height={320}
                    placeholder="blur"
                />
            </div>
            
            <div className="preview-controls">
                <Results 
                    // video=
                    targetColor={colorValue}
                    threshold={sliderValue}
                />
            </div>
        </div>
    )
}