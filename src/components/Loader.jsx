// components/Loader.jsx
export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-dashed border-gray-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
