"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';

import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

interface LotteryResult {
    winner: string;
    reward: number; // En Wei
}

interface Props {
    index: number;
}

const GetOneLottery = ({ index }: Props) => {
    const [oneLotteryData, setOneLotteryData] = useState<LotteryResult | null>(null);

    useEffect(() => {
        handleGetOneLotteryData().then();
    }, []);

    const handleGetOneLotteryData = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
            const lotteryResult = await Web3.getLotteryResult(index - 1);

            const formattedResult = {
                winner: lotteryResult.winner,
                reward: parseInt(lotteryResult.reward.toString())
            };

            setOneLotteryData(formattedResult);
        } catch (error) {
            console.error('Error fetching lottery result:', error);
        }
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="mt-8 p-6 rounded-lg">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-indigo-500">Résultat de la loterie :</h2>
                    {oneLotteryData ? (
                        <div className="flex flex-col items-center">
                            <p className="text-lg text-gray-900">Gagnant : {oneLotteryData.winner}</p>
                            <p className="text-lg text-gray-900">Récompense (Wei) : {oneLotteryData.reward}</p>
                        </div>
                    ) : (
                        <p className="text-lg text-gray-900 text-center">Erreur : l&apos;index n&apos;est pas bon</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetOneLottery;
