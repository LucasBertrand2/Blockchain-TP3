"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';
import {parseUnits} from "ethers";
import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

const BuyTicket = () => {
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleBuyTicket = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
            await Web3.buyTicket({value: 1, gasLimit: 1000000, maxPriorityFeePerGas: parseUnits('1', 'gwei') , maxFeePerGas: parseUnits('1', 'gwei')});
            setShowResult(true); // Afficher le bloc résultat
        } catch (error) {
            console.error('Error buying ticket:', error);
        }
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                    <div>
                        <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Fonction : Acheter un ticket</h2>
                        <p className="text-gray-600">Permet d&apos;acheter un ticket afin de participer à la lotterie</p>
                    </div>
                    <button
                        className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                        onClick={handleBuyTicket}
                    >
                        Acheter un ticket
                    </button>
                </div>
                {showResult && (
                    <div className="mt-8 bg-gray-200 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Résultat de l&apos;achat de ticket :</h2>
                        <p className="text-gray-600">Voir via l&apos;extension MetaMask si la transaction est passée ou non</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyTicket;

