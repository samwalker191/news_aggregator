import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/db";
import { Article } from "@prisma/client";

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