"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteLinkDialog({ slug }: { slug: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function onSubmit() {
        setIsLoading(true);
        try {
            await axios.delete(`/api/go/links/${slug}`);
            toast.success("Link deleted!");
            router.push(`/dashboard/links`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant='ghost'
                        size={"icon"}
                        className='cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10'
                    >
                        <Trash />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the shortened
                            link and all analytics related to it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            disabled={isLoading}
                            variant='destructive'
                            className='cursor-pointer'
                            onClick={onSubmit}
                        >
                            {!isLoading ? <Trash /> : <Loader2 className='animate-spin' />} Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
