import { Article } from "@prisma/client";
import NewsList from "./components/news-list";
import Search from "./components/search";

const DOMAIN = process.env.DOMAIN;

export default async function Home() {
  const res = await fetch(`${DOMAIN}/api/news?state=California&topic=education&search=teacher`);
  const articles: Article[] = await res.json();

  console.log(articles);

  return (
    <section className="flex flex-col w-[85%] items-center justify-center">
      <h1 className="text-4xl font-bold my-6">News Aggregator</h1>
      <Search />
      <NewsList articles={articles}/>
    </section>
  );
}
