"use client"
import { useEffect, useState } from "react";

type ItensCarrinho ={
  check: boolean;
  label: string;
}

const page = ()=>{
  const [checkCounter, setcheckCounter] = useState<number>(0);
  const [item, setItem] = useState<string>("");
  const [listaCompras, setlistaCompras] = useState<ItensCarrinho[]>([]);
  
  useEffect(()=>{
    const listaSalva = localStorage.getItem("listaCompras");
    if(listaSalva)
      setlistaCompras(JSON.parse(listaSalva));
  },[]);

  const saveLista = (listaCompras: ItensCarrinho[]) =>{
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
  }

  const updateCounter = (newLista: ItensCarrinho[]) =>{
    const count = newLista.filter((item) => item.check).length;
    setcheckCounter(count);
  }

  const handleAdicionar = (item:string) => {
    if(item.trim() == "") return;
    const newLista = [...listaCompras,{check:false,label: item}];
    setlistaCompras(newLista);
    saveLista(newLista);
    setItem("");
  };
  
  const handleDeletar = (id: number) =>{
    const newLista = (listaCompras.filter((item, index) => index !== id));
    setlistaCompras(newLista);
    saveLista(newLista);
    updateCounter(newLista);
  }
  
  const handleCheck = (id: number) =>{
    const newLista = listaCompras.map((item, index)=>{
      if (index == id){
        return({...item, check:!item.check});
      }
      return(item);
    });
    setlistaCompras(newLista);
    saveLista(newLista);
    updateCounter(newLista);
  }
  
  const handleApagarLista = () => {
    setlistaCompras([]);
    saveLista([]);
    setcheckCounter(0);
  }
  
  const handleApagarCarrinho = () => {
    const newLista = listaCompras.filter((item) => item.check != true);
    setlistaCompras(newLista);
    saveLista(newLista);
    setcheckCounter(0);
  }

  return(
    <div className="w-screen h-screen flex flex-col items-center bg-black text-white pt-2">
      <h3 className="text-3xl">Lista de Compras</h3>
      <div className="border-solid border-1 border-slate-600 bg-slate-600 rounded-t-md mt-2 p-3 w-96 flex">
          <input onKeyDown={(e)=>{if(e.key==="Enter"){handleAdicionar(item)}}} className="grow rounded-md p-2 text-black" type="text" placeholder="O que deseja comprar?" value={item} onChange={e => setItem(e.target.value)}/>
          <button className="ml-2 p-2 rounded-md border-solid border-2 active:bg-blue-400" onClick={e=>handleAdicionar(item)}>Adicionar</button>
      </div>
      <div className="w-96 grid bg-slate-300 text-black">
        <p className="mt-2 justify-self-center"> Itens na lista: {listaCompras.length}</p>
        <ul className="list-disc ml-2 my-2">
          {listaCompras.map((item, index)=>
            <li key={index} className="flex items-center mt-1">
              <input type="checkbox" checked={item.check} className="pt-2 mr-2 w-4 h-4 rounded-md" onChange={e => handleCheck(index)}/>
              <p className={item.check?"line-through decoration-2":""} onClick={e => handleCheck(index)}>{item.label}</p>
              <p className="mx-2">-</p>
              <button className="px-2 rounded-md border-solid border-2 border-black active:bg-red-400" onClick={e => handleDeletar(index)}>deletar</button>
            </li>
          )}
        </ul>
        <p className="mb-2 justify-self-center">Itens no carrinho: {checkCounter} | Itens restantes: {listaCompras.length-checkCounter}</p>
      </div>
      <div className="border-solid border-1 border-slate-600 bg-slate-600 rounded-b-md p-3 flex space-x-2 items-center justify-center w-96">
          <button className="p-2 rounded-md border-solid border-2 border-sky active:bg-green-400" onClick={e=>handleApagarCarrinho()}>Apagar carrinho</button>
          <button className="p-2 rounded-md border-solid border-2 border-sky active:bg-red-400" onClick={e=>handleApagarLista()}>Apagar lista</button>
      </div>
    </div>
  );
}

export default page;
