import { Badge } from "@/app/components/shadcn/badge";
import { formatDate } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { Article } from "@prisma/client";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export default async function ArticleDetails({ params }: {params: Promise<{id: number}>}) {
    const id = (await params).id;
    const res = await fetch(`${DOMAIN}/api/news/${id}`);
    const article: Article = await res.json();
    const publishedDate = new Date(article.publishedDate);

    return (
        <section className="flex flex-col justify-center items-center md:max-w-[50%] m-4 md:mx-0">
            <section className="mb-4 relative">
                <Link href="/" className="md:absolute top-8 -left-24">{"< Back"}</Link>
                <h1 className="text-3xl font-bold md:mt-6 mt-4 text-wrap">{article.title}</h1>
                <h4 className="">{article.description}</h4>
            </section>
            
            <section className="flex justify-between w-full gap-2 text-muted-foreground mb-4">
                <div className="flex flex-col w-1/2 leading-5">
                    <p>By <span className="font-bold uppercase">{article.author}</span></p>
                    <p>{formatDate(publishedDate)}</p>
                    <p>
                        From <a href={article.url} className="font-bold">
                            {article.source}<FontAwesomeIcon icon={faArrowUpRightFromSquare} width="14" className="ml-1"/>
                        </a>
                    </p>
                </div>
                <div className="flex gap-2 h-min self-end">
                    <Badge className="bg-[#064e3b]">{article.state}</Badge>
                    <Badge className="bg-[#155e75]">{article.topic}</Badge>
                </div>
            </section>
            
            {article.imageUrl && 
                <Image 
                    src={article.imageUrl}
                    alt="Image from article source"
                    width={1000}
                    height={500}
                />
            }
        </section>
    )
}

