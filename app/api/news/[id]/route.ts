import { NextResponse, NextRequest } from "next/server"
import prisma from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse>  {
    const id = parseInt((await params).id)
    const article = await prisma.article.findUnique({
        where: { id }
    });

    return NextResponse.json(article);
}