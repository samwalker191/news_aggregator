"use client"

import { Article } from "@prisma/client";
import NewsList from "./components/news-list";
import Search from "./components/search";
import { useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  return (
    <section className="flex flex-col w-[85%] items-center justify-center">
      <h1 className="text-4xl font-bold my-6">News Aggregator</h1>
      <Search setArticles={setArticles} />
      <NewsList articles={articles}/>
    </section>
  );
}
