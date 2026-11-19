
// PRODUTOS INICIAIS
let produtos = [
    {
        nome: "Mouse",
        categoria: "Informática",
        quantidade: 25,
        preco: 45.00
    },
    {
        nome: "Teclado",
        categoria: "Informática",
        quantidade: 4,
        preco: 65.00
    },
    {
        nome: "Papel A4",
        categoria: "Escritório",
        quantidade: 80,
        preco: 28.00
    }
];

// HISTÓRICO DE MOVIMENTAÇÕES
let totalMovimentacoes = 0;

// ELEMENTOS DO HTML
const formulario = document.getElementById("productForm");
const tabela = document.getElementById("listaProdutos");

// SALVAR PRODUTOS NO NAVEGADOR
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("movimentacoes", totalMovimentacoes);
}

// CARREGAR DADOS SALVOS
function carregarDados() {
    const dados = localStorage.getItem("produtos");
    const movimentacoesSalvas = localStorage.getItem("movimentacoes");

    if (dados !== null) {
        produtos = JSON.parse(dados);
    }

    if (movimentacoesSalvas !== null) {
        totalMovimentacoes = Number(movimentacoesSalvas);
    }
}

// ATUALIZAR INDICADORES
function atualizarIndicadores() {

    document.getElementById("totalProdutos").textContent = produtos.length;

    const baixoEstoque = produtos.filter(
        produto => produto.quantidade <= 5
    );

    document.getElementById("estoqueBaixo").textContent = baixoEstoque.length;

    document.getElementById("movimentacoes").textContent = totalMovimentacoes;
}

// MOSTRAR PRODUTOS NA TABELA
function mostrarProdutos() {

    tabela.innerHTML = "";

    produtos.forEach((produto) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
        `;

        tabela.appendChild(linha);
    });

    atualizarIndicadores();
}

// CADASTRAR PRODUTOS
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const preco = Number(document.getElementById("preco").value);

    if (nome === "" || categoria === "" ||
        quantidade < 0 || preco < 0 ||
        !Number.isFinite(quantidade) ||
        !Number.isFinite(preco)) {

        alert("Preencha os campos corretamente!");
        return;
    }

    const novoProduto = {
        nome: nome,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(novoProduto);

    totalMovimentacoes++;

    salvarDados();
    mostrarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// INICIALIZAÇÃO DO SISTEMA
carregarDados();
mostrarProdutos();
