"use client";

import { Input } from "./shadcn/input"
import { Button } from "./shadcn/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./shadcn/select";

import Form from 'next/form';
import { useState } from "react";

// hardcoding values from seeds file to keep it simple. Could also fetch all distinct values from db.
const STATE_NAMES = ['California', 'Texas', 'Florida', "Washington", "Virginia", "Nevada"];
const TOPICS = ["education", "health", "safety", "housing", "law", "finance", "technology"];

export default function Search({ setArticles }: { setArticles: Function }) {
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

    const [keyword, setKeyword] = useState<string>("");
    const [stateName, setStateName] = useState<string>("");
    const [topic, setTopic] = useState<string>("");
    
    async function handleSubmit() {
        const res = await fetch(`${DOMAIN}/api/news?state=${stateName}&topic=${topic}&search=${keyword}`);
        const data = await res.json();
        setArticles(data);
    }

    return (
        <section className="w-full max-w-xl">
            <Form 
                action={handleSubmit}
                className="flex w-full max-w-xl items-center space-x-2"
            >
                <Input type="search" placeholder="keywords" value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} />
                <Button type="submit">Search</Button>
            </Form>
            <section className="flex gap-4 mt-2 w-full">
                <Select onValueChange={(value) => setStateName(value)}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Select a state"/>
                    </SelectTrigger>
                    <SelectContent>
                        {STATE_NAMES.map(name => <SelectItem key={name} value={name}>{name}</SelectItem>)}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => setTopic(value)}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Select a topic"/>
                    </SelectTrigger>
                    <SelectContent>
                        {TOPICS.map(topic => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                    </SelectContent>
                </Select>
            </section>
        </section>
    )
}