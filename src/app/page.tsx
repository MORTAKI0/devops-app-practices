'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from('todo') // Table name (singular)
            .select('title')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching todos:', error.message);
        } else {
            setTodos(data.map((item) => item.title));
        }
    };

    const addTodo = async () => {
        if (!input.trim()) return;

        const { error } = await supabase
            .from('todo') // Table name
            .insert([{ title: input.trim() }]);

        if (error) {
            console.error('Error inserting todo:', error.message);
        } else {
            setInput('');
            fetchTodos();
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <main className="p-4 min-h-screen bg-black text-white">
            <h1 className="text-xl font-bold mb-4">My Todos</h1>
            <div className="flex items-center gap-2">
                <input
                    className="border p-2 text-black"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter todo"
                />
                <button className="bg-blue-500 px-4 py-2 text-white" onClick={addTodo}>
                    Add
                </button>
            </div>
            <ul className="mt-4">
                {todos.map((todo, index) => (
                    <li key={index} className="mt-2 border-b border-gray-700 pb-1">
                        {todo}
                    </li>
                ))}
            </ul>
        </main>
    );
}
