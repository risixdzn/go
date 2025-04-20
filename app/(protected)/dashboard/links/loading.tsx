import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingLinksPage() {
    return (
        <div className='mt-20 md:mt-24 md:py-10 space-y-6'>
            <div>
                <h2 className='text-2xl md:text-3xl font-title font-semibold'>My links</h2>
                <p className='text-muted-foreground'>See all your shortened links.</p>
            </div>

            <div className='flex flex-col gap-2'>
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className='w-full h-22 md:h-24 rounded-xl md:rounded-3xl' />
                ))}
            </div>
        </div>
    );
}
