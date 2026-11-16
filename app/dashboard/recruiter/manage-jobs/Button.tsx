"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, MoreVertical, SquarePen, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/toast"
import { deleteJobs } from "@/lib/acction/jobs"

const DeleteJobButton = ({ jobId }: { jobId: string }) => {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const data = await deleteJobs({ jobId })

      if (data?.deletedCount > 0) {
        setOpen(false)
        toast.add({
          title: "Job deleted",
          description: "Successfully removed this job.",
          type: "success",
        })
        router.refresh()
      } else {
        toast.add({
          title: "Delete failed",
          description: "Job not found. It may have already been removed.",
          type: "error",
        })
      }
    } catch (err) {
      console.error(err)
      toast.add({
        title: "Delete failed",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-8 items-center gap-1.5 rounded-lg bg-[#5c53fe] px-3 text-xs font-medium text-[#c3c0ff] transition-colors hover:bg-[#4a42e8]"
      >
        <SquarePen className="h-4 w-4" />
        Update
      </button>
      <button
        type="button"
        aria-label="View job"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f1f1f] text-[#a0a0ab] transition-colors hover:text-white"
      >
        <Eye className="h-4 w-4" />
      </button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger
          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400/80 transition-colors hover:bg-[#1f1f1f] hover:text-red-400"
          aria-label="Delete job"
        >
          <Trash2 size={18} />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              job.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction disabled={deleting} onClick={handleDelete}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button
        type="button"
        aria-label="More options"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#a1a4aa] transition-colors hover:bg-[#1f1f1f] hover:text-white"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
    </div>
  )
}

export default DeleteJobButton
