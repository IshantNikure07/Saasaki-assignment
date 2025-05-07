'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import ProtectedRoutes from "@/components/ProtectedRoutes";

const AllProducts = () => {

    const { products, setProducts, fetchProductData , wishlistIds , dark , filteredData} = useAppContext();
    // const [filteredData , setFilteredData] = useState(products)
    
    useEffect(() => {
        fetchProductData()
    }, [])
    
    const handleSort = (type) => {
        const sorted = [...filteredData].sort((a, b) => {
            return type === "lowToHigh"
                ? a.price - b.price
                : type === "highToLow"
                    ? b.price - a.price
                    : 0;
        });
        setFilteredData(sorted);
    };
    const handleFilter = (value) => {
        if (value === "all") {
            setFilteredData(products)
        }else{
            const filtered = products.filter( item=> item.category === value )
         setFilteredData(filtered);
        }
       
    };

     useEffect(() => {
            localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
            console.log("wishlistIds" , wishlistIds)
          }, [wishlistIds]);

    return (
        <ProtectedRoutes>

        
        <section className={`${dark ? "bg-black text-white" : "bg-white text-black"}`}>
            <Navbar />
            <div className="flex flex-col  px-6 md:px-16 lg:px-32">
                <div className="flex justify-between w-full items-center ">
                    <div className="flex flex-col items-end pt-12">
                        <p className="text-2xl font-medium">All products</p>
                        <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                    </div>

                    <div className="flex gap-4 ">

                    <div className="w-fit mx-auto mt-12">
                        <select
                            onChange={(e) => handleFilter(e.target.value)}
                            defaultValue=""
                            className={`text-black px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none `}
                        >
                            <option value="" disabled hidden>
                                Filter by Category
                            </option>
                            <option value="all">All</option>
                            <option value="men's clothing">Men</option>
                            <option value="women's clothing">Women</option>
                            <option value="electronics">Electronics</option>
                            <option value="jewelery">Jewelery</option>
                        </select>
                    </div>

                    <div className="w-fit mt-12 ">
                        <select
                            onChange={(e) => handleSort(e.target.value)}
                            className="text-black px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Sort" hidden>Sort By Price</option>
                            <option value="lowToHigh">Low to High</option>
                            <option value="highToLow">High to Low</option>
                        </select>
                    </div>
                    </div>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {filteredData?.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </section>
        </ProtectedRoutes>
    );
};

export default AllProducts;
