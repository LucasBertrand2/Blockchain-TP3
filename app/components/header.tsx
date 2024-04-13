import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <header className="flex items-center justify-between py-4 md:py-8">

                    <a href="/" className="flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">

                        <span>TP3/Blockchain - Lucas Bertrand</span>
                    </a>

                    <a href="https://github.com/LucasBertrand2/Blockchain-TP3" target="_blank"
                       className="inline-block rounded-lg bg-gray-900 px-6 md:px-8 py-3 flex items-center gap-2 text-sm md:text-base font-semibold text-white shadow-md hover:bg-gray-800">
                        <FaGithub className="text-gray-600"
                                  size={20}/>
                        <span
                            className="hidden md:inline-block">GitHub</span> {/* Texte masqué sur les petits écrans */}
                    </a>
                </header>
            </div>
        </div>
    );
}

export default Header;
