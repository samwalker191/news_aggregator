"use client"

import { Badge } from "@/app/components/shadcn/badge";
import { delay, formatDate } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export default function ArticleDetails() {
    const id = useParams().id;

    const { error, data, isLoading } = useQuery({
        queryKey: ['articleDetails', id],
        queryFn: async () => {
            await delay(1000); // used to demonstrate caching is working
            const res = await fetch(`${DOMAIN}/api/news/${id}`);
            return await res.json();
        }
    })

    if (isLoading) return <h1 className="mt-8">Loading...</h1>;

    const publishedDate = new Date(data.publishedDate);

    return (
        <section className="flex flex-col justify-center items-center md:max-w-[50%] m-4 md:mx-0">
            <section className="mb-4 relative">
                <Link href="/" className="md:absolute top-8 -left-24">{"< Back"}</Link>
                <h1 className="text-3xl font-bold md:mt-6 mt-4 text-wrap">{data.title}</h1>
                <h4 className="">{data.description}</h4>
            </section>
            
            <section className="flex justify-between w-full gap-2 text-muted-foreground mb-4">
                <div className="flex flex-col w-1/2 leading-5">
                    <p>By <span className="font-bold uppercase">{data.author}</span></p>
                    <p>{formatDate(publishedDate)}</p>
                    <p>
                        From <a href={data.url} className="font-bold">
                            {data.source}<FontAwesomeIcon icon={faArrowUpRightFromSquare} width="14" className="ml-1"/>
                        </a>
                    </p>
                </div>
                <div className="flex gap-2 h-min self-end">
                    <Badge className="bg-[#064e3b]">{data.state}</Badge>
                    <Badge className="bg-[#155e75]">{data.topic}</Badge>
                </div>
            </section>
            
            {data.imageUrl && 
                <Image 
                    src={data.imageUrl}
                    alt="Image from article source"
                    width={1000}
                    height={500}
                />
            }
        </section>
    )
}

