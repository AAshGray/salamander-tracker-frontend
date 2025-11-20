'use client'
import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from 'react'


export default function Preview() {
    const placeholderThumbnailImg = '@/mock/thumbnail/Binarized.jpg'
    const binarizedThumbnailImg = '@/mock/thumbnail/Binarized.jpg'
    const [videoThumbnail, setVideoThumbnail] = useState('')
    const [binarizedThumbnail, setBinarizedThumbnail] = useState('')
    
    useEffect(() => {
        //actual fetch
        
        // mock data
        Promise.resolve().then(() =>{
            setVideoThumbnail(`${placeholderThumbnailImg}`)
            setBinarizedThumbnail(`${binarizedThumbnailImg}`)
        })
    }, [])

    return (
        <div id="preview-page">
            <Image 
                src={videoThumbnail || placeholderThumbnailImg} 
                alt='video thumbnail' 
                placeholder="blur"
            />
            <div className="image-target-select">
                <label htmlFor="color-picker">Target Color: 
                    <input type="color" id="color-picker" />
                </label>
                <label htmlFor="range-slider">Threshold: 
                    <input type="range" id="range-slider" min="0" max="455" defaultValue={50}/>
                </label>
            </div>
            <Image 
                src={binarizedThumbnail || binarizedThumbnailImg} 
                alt='video thumbnail' 
                placeholder="blur"
            />
            <p><button>Placeholder Button</button></p>
        </div>
    )
}