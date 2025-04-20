import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return redirect(`/api/go/redirect/${slug}`);
}
