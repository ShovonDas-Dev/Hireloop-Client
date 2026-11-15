import { JobFormData } from "@/app/dashboard/recruiter/add-job/page"

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const createJobs = async (data : JobFormData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST" ,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data),
    })

    return res.json()
}

export const deleteJobs = async (id : string) => {
        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "DELETE",
        }
    
    )

    const data = await res.json();
    return data
}