'use client';
import Image from "next/image"

export const Footer = () => {
    return(
        <div className="flex flex-col gap-3 p-4 w-full">
            <div className="flex gap-2 items-center">
            <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                <span>
                    First Pick Fit
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-muted-foreground text-xs">
                    © Copyright First Pick Fit 2024. All rights reserved.
                </p>
            </div>
        </div>
    )
}