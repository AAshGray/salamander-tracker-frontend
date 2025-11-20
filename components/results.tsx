'use client'
import { useParams } from "next/navigation"

export default async function Results() {
    const params = useParams<{filename: string;  targetColor: string; threshold: string}>()

    const res = await fetch(`http://localhost:3000/api/process/${params.filename}?targetColor=${params.targetColor}&threshold=${params.threshold}`, 
            {
                method: 'POST',
                cache: 'no-cache'
            });
    const result = await res.json();
    // put in something to wait while periodically updating component until results are delivered
    // should return job id to store in state until job is completed
    // {{baseUrl}}/process/{{jobId}}/status runs next
    return (

    )
}