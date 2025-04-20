import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingLinkPage() {
    return (
        <div className='mt-20 md:mt-24 md:py-10 space-y-6'>
            <Skeleton className='w-16 h-5' />
            <div>
                <h2 className='text-2xl md:text-3xl font-title font-semibold'>Your link</h2>
                <p className='text-muted-foreground'>See the details of the shortened link</p>
            </div>
            <Skeleton className='w-full h-22 md:h-24 rounded-xl md:rounded-3xl' />
        </div>
    );
}
