export function InputBox({label, placeholder, onChange}){
    return(
      <div className="px-3 text-[#003049]">
        <div className='text-lg font-sans font-semibold px-3 mt-2 py-1'>{label}</div>
        <div className='px-3'>
          <input type="text" placeholder={placeholder} onChange={onChange} className='w-[100%] shadow px-3 py-3 rounded-xl outline-none border-2 border-solid border-[#DCDCDC] font-mono'/>
        </div>
      </div>
    )
}