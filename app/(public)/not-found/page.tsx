import { GoTextLogo } from "@/components/go-text-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className='flex flex-col items-center space-y-6'>
            <Badge className='bg-foreground/20 text-foreground font-semibold'>404</Badge>
            <GoTextLogo className='w-20 md:w-24' />
            <div className='text-center space-y-2'>
                <h1 className='text-2xl md:text-3xl font-semibold font-title'>
                    Oops! We couldn&apos;t find that link...
                </h1>
                <h2 className='text-lg md:text-xl'>
                    Sorry, the link you were looking for doesn&apos;t exist or has been removed.
                </h2>
                <p className='text-muted-foreground'>Try another link, or shorten one yourself!</p>
            </div>
            <Button size={"lg"} className='text-lg h-12 rounded-full' asChild>
                <Link href='/auth/signin'>Create a link</Link>
            </Button>
        </div>
    );
}
