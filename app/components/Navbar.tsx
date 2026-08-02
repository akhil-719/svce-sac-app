export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-md">
      <span className="font-bold text-gray-900">SVCE SAC</span>
      <a href="#" className="text-sm text-gray-700 hover:text-black">Technical</a>
      <a href="#" className="text-sm text-gray-700 hover:text-black">Cultural</a>
      <a href="#" className="text-sm text-gray-700 hover:text-black">Sports</a>
      <button className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800">
        Get Event Pass
      </button>
    </nav>
  );
}