import { Article } from "@prisma/client";
import NewsListItem from "./news-list-item";

export default function NewsList({ articles }: { articles: Article[] }) {
    return (
        <section className="md:w-[75%] flex flex-col gap-4 my-8">
            {articles.map(a => <NewsListItem article={a} key={a.id} />)}
        </section>
    )
}