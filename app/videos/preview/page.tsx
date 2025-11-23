'use client'
import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from 'react'
import placeholderThumbnailImg from '@/mock/thumbnail/Thumbnail.jpg'
import binarizedThumbnailImg from '@/mock/thumbnail/Binarized.jpg'

export default function Preview() {
    const [videoThumbnail, setVideoThumbnail] = useState(placeholderThumbnailImg)
    const [binarizedThumbnail, setBinarizedThumbnail] = useState(binarizedThumbnailImg)
    const [processing, setProcessing] = useState(false)

    function process() {
        if (!processing) { // prevent multiple clicks
            setProcessing(true)

            // Set up fetch request for job
        }
    }
    
    useEffect(() => {
        //actual fetch
        
        // mock data
        Promise.resolve().then(() =>{
            setVideoThumbnail(placeholderThumbnailImg)
            setBinarizedThumbnail(binarizedThumbnailImg)
        })
    }, [])

    return (
        <div id="preview-page">
            <Image 
                className="preview-thumb"
                src={videoThumbnail || placeholderThumbnailImg} 
                alt='video thumbnail' 
                width={320}
                height={320}
            />
            <div className="image-target-select">
                <label htmlFor="color-picker">Target Color: 
                    <input type="color" id="color-picker" />
                </label>
                <label htmlFor="range-slider">Threshold: 
                    <input type="range" id="range-slider" min="0" max="455" defaultValue={50}/>
                </label>
                <p><button onClick={process}>Placeholder Button</button></p>
            </div>
            <Image 
                className="preview-thumb"
                src={binarizedThumbnail || binarizedThumbnailImg} 
                alt='binarized thumbnail'
                width={320}
                height={320}
                placeholder="blur"
            />
            <div className="preview-controls" style={{visibility: processing ? 'visible' : 'hidden'}}>
                <Link href="/videos" className="preview-link">Processing... </Link>
            </div>
        </div>
    )
}