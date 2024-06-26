"use client"
import Header from "@/app/components/header";
import React, {useEffect, useState} from "react";
import Image from 'next/image';
import Gambling from "@/app/images/illustration-gambling.png";

import GetPlayers from "@/app/components/getPlayers";
import BuyTicket from "@/app/components/buyTicket";
import PickWinner from "@/app/components/pickWinner";
import GetAllLottery from "@/app/components/getAllLotteryResults";
import GetTicketPrice from "@/app/components/getTicketPrice";
import GetMaxPlayers from "@/app/components/getMaxPlayers";
import LotteryResultSelector from "@/app/components/LotterySelector";

import {Window} from "@/app/window";



export default function Home() {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const checkMetaMaskConnection = async () => {
            const myWindow: Window = window as unknown as Window;
            if (myWindow.ethereum === undefined) {
                console.log('MetaMask n\'est pas installé');
                setIsConnected(false)
            }
            else {
                console.log('MetaMask est installé');
                setIsConnected(true)
            }
        };

        checkMetaMaskConnection();
    }, []);

    return (
        <main>
            <Header />
            <section className="flex flex-col-reverse justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
                    <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Un jeu d&apos;argent simple</p>

                    <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Tirage au sort</h1>

                    <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">Le principe est simple: chaque joueur achète un ticket (2 dans ce cas pour simplifier le test) puis le Owner lance un tirage au sort entre les joueurs, le gagnant remporte la somme du prix de tous les tickets</p>

                    <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                        <a href="https://sepolia.etherscan.io//address/0xd7Ffe941BEe9910B0a6900E170fc1931fE1CE31F" target="_blank" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Etherscan</a>
                    </div>
                </div>
                <div className="h-96 lg:h-auto lg:w-5/12">
                    <div className="relative w-full h-full">
                        <Image
                            src={Gambling}
                            alt="Gambling image"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </section>
            { isConnected ? (
                <>
                    <GetAllLottery />
                    <LotteryResultSelector />
                    <GetTicketPrice />
                    <GetMaxPlayers />
                    <GetPlayers />
                    <BuyTicket />
                    <PickWinner />
                </>
            ) : (
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                        <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                            <div>
                                <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Vous n&apos;êtes pas connecté à Métamask</h2>
                                <p className="text-gray-600">Connectez-vous et rafraichissez la page</p>
                            </div>
                            <a href="https://metamask.io/" target="_blank" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Installer MetaMask</a>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
