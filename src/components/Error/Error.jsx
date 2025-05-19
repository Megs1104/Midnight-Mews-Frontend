function Error(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-45 h-45 bg-white rounded-full flex justify-center items-center">
            <img src="/errorLogo.jpeg" alt="Purple cat crying to show error" className="w-32 h-32"/>
         </div>
         <h2 className="mt-6 text-white text-xl">Error: Please try again later</h2>
        </div>
    )
}

export default Error;