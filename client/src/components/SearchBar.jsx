import { Users, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';


const SearchBar = ({ onSearch }) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-0">
                {/* Check-in Date */}
                <div className="flex items-center gap-3 px-6 py-2 flex-1 border-r border-gray-200">
                    <Calendar className="w-6 h-6 text-[#14b8a6] flex-shrink-0" />
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Check-in</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full border-none outline-none bg-transparent text-gray-900 cursor-pointer"
                            placeholder="Add date"
                        />
                    </div>
                </div>

                {/* Check-out Date */}
                <div className="flex items-center gap-3 px-6 py-2 flex-1 border-r border-gray-200">
                    <Calendar className="w-6 h-6 text-[#14b8a6] flex-shrink-0" />
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Check-out</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full border-none outline-none bg-transparent text-gray-900 cursor-pointer"
                            placeholder="Add date"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-3 px-6 py-2 flex-1">
                    <Users className="w-6 h-6 text-[#14b8a6] flex-shrink-0" />
                    <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">Guests</label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full border-none outline-none bg-transparent text-gray-900 cursor-pointer"
                        >
                            <option value="">Add guests</option>
                            <option value="1">1 guest</option>
                            <option value="2">2 guests</option>
                            <option value="3">3 guests</option>
                            <option value="4">4 guests</option>
                            <option value="5">5 guests</option>
                            <option value="6">6 guests</option>
                            <option value="7">7 guests</option>
                            <option value="8">8+ guests</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="pl-4">
                    <Button
                        onClick={() => onSearch({ checkIn, checkOut, guests })}
                        className="px-8 py-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                        style={{
                            backgroundColor: '#fbbf24',
                            color: '#000',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f59e0b';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fbbf24';
                        }}
                    >
                        <Search className="w-5 h-5 mr-2" />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar