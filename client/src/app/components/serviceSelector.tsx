"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
export default function ServiceSelector() {
    const [selectedService, setSelectedService] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedService = localStorage.getItem("selectedService") || "gemini";
            setSelectedService(savedService);
        }
    }, []);

    useEffect(() => {
        if (selectedService !== null) {
            localStorage.setItem("selectedService", selectedService);
        }
    }, [selectedService]);

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newService = e.target.value;
        setSelectedService(newService);
        // Display toast when the service changes
        toast.success(`Service changed to: ${newService}`);
    };

    return (
        <div className="flex items-center  min-h-[70vh]">
            <form className="max-w-sm w-full mx-auto ">
                <label htmlFor="countries" className="text-xl text-center font-semibold py-5">Choose a Service:</label>
                <div className="py-3">
                    <select id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={selectedService || "gemini"}
                        onChange={handleServiceChange}
                    >
                        <option value="gemini">Gemini 1.5 Flash</option>
                        <option value="huggingface">Hugging Face</option>
                        <option value="eden">Eden</option>
                        <option value="deepseek">DeepSeek</option>
                        <option value="openai">OpenAI GPT-3.5-Turbo</option>
                        <option value="claude">Claude</option>
                    </select>
                </div>
            </form>
        </div>


    );
};