export interface Article {
    id: number;
    title: string;
    description: string;
    publishedDate: Date;
    state: string;
    topic: string;
}

export interface ArticleDetailed extends Article {
    author: string;
    source: string;
    url: string;
    imageUrl: string;
    content: string;
}