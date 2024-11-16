"use client"

import NewsList from "./components/news-list";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/shadcn/select";
import { Input } from "./components/shadcn/input";
import { delay } from "@/lib/utils";
import ArticlePagination from "./components/article-pagination";

// hardcoding values from seeds file to keep it simple. Could also fetch all distinct values from db.
const STATE_NAMES = ['California', 'Texas', 'Florida', "Washington", "Virginia", "Nevada"];
const TOPICS = ["education", "health", "safety", "housing", "law", "finance", "technology"];

export default function Home() {
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 400);
  const [stateName, setStateName] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useQuery({
      queryKey: ['searchResults', stateName, topic, debouncedKeyword, page],
      queryFn: async () => {
          // await delay(1000); // used to demonstrate caching is working
          const res = await fetch(`${DOMAIN}/api/news?state=${stateName}&topic=${topic}&search=${keyword}&page=${page}`);
          return await res.json();
      }
  })

  const articles = data?.articles ?? [];
  const total = data?.total ?? 0;

  function handlePageSet(newPage: number) {
    setPage(newPage);
    window.scrollTo({
      top: 0
    });
  }

  return (
    <section className="flex flex-col w-[85%] items-center justify-center">
      <h1 className="text-4xl font-bold my-6">News Aggregator</h1>

      <section className="w-full max-w-xl">
        <Input type="search" placeholder="Search by keyword" value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} />
        <section className="flex gap-4 mt-2 w-full">
            <Select onValueChange={(value: string) => setStateName(value)}>
                <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder="Select a state"/>
                </SelectTrigger>
                <SelectContent>
                    {STATE_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                </SelectContent>
            </Select>

            <Select onValueChange={(value: string) => setTopic(value)}>
                <SelectTrigger className="md:w-1/3">
                    <SelectValue placeholder="Select a topic"/>
                </SelectTrigger>
                <SelectContent>
                    {TOPICS.map(topic => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                </SelectContent>
            </Select>
        </section>
      </section>

      {isLoading &&
        <h1 className="mt-8">Loading...</h1>
      }
      
      {data && 
        <NewsList articles={articles}/>
      }

      {total > 0 && 
        <ArticlePagination page={page} handlePageSet={handlePageSet} total={total} />
      }
      
    </section>
  );
}
