import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEvent, useState } from "react";
import './BookFinder.css';

type BookDetailType = {
    volumeInfo: {
        authors: string[];
        imageLinks: {
            smallThumbnail: string;
        }
        infoLink: string;
        title: string;
    }
};

const queryClient = new QueryClient();

const getBooks = async (query?: string) => {
    if (!query) {
        return null;
    }
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    return (data?.items as BookDetailType[]).map((bookDetail) => ({
        authors: bookDetail.volumeInfo.authors,
        image: bookDetail.volumeInfo.imageLinks.smallThumbnail,
        link: bookDetail.volumeInfo.infoLink,
        title: bookDetail.volumeInfo.title,
    }));
};

const BookFinder = () => {
    const [nameSearch, setNameSearch] = useState("");
    const debouncedNameSearch = useDebounce(nameSearch, 100);
    const { data } = useQuery({
        queryKey: ['books', debouncedNameSearch],
        queryFn: () => getBooks(debouncedNameSearch),
        staleTime: 100,
    });
    console.info(data);
    return (
        <div>
            <input
                type="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNameSearch(e.target.value)}
            />
            <div>
                {data ? (
                    <>
                    {data.map(datum => (
                            <a className="bookCard" href={datum.link} key={datum.link}>
                                <img alt={datum.title} src={datum.image} />
                                <div className="detailColumn">
                                    <span className="heading">Title:</span>
                                    <span>{datum.title}</span>
                                    <span className="heading">Authors:</span>
                                    <span>{(datum.authors || []).join(', ')}</span>
                                </div>
                                
                            </a>
                        ))}
                    </>
                ) : (
                    'Loading...'
                )}
            </div>
            </div>
    )
};

const BookFinderWrapper = () => (
    <QueryClientProvider client={queryClient}>
        <BookFinder />
    </QueryClientProvider>
);

export default BookFinderWrapper;