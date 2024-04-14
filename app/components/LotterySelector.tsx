"use client"
import React, { useState } from 'react';
import GetOneLottery from '@/app/components/getLotteryResults';

const LotteryResultSelector = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSelect = () => {
        const index = parseInt(inputValue, 10);
        if (!isNaN(index)) {
            setSelectedIndex(index);
            setInputValue('');
        } else {
            alert('Veuillez saisir un nombre valide.');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-500">Sélectionner un résultat de loterie :</h2>
            <div className="mb-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 mr-2"
                    placeholder="Saisissez l'index"
                />
                <button onClick={handleSelect} className="bg-indigo-500 text-white px-4 py-2 rounded">Afficher</button>
            </div>
            {selectedIndex !== null && <GetOneLottery index={selectedIndex} key={selectedIndex} />}
        </div>
    );
};

export default LotteryResultSelector;
