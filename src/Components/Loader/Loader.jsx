import './Loader.scss';

export default function Loader() {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <div style={{ '--i': 1 }} className='loader_item'></div>
        <div style={{ '--i': 2 }} className='loader_item'></div>
        <div style={{ '--i': 3 }} className='loader_item'></div>
        <div style={{ '--i': 4 }} className='loader_item'></div>
        <div style={{ '--i': 5 }} className='loader_item'></div>
        <div style={{ '--i': 6 }} className='loader_item'></div>
        <div style={{ '--i': 7 }} className='loader_item'></div>
        <div style={{ '--i': 8 }} className='loader_item'></div>
        <div style={{ '--i': 9 }} className='loader_item'></div>
        <div style={{ '--i': 10 }} className='loader_item'></div>
        <div style={{ '--i': 11 }} className='loader_item'></div>
        <div style={{ '--i': 12 }} className='loader_item'></div>
      </div>
    </div>
  );
}
