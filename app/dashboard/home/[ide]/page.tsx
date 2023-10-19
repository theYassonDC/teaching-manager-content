import { getTopicId } from "@/services"

export default async function PageTest({ params }: { params: { ide: string } }) {
    const { ide } = params
    const res = await getTopicId(ide)
    return (
        <>
            <h1>{res.title}</h1>
            <div>{res.content}</div>
        </>
    )
}
