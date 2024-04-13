/*import React, { useEffect, useState } from 'react';
import { Lottery } from '@/app/services/lotteryService'; // Importez votre classe Lottery

const PreviousDraws = () => {
    const [draws, setDraws] = useState([]);

    // Fonction pour charger les tirages précédents
    const loadPreviousDraws = async () => {
        try {
            // Initialisez votre classe Lottery avec l'adresse du contrat et l'ABI
            const lottery = new Lottery(contractAddress, abi, ethereumProvider);

            // Obtenez le nombre total de tirages
            const totalDraws = await lottery.currentLotteryIndex();

            // Récupérez les détails de chaque tirage précédent
            const previousDraws = [];
            for (let i = 0; i < totalDraws; i++) {
                const draw = await lottery.lotteryResults(i);
                previousDraws.push(draw);
            }

            // Mettez à jour l'état avec les tirages précédents
            setDraws(previousDraws);
        } catch (error) {
            console.error('Erreur lors du chargement des tirages précédents :', error);
        }
    };

    // Chargez les tirages précédents au chargement du composant
    useEffect(() => {
        loadPreviousDraws();
    }, []);

    return (
        <div>
            <h2>Previous Draws</h2>
            <ul>
                {draws.map((draw, index) => (
                    <li key={index}>
                        <p>Winner: {draw.winner}</p>
                        <p>Reward: {draw.reward}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreviousDraws;*/
