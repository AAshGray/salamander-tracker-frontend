'use client'
import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import {processVideo, getJobStatus} from "@/lib/fetch"

export default function Results({threshold, targetColor, video}) {
    const params = useParams()
    const [processing, setProcessing] = useState(false)
    const [urls, setUrls] = useState<string[]>([])
    const addUrl = (newUrl) => {
        setUrls(prev => [...prev, newUrl])
    }

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
                const job = await processVideo(video, targetColor, threshold)
                const jobId = job.jobId || job.error
                console.log(`Job being processed with id: ${jobId}`)

                // to check the status using a poll
                const checkInterval = setInterval(async () => {
                    try {
                        const updatedJob = await getJobStatus(jobId)

                        // checks if error key exists first
                        if(updatedJob.error) {
                            console.log(updatedJob.error)
                            // stops from doing the check
                            clearInterval(checkInterval)
                            return
                        }
                        console.log(`Current Job status: ${updatedJob.status}`)

                        if(updatedJob.status === "done") {
                            clearInterval(checkInterval)
                            console.log(`Job completed! URL: ${updatedJob.result}`)
                            addUrl(`http://localhost:3000${updatedJob.result}`)
                        }
                    } catch(err) {
                        console.log(`Error checking job status: ${err}`)
                        // stops from doing the check
                        clearInterval(checkInterval)
                    }
                }, 2000)

            } catch (err) {
                console.error(err)
            } finally {
                setProcessing(false)
            }
        }
    }

    function fileName(path) {
        const name = path.split("/").pop().split(".")[0]
        return name
    }

    return (
        <>
            <div className="preview-controls">
                {!processing ? (
                    <button className="preview-link" onClick={process}>
                        Start processing
                    </button>
                ) : (
                    <p>Processing...</p>
                )}
            </div>
            {/* Make an element to show completed job */}
            <div className="job-list">
                {urls.length === 0 ? (
                    <p>No files available</p>
                ) : (
                    <ul className="url-links">
                        {urls.map((url) => (
                            <li key={url}>
                                {/* Placeholder text */}
                               <a href={url}>{fileName(url)}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}