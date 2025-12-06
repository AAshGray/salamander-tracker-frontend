'use client'
import Link from "next/link"
import Image from "next/image"
import Results from "@/components/results"
import {useState, useEffect} from 'react'
import placeholderThumbnailImg from '@/mock/thumbnail/Thumbnail.jpg'
import binarizedThumbnailImg from '@/mock/thumbnail/Binarized.jpg'
import { useSearchParams } from "next/navigation"
import { fetchThumbnail } from "@/lib/fetch"
import processImage from "@/lib/binarizer"

export default function Preview() {
    const [videoThumbnail, setVideoThumbnail] = useState(<Image src={placeholderThumbnailImg} alt="video thumbnail" width={320} height={320} />)
    const [binarizedThumbnail, setBinarizedThumbnail] = useState(<Image src={binarizedThumbnailImg} alt="binarized thumbnail" width={320} height={320} />)
    const [thumbBlob, setThumbBlob] = useState<Blob | null>(null);
    const [sliderValue, setSliderValue] = useState(50)
    const [colorValue, setColorValue] = useState('#000000')

    const searchParam = useSearchParams()
    const videoParam = searchParam.get('video')

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
    }

    const handleColorChange = (event) => {
        setColorValue(event.target.value)
    }
    
    useEffect(() => {
        //actual fetch
        if (!videoParam) return;

        async function loadThumbnail() {
            try{
                const thumbBlob = await fetchThumbnail(videoParam)
                console.log("Thumbnail fetched");
                const thumbImage = URL.createObjectURL(thumbBlob)
                setVideoThumbnail(<Image src={thumbImage} alt="video thumbnail" width={320} height={320} unoptimized />)
                setThumbBlob(thumbBlob)
            } catch {
                console.log("Couldn't get image from API")
            }
        }
        loadThumbnail()
    }, [videoParam])

    useEffect(() => {
        if (!thumbBlob || !colorValue || !sliderValue) return;

        async function loadBinarized() {
            const binDataUrl = await processImage(thumbBlob, colorValue, sliderValue)
            setBinarizedThumbnail(<Image src={binDataUrl} alt="binarized thumbnail" width={320} height={320} unoptimized />)
        }
        loadBinarized()
    }, [colorValue, sliderValue, thumbBlob])


    function toHexColor(color) {
        return color.replace("#", "")
    }

    return (
        <div id="preview-page">
            <div id="preview-page-cont">
                {videoThumbnail}
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
                {binarizedThumbnail}
            </div>
            
            <div className="preview-controls">
                <Results 
                    video={videoParam}
                    targetColor={toHexColor(colorValue)}
                    threshold={sliderValue}
                />
            </div>
        </div>
    )
}