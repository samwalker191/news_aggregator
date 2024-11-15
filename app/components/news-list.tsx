import { Article } from "@/lib/types";
import NewsListItem from "./news-list-item";

export default function NewsList() {
    const articles: Article[] = [
        {
            id: 1,
            title: "Test Article About Cool Stuff",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus nulla, eu egestas turpis. Nam volutpat erat et magna tempus, vel pretium elit ornare. Curabitur facilisis sagittis orci, vel semper tortor viverra a. Suspendisse sit amet molestie nibh. Nam sollicitudin ex at urna iaculis volutpat.",
            publishedDate: new Date("2024-11-10"),
            state: "California",
            topic: "Education",
        },
        {
            id: 2,
            title: "Test Article About Finance",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus nulla, eu egestas turpis. Nam volutpat erat et magna tempus, vel pretium elit ornare. Curabitur facilisis sagittis orci, vel semper tortor viverra a. Suspendisse sit amet molestie nibh. Nam sollicitudin ex at urna iaculis volutpat.",
            publishedDate: new Date("2024-11-12"),
            state: "Arkansas",
            topic: "Finance",
        },
        {
            id: 3,
            title: "Test Article About Science",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus nulla, eu egestas turpis. Nam volutpat erat et magna tempus, vel pretium elit ornare. Curabitur facilisis sagittis orci, vel semper tortor viverra a. Suspendisse sit amet molestie nibh. Nam sollicitudin ex at urna iaculis volutpat.",
            publishedDate: new Date("2024-11-14"),
            state: "Nevada",
            topic: "Science",
        },
        {
            id: 4,
            title: "Test Article About Safety",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at luctus nulla, eu egestas turpis. Nam volutpat erat et magna tempus, vel pretium elit ornare. Curabitur facilisis sagittis orci, vel semper tortor viverra a. Suspendisse sit amet molestie nibh. Nam sollicitudin ex at urna iaculis volutpat.",
            publishedDate: new Date("2024-10-14"),
            state: "California",
            topic: "Safety",
        }
    ];

    return (
        <section className="md:w-[75%] flex flex-col gap-4 my-8">
            {articles.map(a => <NewsListItem article={a} key={a.id} />)}
        </section>
    )
}