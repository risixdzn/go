import { Wind } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full max-w-sm'>
            <div className={"flex flex-col gap-6"}>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col items-center gap-2'>
                        <h1 className='text-2xl font-bold font-title inline-flex gap-1 items-end'>
                            <Wind className='flip' /> go
                        </h1>
                        <div className='text-center text-sm'>
                            The <span className='italic font-semibold'>fastest</span> way to
                            self-host a URL shortener.
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
