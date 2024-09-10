import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([{ value: 0, weight: 0 }]);
  const [capacity, setCapacity] = useState(0);
  const [result, setResult] = useState(null);
  const [table, setTable] = useState(null);

  // Função para calcular o valor máximo da mochila
  const knapsack = (n, weights, values, W) => {
    let M = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));

    // Construindo a tabela M
    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        if (weights[i - 1] <= w) {
          M[i][w] = Math.max(
            M[i - 1][w],
            values[i - 1] + M[i - 1][w - weights[i - 1]]
          );
        } else {
          M[i][w] = M[i - 1][w];
        }
      }
    }

    // Recuperando os itens que foram incluídos
    let res = M[n][W];
    let w_remaining = W;
    let selectedItems = [];

    for (let i = n; i > 0 && res > 0; i--) {
      if (res === M[i - 1][w_remaining]) continue;
      else {
        selectedItems.push(i); // O item foi incluído
        res -= values[i - 1];
        w_remaining -= weights[i - 1];
      }
    }

    setTable(M); // Armazena a tabela para exibição
    return { maxValue: M[n][W], selectedItems };
  };

  // Função que lida com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = items.map((item) => parseInt(item.value));
    const weights = items.map((item) => parseInt(item.weight));
    const W = parseInt(capacity);
    const result = knapsack(items.length, weights, values, W);
    setResult(result);
  };

  // Função para adicionar um novo item
  const addItem = () => {
    setItems([...items, { value: 0, weight: 0 }]);
  };

  // Função para remover o último item
  const removeItem = () => {
    if (items.length > 1) {
      setItems(items.slice(0, -1));
    }
  };

  // Função para atualizar o item
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div
    className="flex w-screen h-screen justify-center items-center bg-black  flex-col p-20"
    >
    <div>
      <h1 className="text-6xl font-bold text-gold ">Knapsack</h1>
    </div>
    <div className="bg-black p-4 flex flex-col items-center justify-center flex-1">
      <form
      className="" 
      onSubmit={handleSubmit}>
        <label
        className="text-white text-3xl"
        >
          Capacidade da Mochila: 
          <input
          className="w-1/6 p-2 text-black rounded-xl border-black h-10 ml-5"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        <h3
        className="text-gold text-3xl mt-5"
        >Itens:</h3>
        {items.map((item, index) => (
          <div key={index}>
            <label
            className="text-white text-3xl"
            >
              Valor do Item {index + 1}:
              <input
              className="w-1/6 p-2 text-black h-10 rounded-xl border-black ml-5"
                type="number"
                value={item.value}
                onChange={(e) =>
                  handleItemChange(index, "value", e.target.value)
                }
              />
            </label>
            <label
            className="text-white ml-5 text-3xl"
            >
              Peso do Item {index + 1}:
              <input
                className="w-1/6 p-2 text-black rounded-xl h-10 border-black ml-5"
                type="number"
                value={item.weight}
                onChange={(e) =>
                  handleItemChange(index, "weight", e.target.value)
                }
              />
            </label>
          </div>
        ))}

<div className="flex flex-row justify-center mt-6">
  <button 
    className="text-white p-5 m-5 bg-gold rounded-xl hover:bg-goldDark h-10 flex items-center justify-center"
    type="button" onClick={addItem}>
    Adicionar Item
  </button>
  <button 
    className="text-white p-5 m-5 bg-gold rounded-xl hover:bg-goldDark h-10 flex items-center justify-center"
    type="button" onClick={removeItem}>
    Remover Último Item
  </button>
  <button 
    className="text-white p-5 m-5 bg-gold rounded-xl hover:bg-goldDark h-10 flex items-center justify-center"
    type="submit">
    Calcular
  </button>
</div>
      </form>

      {result && (
        <div>
          <h3
          className="text-gold font-bold text-xl"
          >Resultado:</h3>
          <p
          className="text-white"
          >Valor Máximo: {result.maxValue}</p>
          <p
          className="text-white"
          >Itens Selecionados: {result.selectedItems.join(", ")}</p>
        </div>
      )}

      {table && (
        <div className="mt-8">
          <h3 className="text-gold text-3xl">Tabela:</h3>
          <table className="table-auto border-collapse border border-gold mt-4">
            <tbody>
              {table.map((row, i) => (
                <tr key={i} className="border border-gold">
                  {row.map((val, j) => (
                    <td key={j} className="border border-gold p-2 text-center text-white">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  );
}

export default App;