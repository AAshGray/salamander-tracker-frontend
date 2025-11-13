import Link from "next/link"
import Image from "next/image"

export default function Preview() {
    return (
        <div>
            <p>Processor page</p>
            {/* Image placeholder */}
            <label htmlFor="color-picker">Target Color: 
                <input type="color" id="color-picker" />
            </label>
            <label htmlFor="range-slider">Threshold: 
                    <input type="range" id="range-slider" min="0" max="455" defaultValue={50}/>
            </label>
            
            {/* Image placeholder */}
        </div>
    )
}