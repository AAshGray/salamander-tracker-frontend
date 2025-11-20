import Link from "next/link"
import Image from "next/image"

export default function Preview() {
    return (
        <div id="preview-page">
            {/* Image placeholder */}
            <div className="image-target-select">
                <label htmlFor="color-picker">Target Color: 
                    <input type="color" id="color-picker" />
                </label>
                <label htmlFor="range-slider">Threshold: 
                    <input type="range" id="range-slider" min="0" max="455" defaultValue={50}/>
                </label>
            </div>
            {/* Image placeholder */}
            <p><button>Placeholder Button</button></p>
        </div>
    )
}