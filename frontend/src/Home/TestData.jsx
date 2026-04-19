import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  Zap, 
  Clock, 
  CheckCircle2,
  LayoutGrid,
  Filter
} from 'lucide-react';
import axiosClient from "../utils/axisoClient";

const TestData = () => {
    const [testData, setTestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get("/test/getAllTest");
                setTestData(response.data);
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredTests = testData.filter(test => 
        test.TestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.ClassName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20 font-sans md:mt-8">
            {/* --- Premium Navigation/Header --- */}
            <div className="bg-[#1e293b]/50 backdrop-blur-md sticky top-0 z-50 border-b border-blue-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                            <Zap size={24} className="text-white fill-current" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            TEST<span className="text-blue-500">PORTAL</span>
                        </h1>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search assessments..." 
                            className="w-full bg-[#0f172a] border border-slate-700 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* --- Hero Section --- */}
            <header className="max-w-7xl mx-auto px-6 pt-12 pb-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="h-px w-8 bg-blue-500"></span>
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Student Dashboard</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                    Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Mock Tests</span>
                </h2>
                <p className="text-slate-400 max-w-2xl">
                    Select a module to begin your assessment. Your progress is automatically saved.
                </p>
            </header>

            {/* --- Main Content --- */}
            <main className="max-w-7xl mx-auto px-6 mt-6">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-[#1e293b] rounded-3xl animate-pulse border border-slate-800"></div>
                        ))}
                    </div>
                ) : filteredTests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTests.map((data, index) => (
                            <div 
                                key={index} 
                                className="group relative bg-[#1e293b] rounded-[2rem] border border-slate-800 p-8 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
                            >
                                {/* Background Glow Effect */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-[#0f172a] rounded-2xl border border-slate-700">
                                            <BookOpen size={24} className="text-blue-400" />
                                        </div>
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase">
                                            {data.ClassName || "General"}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {data.TestName}
                                    </h3>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <Clock size={14} className="text-blue-500" />
                                            <span>Duration: 45 Mins</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <CheckCircle2 size={14} className="text-blue-500" />
                                            <span>Full Marks: 100</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/test/attempt/${data._id}`)}
                                        className="w-full py-4 bg-[#0f172a] hover:bg-blue-600 text-white font-bold rounded-2xl border border-slate-700 hover:border-blue-500 flex items-center justify-center gap-2 transition-all group/btn"
                                    >
                                        Attempt Now
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#1e293b] rounded-[3rem] border border-slate-800">
                        <Filter size={48} className="mx-auto text-slate-700 mb-4" />
                        <h3 className="text-xl font-bold text-white">No matches found</h3>
                        <p className="text-slate-500">Try adjusting your search criteria.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TestData;