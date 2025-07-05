'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from('todo')
            .select('title')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setTodos(data.map((item) => item.title));
        } else {
            console.error('❌ Error fetching todos:', error?.message);
        }
    };

    const addTodo = async () => {
        if (!input.trim()) return;

        const { error } = await supabase
            .from('todo')
            .insert([{ title: input.trim() }]);

        if (!error) {
            setInput('');
            fetchTodos();
        } else {
            console.error('❌ Error inserting todo:', error.message);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <main className="flex justify-center items-start pt-16 px-4">
            <div className="w-full max-w-4xl grid md:grid-cols-[240px_1fr] gap-6">
                {/* Sidebar */}
                <aside className="bg-gray-800 rounded-xl p-5 space-y-4 shadow-md h-fit">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center text-3xl font-bold">
                            🚀
                        </div>
                        <h2 className="text-lg font-semibold">Sundar Gurung</h2>
                        <p className="text-sm text-gray-400">sundar@todo.dev</p>
                    </div>
                    <nav className="space-y-2 pt-4">
                        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition">📋 Dashboard</button>
                        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition">📌 My Tasks</button>
                        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition">📂 Categories</button>
                        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition">⚙️ Settings</button>
                    </nav>
                </aside>

                {/* Main Content */}
                <section className="bg-gray-800 rounded-xl p-6 space-y-6 shadow-md">
                    <h1 className="text-3xl font-bold">Welcome back 👋</h1>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            className="flex-1 p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add a new todo..."
                        />
                        <button
                            onClick={addTodo}
                            className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-semibold"
                        >
                            Add
                        </button>
                    </div>

                    <ul className="space-y-3">
                        {todos.map((todo, index) => (
                            <li
                                key={index}
                                className="bg-gray-700 px-4 py-3 rounded-lg border border-gray-600 shadow-sm"
                            >
                                {todo}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}
