'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {

    const { currency , orders ,dark } = useAppContext();
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (orders) {
            setLoading(false);
        } 
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <section className={`${dark ? "bg-black text-white" : "bg-white text-black"}`}>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? <Loading /> : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders?.map((order, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Image
                                        className="max-w-16 max-h-16 object-cover"
                                        src={order.image}
                                        alt="box_icon"
                                        width={80}
                                        height={80}
                                    />
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                            {order.name}
                                        </span>
                                        <span>Items : {order.quantity}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">Ishant Nikure</span>
                                        <br />
                                        <span >{` Address`}</span>
                                        <br />
                                        <span>{`Nagpur , Maharashtra`}</span>
                                        <br />
                                        <span>{`8788407623`}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{currency}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                        <span>Payment : Pending</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default MyOrders;