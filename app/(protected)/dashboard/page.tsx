import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
    return (
        <div className='w-full h-dvh flex justify-center flex-col gap-4 md:gap-6'>
            <div>
                <h1 className='text-2xl md:text-3xl font-title font-semibold'>Shorten</h1>
                <p className='text-muted-foreground text-sm md:text-base'>
                    Type a link below and get a shorter one.
                </p>
            </div>
            <div className='relative'>
                <Input
                    placeholder='https://example.com'
                    className='md:!text-xl tracking-tight h-14 md:h-16 px-6 rounded-full shadow-lg pr-34 md:pr-44'
                />
                <Button
                    className='h-10 md:h-12 md:text-lg rounded-full absolute right-2 top-2 md:!px-6'
                    size={"lg"}
                >
                    Shorten it <ArrowRight className='size-4 md:!size-6' />
                </Button>
            </div>
        </div>
    );
}
