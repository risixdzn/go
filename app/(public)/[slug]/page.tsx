import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{
    utm_source?: string;
    utm_campaign?: string;
}>;

export default async function RedirectPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const { slug } = await params;
    const query = await searchParams;

    function mountQueryString() {
        const data = Object.entries(query).map(([key, value]) => {
            return `${key}=${encodeURIComponent(value ?? "")}`;
        });

        return data.length > 0 ? `?${data.join("&")}` : "";
    }

    return redirect(`/api/go/redirect/${slug}${mountQueryString()}`);
}
