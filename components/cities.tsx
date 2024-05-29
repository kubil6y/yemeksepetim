import Image from "next/image";
import Link from "next/link";

const citiesData = [
    {
        id: 0,
        name: "Ankara",
        imageSrc: "/assets/cities/ankara.webp",
        href: "/cities/ankara",
    },
    {
        id: 1,
        name: "Antalya",
        imageSrc: "/assets/cities/antalya.webp",
        href: "/cities/antalya",
    },
    {
        id: 2,
        name: "Bursa",
        imageSrc: "/assets/cities/bursa.webp",
        href: "/cities/bursa",
    },
    {
        id: 3,
        name: "Istanbul",
        imageSrc: "/assets/cities/istanbul.webp",
        href: "/cities/istanbul",
    },
    {
        id: 4,
        name: "Izmir",
        imageSrc: "/assets/cities/izmir.webp",
        href: "/cities/izmir",
    },
];

export const Cities = () => {
    return (
        <div className="container space-y-8 mb-8">
            <h3 className="text-3xl font-semibold">
                We are in every city of Türkiye!
            </h3>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {citiesData.map((city) => (
                    <CityCard
                        key={city.id}
                        name={city.name}
                        imageSrc={city.imageSrc}
                        href={"/restaurants"}
                    />
                ))}
            </div>
        </div>
    );
};

type CityCardProps = {
    name: string;
    imageSrc: string;
    href: string;
};

const CityCard = ({ name, imageSrc, href }: CityCardProps) => {
    return (
        <Link
            href={href}
            className="group relative h-[240px] overflow-hidden rounded-xl shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
            <div className="absolute bottom-4 left-4 z-10 rounded-lg bg-white px-4 py-2 shadow-xl transition group-focus:outline-none group-focus:ring-2 group-focus:ring-ring group-focus:ring-offset-2">
                <p className="capitalize text-primary">{name}</p>
            </div>
            <Image
                src={imageSrc}
                alt={name}
                className="h-auto w-full cursor-pointer transition duration-500 hover:scale-110"
                fill
                sizes="50vw"
            />
        </Link>
    );
};
