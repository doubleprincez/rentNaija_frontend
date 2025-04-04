import {Suspense} from 'react';
import ApartmentClient from '@/features/landing/components/ApartmentClient';
import {Loader2Icon} from 'lucide-react';
import {AxiosApiServer} from "@/lib/server-utils";
import {baseURL} from "@/../next.config";
import {Metadata} from "next";

export default async function Page({params}: any) {

    const {id} = await params;
    const response = await AxiosApiServer().get(`${baseURL}/apartment/${id}`);
    const apartment = response.data.data;

    // Dynamically update metadata based on fetched apartment data
    const metadata: Metadata = {
        title: apartment.name || "Apartment Details",
        description: apartment.description || "Explore this beautiful apartment available for rent.",
        openGraph: {
            url: `${baseURL}/apartment/${id}`,
            title: apartment.name || "Apartment Details",
            description: apartment.description || "Explore this beautiful apartment available for rent.",
            images: [
                {
                    url: apartment.image || 'default-image-url.jpg', // Set a default image if not provided
                    width: 800,
                    height: 600,
                    alt: apartment.name || "Apartment Image",
                    type: 'image/jpeg',
                },
            ],
            siteName: "RentNow.ng",
        },
        twitter: {
            card: "summary_large_image",
            site: "@RentNowNG",
            title: apartment.name || "Apartment Details",
            description: apartment.description || "Explore this beautiful apartment available for rent.",
            image: apartment.image || 'default-image-url.jpg', // Set a default image if not provided
        },
    };

    return (
        <>
            {/* You can pass the metadata to the head here or use a head manager */}
            {/* Example: */}
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description}/>
                {/* Add OpenGraph and Twitter meta tags here */}
            </head>

            <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
                <Loader2Icon className="animate-spin"/> &nbsp;Loading...
            </div>}>
                <ApartmentClient prevApartment={apartment}/>
            </Suspense>
        </>
    );
}