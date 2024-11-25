const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'chave-secreta',
        resave: false,
        saveUninitialized: true,
    })
);

const porta = 3000;
const host = '0.0.0.0';

let listaProdutos = [];

function verificarAutenticacao(req, resp, next) {
    if (req.session.autenticado) {
        next();
    } else {
        resp.redirect('/login');
    }
}

app.get('/login', (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Login</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: black;
                        color: white;
                    }
                    .container {
                        background-color: #8B0000;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    fieldset {
                        border: 2px solid red;
                    }
                    legend {
                        color: white;
                    }
                    .btn-red {
                        background-color: red;
                        color: white;
                        border: none;
                    }
                    .btn-red:hover {
                        background-color: darkred;
                    }
                </style>
            </head>
            <body>
                <div class="container w-25 mt-5">
                    <form action='/login' method='POST' class="row g-3 needs-validation" novalidate>
                        <fieldset class="border p-2">
                            <legend class="mb-3">Autenticação do Sistema</legend>
                            <div class="col-md-12">
                                <label for="usuario" class="form-label">Usuário:</label>
                                <input type="text" class="form-control" id="usuario" name="usuario" required>
                            </div>
                            <div class="col-md-12">
                                <label for="senha" class="form-label">Senha:</label>
                                <input type="password" class="form-control" id="senha" name="senha" required>
                            </div>
                            <div class="col-12 mt-2">
                                <button class="btn btn-red" type="submit">Login</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </body>
        </html>
    `);
});

app.post('/login', (req, resp) => {
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === '123') {
        req.session.autenticado = true;
        resp.redirect('/');
    } else {
        resp.send(`
            <div class="alert alert-danger" role="alert">
                Usuário ou senha inválidos!
            </div>
            <a href="/login" class="btn btn-red">Tentar Novamente</a>
        `);
    }
});

app.get('/logout', (req, resp) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
        }
        resp.redirect('/login');
    });
});

app.get('/', verificarAutenticacao, (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Bem-vindo</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: black;
                        color: white;
                    }
                    .container {
                        background-color: #8B0000;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .btn-red {
                        background-color: red;
                        color: white;
                        border: none;
                    }
                    .btn-red:hover {
                        background-color: darkred;
                    }
                </style>
            </head>
            <body>
                <div class="container text-center mt-5">
                    <h1>Bem-vindo ao Cadastro de Produtos</h1>
                    <a class="btn btn-red m-2" href="/cadastrarProduto">Cadastrar Produto</a>
                    <a class="btn btn-dark m-2" href="/listarProdutos">Ver Produtos Cadastrados</a>
                    <a class="btn btn-red m-2" href="/logout">Sair</a>
                </div>
            </body>
        </html>
    `);
});

// Cadastro de Produto View
function cadastroProdutoView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: black;
                        color: white;
                    }
                    .container {
                        background-color: #8B0000;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .form-control {
                        border-radius: 8px;
                    }
                    .btn-red {
                        background-color: red;
                        color: white;
                        border: none;
                    }
                    .btn-red:hover {
                        background-color: darkred;
                    }
                </style>
            </head>
            <body>
                <div class="container mt-5">
                    <h1>Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto" class="border p-4 row g-3">
                        <div class="col-md-6">
                            <label for="codigoBarras" class="form-label">Código de Barras:</label>
                            <input type="text" class="form-control" id="codigoBarras" name="codigoBarras" required>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao" class="form-label">Descrição:</label>
                            <input type="text" class="form-control" id="descricao" name="descricao" required>
                        </div>
                        <div class="col-md-6">
                            <label for="precoCusto" class="form-label">Preço de Custo:</label>
                            <input type="number" step="0.01" class="form-control" id="precoCusto" name="precoCusto" required>
                        </div>
                        <div class="col-md-6">
                            <label for="precoVenda" class="form-label">Preço de Venda:</label>
                            <input type="number" step="0.01" class="form-control" id="precoVenda" name="precoVenda" required>
                        </div>
                        <div class="col-md-6">
                            <label for="dataValidade" class="form-label">Data de Validade:</label>
                            <input type="date" class="form-control" id="dataValidade" name="dataValidade" required>
                        </div>
                        <div class="col-md-6">
                            <label for="qtdEstoque" class="form-label">Quantidade:</label>
                            <input type="number" class="form-control" id="qtdEstoque" name="qtdEstoque" required>
                        </div>
                        <div class="col-md-12">
                            <label for="nomeFabricante" class="form-label">Fabricante:</label>
                            <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante" required>
                        </div>
                        <div class="col-12 mt-3">
                            <button type="submit" class="btn btn-red">Cadastrar Produto</button>
                        </div>
                    </form>
                </div>
            </body>
        </html>
    `);
}

// Cadastro e Listagem de Produtos
function listarProdutosView(req, resp) {
    resp.send(`
        <html>
            <head>
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: black;
                        color: white;
                    }
                    .container {
                        background-color: #8B0000;
                        padding: 20px;
                        border-radius: 8px;
                    }
                </style>
            </head>
            <body>
                <div class="container mt-5">
                    <h2>Produtos Cadastrados</h2>
                    <table class="table text-white">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Preço Custo</th>
                                <th>Preço Venda</th>
                                <th>Validade</th>
                                <th>Quantidade</th>
                                <th>Fabricante</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${listaProdutos.map(produto => `
                                <tr>
                                    <td>${produto.codigoBarras}</td>
                                    <td>${produto.descricao}</td>
                                    <td>R$ ${produto.precoCusto}</td>
                                    <td>R$ ${produto.precoVenda}</td>
                                    <td>${produto.dataValidade}</td>
                                    <td>${produto.qtdEstoque}</td>
                                    <td>${produto.nomeFabricante}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <a class="btn btn-dark" href="/">Voltar</a>
                </div>
            </body>
        </html>
    `);
}

function cadastrarProduto(req, resp) {
    const { codigoBarras, descricao, precoCusto, precoVenda, dataValidade, qtdEstoque, nomeFabricante } = req.body;
    if (Number(precoCusto) > Number(precoVenda)) {
        return resp.send("Erro: O preço de custo não pode ser maior que o preço de venda!");
    }
    const produto = { codigoBarras, descricao, precoCusto, precoVenda, dataValidade, qtdEstoque, nomeFabricante };
    listaProdutos.push(produto);
    resp.redirect('/listarProdutos');
}

app.get('/cadastrarProduto', verificarAutenticacao, cadastroProdutoView);
app.get('/listarProdutos', verificarAutenticacao, listarProdutosView);
app.post('/cadastrarProduto', verificarAutenticacao, cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
