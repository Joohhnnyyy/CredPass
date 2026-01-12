import TodoList from "@/components/TodoList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-white/50 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
      <TodoList />
    </div>
  );
}
