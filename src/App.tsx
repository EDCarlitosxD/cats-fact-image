import { useEffect, useState } from "react";
import "./App.css";


const baseURL = "https://cataas.com/"
function App() {
  const [isGif, setIsGif] = useState(false);
  const [imageFactUrl,setImageFactUrl] = useState(null);
  const [fact,setFact] = useState("");
  const [textInput,setTextInput] = useState("");

  const changeIsGif = (event: React.ChangeEvent<HTMLInputElement>)=>{
    console.log(event.target.checked);
    setIsGif(event.target.checked);
  }

  useEffect(()=>{
    fetch("https://catfact.ninja/fact")
      .then(res => res.json())
      .then(data => setFact(data.fact))
       

  },[])

  const fetchFactImage = async() => {
      const isGifUrl = isGif ? "/gif" : `/says/${textInput}`
      const url = baseURL+"cat"+isGifUrl+"?json=true"

      const request = await fetch(url);
      const response = await request.json();
      
      setImageFactUrl(response.url)


  }


  return (
    <>
      <main className="mt-5">
        <h1 className="text-center text-2xl text-slate-100 font-bold mb-5">
          Hechos gatos
        </h1>

        <div className="w-[90%] mx-auto p-5 grid gap-4 bg-fuchsia-900">
          <img
            className="rounded-lg mx-auto"
            src="https://cataas.com/cat"
            alt="gatos imagen"
          />
          <p className="text-center text-gray-200">
            {
              fact!= "" ? fact : ""
            }
          </p>
        </div>
      </main>

      <section className="mt-5">
        <h2 className="text-center text-slate-100 text-2xl mb-5">
          Imagenes de gatos
        </h2>

        <div className="w-[90%] mx-auto p-5 grid gap-4 bg-fuchsia-900">

          <form className="grid gap-4">

            <div className="flex gap-2 justify-center items-center">
              <label className="text-white" htmlFor="isGif">
                Gif
              </label>
              <input onChange={e => changeIsGif(e)} type="checkbox" id="isGif" />
            </div>
          {
            !isGif ? (
            <div className="flex gap-2 justify-center items-center">
              <label className="text-white" htmlFor="text-in-image">Texto</label>
              <input 
                onChange={e =>setTextInput(e.target.value)}
                className="p-1 rounded-md" type="text" placeholder="Imagenes con texto"/>
            </div>


            ):""
          }
          </form>
            <button 
                onClick={fetchFactImage}

                className="bg-fuchsia-700 hover:bg-fuchsia-800 duration-200 rounded-lg text-gray-200 p-2">
              Generar Imagen
            </button>

              {
                imageFactUrl && <div>
                    <img className="m-auto" src={`${baseURL}${imageFactUrl}`} alt="" />
                </div>

              }

        </div>
          


      </section>
    </>
  );
}

export default App;
