import { Article } from "@prisma/client";
import NewsListItem from "./news-list-item";

export default function NewsList({ articles }: { articles: Article[] }) {

    if (articles.length === 0) return <h1 className="mt-8">No results yet! Try searching something above.</h1>
    return (
        <section className="md:w-[75%] flex flex-col gap-4 my-8">
            {articles.map(a => <NewsListItem article={a} key={a.id} />)}
        </section>
    )
}