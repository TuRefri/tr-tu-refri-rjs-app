;
import './SearchBarMap.css';
import FilterButtonSearchbarMap from './FilterButtonSearchBarMap';

export default function SearchBarMap() {
  return (
    <nav className='w-full flex flex-col gap-x-2'>
      <div className='w-full flex gap-x-2'>
        <FilterButtonSearchbarMap />
      </div>
    </nav>
  );
}
