import MagnetRefri from "../components/MagnetRefri";
import magnets from "../data/magnets.json"
export default function TuRefri() {
  return (
    <div className="w-full h-full flex flex-col">
      <img
        className="w-full mt-6 rounded-2xl object-cover shadow-md"
        src="/images/banner_coca_cola.avif"
        alt="coca-cola-banner"
      />
      <ul className="flex-grow grid grid-cols-2 grid-rows-3 gap-3 p-4">
        {magnets.map(item =>{
          return(
            <li>
              <MagnetRefri id={item.id} image={item.image} name={item.name} category={item.category} phone={item.phone}/>
            </li>
        )
        })}
      </ul>
    </div>
  );
}
