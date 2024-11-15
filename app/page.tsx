import NewsList from "./components/news-list";
import Search from "./components/search";

export default function Home() {
  return (
    <section className="flex flex-col w-[85%] items-center justify-center">
      <h1 className="text-4xl font-bold my-6">News Aggregator</h1>
      <Search />
      <NewsList />
    </section>
  );
}
