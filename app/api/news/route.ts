import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { Article } from "@prisma/client";
import { zfd } from "zod-form-data";

export async function GET(request: NextRequest): Promise<NextResponse<Article[]>>  {
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get("state");
    const topic = searchParams.get("topic");
    const keyword = searchParams.get("search");

    const result = await prisma.article.findMany({
        where: {
            ...(topic ? { topic } : {}),
            ...(state ? { state } : {}),
            title: {
                contains: keyword ?? ""
            }
        }
    })

    return NextResponse.json(result);
}

const schema = zfd.formData({
    title: zfd.text(),
    description: zfd.text(),
    state: zfd.text(),
    topic: zfd.text(),
    author: zfd.text(),
    source: zfd.text(),
    url: zfd.text(),
    imageUrl: zfd.text(),
    content: zfd.text(),
    publishedDate: zfd.text()
})

export async function POST(request: Request): Promise<NextResponse<Article | string | unknown>> {
    const formData = await request.formData();
    let articleData;
    try {
        articleData = schema.parse(formData);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
    
    let article: Article;
    try {
        article = await prisma.article.create({
            data: articleData
        })
    } catch (error) {
        return NextResponse.json("Something went wrong in saving the article, please try again.", { status: 400 });
    }
    return NextResponse.json(article);
}