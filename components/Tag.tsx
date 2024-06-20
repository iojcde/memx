const Tag: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="transform rounded bg-neutral-900 px-2 py-1 text-xs text-white shadow transition hover:scale-105 dark:bg-secondary dark:text-white md:text-sm">
            {text}
        </div>
    )
}
export default Tag
