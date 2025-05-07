import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

const ProductCard = ({ product }) => {

    const { currency, router , toggleWishlist , wishlistIds } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product.id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer "
        >
            <div className="cursor-pointer group relative bg-white rounded-lg w-full h-52 flex items-center justify-center hover:scale-105 transition">
                <Image
                    src={product.image}
                    alt={"Loading"}
                    className=" object-contain w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                <button onClick={(e)=>{toggleWishlist(product.id); e.stopPropagation();} } className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                {wishlistIds.includes(product.id) ? (
                        <FaHeart className="text-red-600" />
                    ) : (
                        <FaRegHeart className='text-gray-700' />
                    )}
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{product.rating.rate}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.price}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard