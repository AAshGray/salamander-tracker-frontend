'use client'
import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function Results({threshold, targetColor, video}) {
    const params = useParams()
    const [processing, setProcessing] = useState(false)

    async function process() {
        if (!processing) {
            console.log(`Processing video with video ${video}, target color ${targetColor}, threshold ${threshold}`)
            setProcessing(true)

            try {
                // replace with your job endpoint / payload
                // const res = await fetch('/api/process-job', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ params }),
                // })
                // if (!res.ok) throw new Error('Job request failed')
                // handle response if needed
            } catch (err) {
                console.error(err)
            } finally {
                // setProcessing(false)
            }
        }
    }

    return (
        <div className="preview-controls">
            {!processing ? (
                <button className="preview-link" onClick={process}>
                    Start processing
                </button>
            ) : (
                <p>Processing...</p>
            )}
        </div>
    )
}