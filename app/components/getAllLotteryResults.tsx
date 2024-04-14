"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';

import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

interface LotteryResult {
    winner: string;
    reward: number; // En Wei
}

const GetAllLottery = () => {
    const [allLotteryData, setAllLotteryData] = useState<LotteryResult[]>([]);

    useEffect(() => {
        handleGetAllLotteryData().then();
        const myWindow: Window = window as unknown as Window;
        const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
        Web3.getSigner().then((signer) => {
            const contrat = Web3.getContract(signer);
            contrat.on('LotteryResultAdded', (...args) => {
                const eventValue = args.slice(0, 3).map((arg) => arg).join(" ");
                console.log(`Event : ${eventValue}`);
                let intervalId = setInterval(() => {
                    handleGetAllLotteryData().then();
                    clearInterval(intervalId)
                }, 2000)
            }).then()
        });
    }, []);

    const handleGetAllLotteryData = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService('0xe68A3c8FF152C8113104658Dae1BD9a1d1c1bD3d', JSON.stringify(ABI), myWindow.ethereum);
            const lotteryResults = await Web3.getAllLotteryResults();

            const formattedResults = lotteryResults.map(result => ({
                winner: result.winner,
                reward: parseInt(result.reward.toString())
            }));

            setAllLotteryData(formattedResults);
        } catch (error) {
            console.error('Error fetching lottery results:', error);
        }
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                {allLotteryData.length > 0 && (
                    <div className="mt-8 p-6 rounded-lg">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-indigo-500">Historique des tirages :</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="px-4 py-2 font-medium text-gray-900 text-center w-1/6">N°</th>
                                    <th className="px-4 py-2 font-medium text-gray-900 text-center">Gagnant</th>
                                    <th className="px-4 py-2 font-medium text-gray-900 text-center w-1/6">Récompense (Wei)</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {allLotteryData.map((result, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                                        <td className="px-4 py-2 text-center w-1/6">{index + 1}</td>
                                        <td className="px-4 py-2 text-center">{result.winner}</td>
                                        <td className="px-4 py-2 text-center w-1/6">{result.reward}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

};

export default GetAllLottery;
