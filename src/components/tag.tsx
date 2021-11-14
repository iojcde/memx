const Tag: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="bg-gray-900 dark:bg-secondary dark:text-white px-2 py-1 text-xs md:text-sm rounded text-white shadow transform hover:scale-105 transition duration-300">
      {text}
    </div>
  );
};
export default Tag;
