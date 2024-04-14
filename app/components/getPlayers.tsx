"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';

import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

const GetPlayers = () => {
    const [playersData, setPlayersData] = useState<string[]>([]);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    const handleGetPlayersData = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
            const players = await Web3.getPlayers();
            setPlayersData(players);
            setButtonClicked(true);
            console.log('Players data:', JSON.stringify(players));
        } catch (error) {
            console.error('Error fetching players data:', error);
        }
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                    <div>
                        <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Fonction : Liste des participants </h2>
                        <p className="text-gray-600">Permet de : Récupérer la liste des joueurs qui possèdent actuellement un ticket</p>
                    </div>
                    <button
                        className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                        onClick={handleGetPlayersData}
                    >
                        Voir liste des participants
                    </button>
                </div>
                {buttonClicked && (
                    <>
                        {playersData.length > 0 ? (
                            <div className="mt-8 bg-gray-200 p-6 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Résultat :</h2>
                                <ul>
                                    {playersData.map((player, index) => (
                                        <li key={index} className="text-gray-800">{player}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="mt-8 bg-gray-200 p-6 rounded-lg">
                                <h2 className="text-xl font-bold mb-4">Résultat :</h2>
                                <p className="text-gray-800">Aucun joueur n&apos;a encore acheté de ticket</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default GetPlayers;

