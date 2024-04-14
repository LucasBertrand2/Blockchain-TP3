"use client"
import React, {useEffect, useState} from 'react';
import {LotteryService} from '@/app/services/lotteryService';

import {ABI, ADRESS} from "@/app/const";
import { Window } from "@/app/window";

const PickWinner = () => {
    const [error, setError] = useState<string>('');
    const [success , setSuccess] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    const handlePickWinner = async () => {
        try {
            const myWindow: Window = window as unknown as Window;
            const Web3 = new LotteryService(ADRESS, JSON.stringify(ABI), myWindow.ethereum);
            await Web3.pickWinner();
            setSuccess('Le gagnant a été choisi et a bien reçu sa récompense');
            setShowError(false);
        } catch (error) {
            setError("Error : Vous n'êtes pas le propriétaire du contrat ou il n'y a pas suffisamment de participants pour tirer au sort");
            setShowError(true);
        }
    };

    return (
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
                    <div>
                        <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Fonction : Tirage au sort (Propriétaire seulement) </h2>
                        <p className="text-gray-600">Permet de : Tirer au sort le gagnant une fois tous les tickets achetés</p>
                    </div>
                    <button
                        className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                        onClick={handlePickWinner}
                    >
                        Tirer un gagnant
                    </button>
                </div>
                {showError && (
                    <div className="mt-8 bg-red-200 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Erreur :</h2>
                        <p>{error}</p>
                    </div>
                )}
                {success && !showError && (
                    <div className="mt-8 bg-gray-200 p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">Résultat :</h2>
                        <ul>
                            <li>{success}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PickWinner;

