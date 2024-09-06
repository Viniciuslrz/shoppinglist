"use client"
import { useState } from "react";

type Tarefas ={
  check:boolean;
  label: string;
}

const page = ()=>{
  const [checkCounter, setcheckCounter] = useState<number>(0);
  const [tarefa, setTarefa] = useState<string>("");
  const [listaTarefas, setlistaTarefas] = useState<Tarefas[]>([]);
  const handleAdicionar = (tarefa:string) => {
    if(tarefa.trim() == "") return;
    setlistaTarefas([...listaTarefas,{check:false,label: tarefa}]);
    setTarefa("");
  };
  const handleRemover = (id: number) =>{
    const newLista = (listaTarefas.filter((tarefa, index) => index !== id));
    setcheckCounter(checkCounter=>0);
    setlistaTarefas(newLista);
    newLista.map((tarefa) => {
      if(tarefa.check == true){
        setcheckCounter(checkCounter=>checkCounter+1);
      }
    });
  }
  const handleCheck = (id: number) =>{
    const newLista = listaTarefas.map((tarefa, index)=>{
      if (index == id){
        return({...tarefa, check:!tarefa.check});
      }
      return(tarefa);
    });
    setlistaTarefas(newLista);
    setcheckCounter(checkCounter=>0);
    newLista.map((tarefa) => {
      if(tarefa.check == true){
        setcheckCounter(checkCounter=>checkCounter+1);
      }
    });
  }
  const handleLimpar = () => {
    setlistaTarefas([]);
    setcheckCounter(0);
  }
  const handleConcluidos = () => {
    setlistaTarefas(listaTarefas.filter((tarefa) => tarefa.check != true));
    setcheckCounter(0);
  }

  return(
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white">
      <h3 className="text-3xl">Lista de Tarefas</h3>
      <div className="border-solid border-1 border-slate-600 bg-slate-600 rounded-t-md mt-2 p-3 w-96 flex">
          <input onKeyDown={(e)=>{if(e.key==="Enter"){handleAdicionar(tarefa)}}} className="grow rounded-md p-2 text-black" type="text" placeholder="O que deseja fazer?" value={tarefa} onChange={e => setTarefa(e.target.value)}/>
          <button className="ml-2 p-2 rounded-md border-solid border-2 hover:bg-blue-400" onClick={e=>handleAdicionar(tarefa)}>Adicionar</button>
      </div>
      <div className="w-96 grid bg-slate-300 text-black">
        <p className="mt-2 justify-self-center"> Itens na lista: {listaTarefas.length}</p>
        <ul className="list-disc ml-2 my-2">
          {listaTarefas.map((tarefa, index)=>
            <li key={index} className="flex items-center mt-1">
              <input type="checkbox" checked={tarefa.check} className="pt-2 mr-2 w-4 h-4 rounded-md" onChange={e => handleCheck(index)}/>
              <p className={tarefa.check?"line-through decoration-2":""} onClick={e => handleCheck(index)}>{tarefa.label}</p>
              <p className="mx-2">-</p>
              <button className="px-2 rounded-md border-solid border-2 border-black hover:bg-red-400" onClick={e => handleRemover(index)}>deletar</button>
            </li>
          )}
        </ul>
        <p className="mb-2 justify-self-center">Itens concluídos: {checkCounter} | Itens restantes: {listaTarefas.length-checkCounter}</p>
      </div>
      <div className="border-solid border-1 border-slate-600 bg-slate-600 rounded-b-md p-3 flex space-x-2 items-center justify-center w-96">
          <button className="p-2 rounded-md border-solid border-2 border-sky hover:bg-green-400" onClick={e=>handleConcluidos()}>Limpar concluídos</button>
          <button className="p-2 rounded-md border-solid border-2 border-sky hover:bg-red-400" onClick={e=>handleLimpar()}>Limpar lista</button>
      </div>
    </div>
  );
}

export default page;