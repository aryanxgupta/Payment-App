export function Button({label, onClick}){
    return(
      <div className='px-3 pt-3 pb-1 flex justify-center items-center'>
        <button onClick={onClick} className='w-[95%] py-4 mt-3 bg-[#2EC4B6] text-white font-bold text-2xl rounded-[2.3rem] shadow hover:bg-[#FF9F1C] transition-all duration-100 active:bg-[#FF9F1C]'>{label}</button>
      </div>
    )
}
  