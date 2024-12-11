
interface SimpleLoadingComponentProps {
    loadingText: string;
    size?: string
    className?: string
}
export default function SimpleLoadingComponent({loadingText, className}: SimpleLoadingComponentProps) {
  return (
    <div className={`${className} h-full w-full flex flex-col justify-center items-center`}>
       <img src='/icons/progress-activity.svg' height={120} width={120} alt='loading icon' className="animate-spin" />
        <h1 className="pt-4 text-gray-500 font-medium">{loadingText}</h1>
    </div>
  )
}
