import { Badge } from "@/app/components/shadcn/badge";
import { ArticleDetailed } from "@/lib/types";
import { formatDate } from "@/lib/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";

export default async function Article({ params }: {params: Promise<{id: number}>}) {
    const id = (await params).id;
    const article: ArticleDetailed = {
        id: 1,
        title: "Peter Todd Was ‘Unmasked’ As Bitcoin Creator Satoshi Nakamoto. Now He’s In Hiding",
        description: "Peter Todd has gone underground after an HBO documentary named him as the creator of Bitcoin, Satoshi Nakamoto, whose real identity has long remained a mystery.",
        publishedDate: new Date("2024-11-10"),
        state: "California",
        topic: "Education",
        author: "Sam Walker",
        source: "My Website",
        url: "https://www.wired.com/story/peter-todd-was-unmasked-as-bitcoin-creator-satoshi-nakamoto-now-hes-in-hiding/",
        imageUrl: "https://media.wired.com/photos/6716870e6874cb5feda0798e/191:100/w_1280,c_limit/102124-bitcoin-satoshi-an.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur risus turpis, tincidunt eget hendrerit eu, aliquet ac metus. Etiam sodales massa tempus magna pulvinar, sit amet gravida velit dapibus. Suspendisse egestas odio sit amet odio ornare faucibus. Sed justo est, vulputate non ante at, molestie tempus dui. Sed volutpat leo sed fermentum luctus. Nullam pharetra neque ac dolor maximus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi sagittis est sed nisl cursus, non efficitur purus semper. Nullam vel bibendum lacus. Duis non bibendum quam. Integer a ex a ipsum tempus ornare in eget orci. Ut eu diam porttitor, egestas erat nec, iaculis risus. Nulla vitae egestas turpis, suscipit lobortis risus. Duis dui lorem, viverra a maximus a, suscipit id arcu. Nam consequat, sem et efficitur viverra, nisi libero porttitor augue, at fermentum ante lorem quis magna. Quisque mi eros, feugiat at finibus in, bibendum ut augue. Curabitur sit amet lacus felis. Aenean semper, nibh ac efficitur finibus, tellus erat pellentesque dui, vitae vulputate ligula sapien sodales urna. Etiam libero nisl, ultricies vitae tortor id, suscipit facilisis sem. Etiam efficitur hendrerit venenatis. Quisque vel diam eget elit dignissim interdum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce vel elit fringilla leo congue elementum vel at leo. Pellentesque et vehicula tortor, non blandit felis. Pellentesque in mollis mi, at vestibulum nisl. Cras at enim justo. Quisque finibus est leo, eu fermentum ipsum varius non. Aliquam erat volutpat. Suspendisse ut lectus ac ligula elementum blandit. Integer interdum velit sem, non dictum sem aliquam non. Morbi quis augue vitae metus ultricies pellentesque. Maecenas eu mauris urna. Etiam vitae tellus ac dui commodo tristique vehicula ac dui. Maecenas tempor tincidunt augue a tempus. Etiam sodales ut ante vel mollis. Fusce vitae finibus ex, vitae gravida massa. Sed venenatis ullamcorper lacinia. Donec porta ligula rutrum, posuere dui pellentesque, laoreet sapien. Aenean consectetur purus et eros gravida, malesuada egestas nibh hendrerit. Nulla sit amet nulla ut risus egestas auctor at non mi. Maecenas non interdum urna. Aliquam suscipit cursus laoreet. Morbi vel ultrices urna, sed porttitor mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Aenean sit amet elit condimentum, placerat massa quis, ultricies turpis. Morbi feugiat ex tellus, id bibendum lectus ultricies ac. Duis iaculis leo a velit tristique, ac pretium lacus varius. Cras placerat sed lacus id rhoncus. Vivamus quis metus nibh. Quisque ut ex nulla. Maecenas diam sem, maximus eu congue vitae, venenatis rhoncus elit. Phasellus convallis ut lacus a rhoncus. "
    }

    return (
        <section className="flex flex-col justify-center items-center md:max-w-[50%] m-4 md:mx-0">
            <section className="mb-4 relative">
                <Link href="/" className="md:absolute top-8 -left-24">{"< Back"}</Link>
                <h1 className="text-3xl font-bold md:mt-6 mt-4 text-wrap">{article.title}</h1>
                <h4 className="">{article.description}</h4>
            </section>
            
            <section className="flex flex-col w-full gap-2 text-muted-foreground mb-4">
                <div className="flex flex-col w-full leading-5">
                    <p>By <span className="font-bold uppercase">{article.author}</span></p>
                    <p>{formatDate(article.publishedDate)}</p>
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
            
            <Image 
                src={article.imageUrl}
                alt="Image from article source"
                width={1000}
                height={500}
            />

            <section className="flex flex-col w-full gap-2 mt-4">
                {/* <section className="flex justify-between mt-4">
                    <h3 className="font-bold">Article Description</h3>
                    <a href={article.url} className="font-bold text-blue-700">
                        Link to full article<FontAwesomeIcon icon={faArrowUpRightFromSquare} width="14" className="ml-1"/>
                    </a>
                </section> */}
                <p className="leading-5">{article.content}</p>
            </section>
            
        </section>
    )
}

