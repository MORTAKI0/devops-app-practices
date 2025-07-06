'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
    const [todos, setTodos] = useState<{ id: string; title: string; completed: boolean }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const fetchTodos = async () => {
        try {
            const { data, error } = await supabase
                .from('todo')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setTodos(data.map((item) => ({
                    id: item.id,
                    title: item.title,
                    completed: item.completed || false
                })));
            } else {
                console.error('❌ Error fetching todos:', error?.message);
            }
        } catch (error) {
            console.error('❌ Error fetching todos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addTodo = async () => {
        if (!input.trim()) return;

        try {
            const { error } = await supabase
                .from('todo')
                .insert([{ title: input.trim(), completed: false }]);

            if (!error) {
                setInput('');
                fetchTodos();
            } else {
                console.error('❌ Error inserting todo:', error.message);
            }
        } catch (error) {
            console.error('❌ Error inserting todo:', error);
        }
    };

    const toggleTodo = async (id: string, completed: boolean) => {
        try {
            const { error } = await supabase
                .from('todo')
                .update({ completed: !completed })
                .eq('id', id);

            if (!error) {
                fetchTodos();
            }
        } catch (error) {
            console.error('❌ Error updating todo:', error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            const { error } = await supabase
                .from('todo')
                .delete()
                .eq('id', id);

            if (!error) {
                fetchTodos();
            }
        } catch (error) {
            console.error('❌ Error deleting todo:', error);
        }
    };

    useEffect(() => {
        if (isMounted) {
            fetchTodos();
        }
    }, [isMounted]);

    const filteredTodos = todos.filter(todo => {
        if (activeTab === 'active') return !todo.completed;
        if (activeTab === 'completed') return todo.completed;
        return true;
    });

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    // Prevent hydration mismatch by not rendering dynamic content until mounted
    if (!isMounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-white/20 h-4 w-4"></div>
                    <div className="rounded-full bg-white/20 h-4 w-4"></div>
                    <div className="rounded-full bg-white/20 h-4 w-4"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl">
                        <span className="text-3xl">✨</span>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Todo Galaxy
                    </h1>
                    <p className="text-gray-300 text-lg">Organize your universe, one task at a time</p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto grid md:grid-cols-[300px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 h-fit sticky top-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
                                🚀
                            </div>
                            <h2 className="text-xl font-semibold text-white">Sundar Gurung</h2>
                            <p className="text-gray-400">sundar@todo.dev</p>
                        </div>

                        {/* Stats */}
                        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-1">{totalCount}</div>
                                <div className="text-sm text-gray-400">Total Tasks</div>
                            </div>
                            <div className="flex justify-between mt-4 text-sm">
                                <div className="text-green-400">
                                    ✅ {completedCount} Done
                                </div>
                                <div className="text-yellow-400">
                                    ⏳ {totalCount - completedCount} Pending
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-2">
                            {[
                                { id: 'all', icon: '📋', label: 'All Tasks' },
                                { id: 'active', icon: '🔥', label: 'Active' },
                                { id: 'completed', icon: '✅', label: 'Completed' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                                        activeTab === item.id
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Section */}
                    <section className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-white">
                                Welcome back 👋
                            </h2>
                            <div className="text-sm text-gray-400">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="relative mb-8">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="✨ Add a new task to your galaxy..."
                                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                                />
                                <button
                                    onClick={addTodo}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
                                    disabled={!input.trim()}
                                >
                                    Add ✨
                                </button>
                            </div>
                        </div>

                        {/* Todo List */}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="relative">
                                    <div className="w-12 h-12 border-4 border-purple-500/30 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-12 h-12 border-4 border-purple-500 rounded-full animate-ping"></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredTodos.length === 0 ? (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">
                                            {activeTab === 'completed' ? '🎉' : '🌟'}
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            {activeTab === 'completed'
                                                ? 'No completed tasks yet'
                                                : activeTab === 'active'
                                                    ? 'No active tasks'
                                                    : 'No tasks yet'}
                                        </h3>
                                        <p className="text-gray-400">
                                            {activeTab === 'completed'
                                                ? 'Complete some tasks to see them here!'
                                                : 'Add your first task above to get started!'}
                                        </p>
                                    </div>
                                ) : (
                                    filteredTodos.map((todo, index) => (
                                        <div
                                            key={todo.id}
                                            className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] ${
                                                todo.completed ? 'opacity-75' : ''
                                            }`}
                                            style={{
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleTodo(todo.id, todo.completed)}
                                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                                                        todo.completed
                                                            ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-400'
                                                            : 'border-gray-400 hover:border-purple-400'
                                                    }`}
                                                >
                                                    {todo.completed && (
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <div className="flex-1">
                                                    <p className={`text-lg ${
                                                        todo.completed
                                                            ? 'text-gray-400 line-through'
                                                            : 'text-white'
                                                    }`}>
                                                        {todo.title}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    className="opacity-0 group-hover:opacity-100 w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}