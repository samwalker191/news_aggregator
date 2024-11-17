import { PrismaClient } from '@prisma/client';

interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: NewsApiArticle[];
}

interface NewsApiArticle {
    source: { id: string, name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

const prisma = new PrismaClient();
const apiKey = process.env.NEWS_API_KEY;
const apiEndpoint = "https://newsapi.org/v2/everything";

const topics: string[] = [
    "education", 
    "health", 
    "safety",
    "housing",
    "law",
    "finance",
    "technology"
];
const stateNames: string[] = ['California', 'Texas', 'Florida', "Washington", "Virginia", "Nevada"] // limiting to a few due to daily api limits
const dateToSearchFrom = "2024-11-01"

async function fetchArticlesByStateAndTopic(state: string, topic: string): Promise<NewsApiResponse> {
    const query = encodeURIComponent(`+${topic} AND +${state}`);
    const url = `${apiEndpoint}?q=${query}&from=${dateToSearchFrom}&language=en&searchIn=title,description&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function main() {
    for (const topic of topics) {
        for (const state of stateNames) {
            const newsApiResponse = await fetchArticlesByStateAndTopic(state, topic);
            
            const articles = newsApiResponse.articles.filter(a => a.author);
            for (const article of articles) {
                try {
                    await prisma.article.create({ data: {
                        title: article.title,
                        description: article.description,
                        publishedDate: new Date(article.publishedAt),
                        state: state,
                        topic: topic,
                        author: article.author,
                        source: article.source.name,
                        url: article.url,
                        imageUrl: article.urlToImage,
                        content: article.content
                    }})
                } catch (error) {
                    // will most likely happen due to duplicate articles. determined by uniqueness on Author - Title.
                    console.log(error);
                    console.log(article.author);
                    console.log(article.title);
                }
            }
        }
    }
}

main();
