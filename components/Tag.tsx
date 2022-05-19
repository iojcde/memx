const Tag: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="dark:bg-secondary transform rounded bg-gray-900 px-2 py-1 text-xs text-white shadow transition duration-300 hover:scale-105 dark:text-white md:text-sm">
      {text}
    </div>
  )
}
export default Tag
