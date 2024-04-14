"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';

import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

const GetMaxPlayers = () => {
    const [MaxPlayersData, setMaxPlayersData] = useState<number>();
    const [showMaxPlayers, setShowMaxPlayers] = useState(false);

    useEffect(() => {
        handleGetMaxPlayersData().then();
    }, []);
    const handleGetMaxPlayersData = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
            const MaxPlayers = await Web3.maxPlayers();
            setMaxPlayersData(MaxPlayers);
        } catch (error) {
            console.error('Error fetching players data:', error);
        }
    };

    const handleToggleMaxPlayers = () => {
        setShowMaxPlayers(!showMaxPlayers);
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="flex flex-col rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                    <div className="flex justify-between w-full items-center mb-4 sm:mb-0">
                        <div>
                            <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Fonction : Nombre maximum de joueur </h2>
                            <p className="text-gray-600">Permet de : Récupérer le nombre de joueur maximum</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                                onClick={handleToggleMaxPlayers}
                            >
                                {showMaxPlayers ? 'Cacher la limite de joueurs' : 'Voir la limite de joueurs'}
                            </button>
                        </div>
                    </div>
                </div>
                {showMaxPlayers && (
                    <div className="mt-8 bg-gray-200 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Résultat :</h2>
                        <ul>
                            <li className="text-gray-600">Nombre de joueur maximum: {MaxPlayersData?.toString()} joueurs</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetMaxPlayers;

