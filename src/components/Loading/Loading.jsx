
function Loading(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-45 h-45 bg-white rounded-full flex justify-center items-center">
            <img src="/iconLogo.png" alt="Purple cat swirling to show loading" className="w-32 h-32 animate-spin"/>
         </div>
         <h2 className="mt-6 text-white text-xl">Loading...</h2>
        </div>
    )
}

export default Loading;