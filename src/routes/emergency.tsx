import { useFridgeContext } from "../context/fridge-color-context";

const entities = [
  { background: "#ffd401", text: "#152a43", number: 119, entity: "BOMBEROS" },
  { background: "#ff0c06", text: "#fbfefc", number: 132, entity: "CRUZ ROJA" },
  { background: "#0f993d", text: "#fbfefc", number: 112, entity: "POLICIA METROPOLITANA" },
  { background: "#a1a0a0", text: "#fbfefc", number: 136, entity: "CENTRO TOXILOGICO" },
  { background: "#0d7eca", text: "#fbfefc", number: 116, entity: "ACUEDUCTO Y ALCANTARILLADO" },
  { background: "#ff6600", text: "#fbfefc", number: 144, entity: "DEFENSA CIVIL" },
  { background: "#0c0c64", text: "#fbfefc", number: 125, entity: "EMERGENCIAS MEDICAS" },
  { background: "#99cc01", text: "#fbfefc", number: 127, entity: "POLICIA TRANSITO" },
  { background: "#fde69b", text: "#172d46", number: 164, entity: "GAS NATURAL" },
  { background: "#0066af", text: "#fbfefc", number: 115, entity: "CODENSA" }
];


export default function Emergency() {
  const { currentColor } = useFridgeContext()
  return (
    <div className="w-full px-3 pt-12 overflow-y-scroll h-full no-scrollbar">
      <h2 className="text-lg font-light" style={{ color: currentColor.textPrimaryColor}}>Ayuda inmediata</h2>
      <h1 className="text-4xl font-semibold pb-4" style={{ color: currentColor.textPrimaryColor}}>A un solo click</h1>
      <ul className="flex flex-col w-full gap-y-3 pb-20">
        {entities.map((item) => (
          <li
            key={item.number}
            style={{ backgroundColor: item.background, color: item.text }}
            onClick={() => window.location.href=`tel:${item.number}`}
            className="cursor-pointer py-3 px-6 rounded-md flex items-center text-md sm:text-xl h-20 font-bold max-w-full"
          >
            <span className="w-[30%] text-3xl sm:text-4xl font-extrabold pr-2 sm:pr-3">
              {item.number}
            </span>
            {item.entity}
          </li>
        ))}
      </ul>
    </div>
  );
}

