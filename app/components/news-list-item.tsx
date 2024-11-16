import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./shadcn/card";
import { Badge } from "./shadcn/badge";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Article } from "@prisma/client";

export default function NewsListItem({ article }: { article: Article }) {
    console.log(typeof article.publishedDate);
    const publishedDate = new Date(article.publishedDate);
    return (
        <Link href={`article/${article.id}`} className="no-underline">
            <Card className="w-full hover:bg-secondary/80 transition-colors ease-in-out duration-200">
                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{formatDate(publishedDate)}</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription>{article.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <div className="flex gap-2">
                        <Badge className="bg-[#064e3b]">{article.state}</Badge>
                        <Badge className="bg-[#155e75]">{article.topic}</Badge>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}