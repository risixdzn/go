import { ShortenForm } from "@/components/dashboard/shorten/shorten-form";

export default function Dashboard() {
    return (
        <div className='w-full h-dvh flex justify-center flex-col gap-4 md:gap-6'>
            <div>
                <h1 className='text-2xl md:text-3xl font-title font-semibold'>Shorten</h1>
                <p className='text-muted-foreground text-sm md:text-base'>
                    Type a link below and get a shorter one.
                </p>
            </div>
            <ShortenForm />
        </div>
    );
}
