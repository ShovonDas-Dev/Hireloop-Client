'use client'
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
import { deleteJobs } from "@/lib/acction/jobs"
import { JobPost } from "./page"

const Buttone = (job : JobPost) => {

    const handleDelete = async () => {
        await deleteJobs(job._id)
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
      <AlertDialog>
        <AlertDialogTrigger >
        
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

            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
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

export default Buttone
