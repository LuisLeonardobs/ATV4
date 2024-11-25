app.get('/', verificarAutenticacao, (req, resp) => {
    resp.send(`
        <html>
            <head>
                <title>Bem-vindo</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body {
                        background-color: white;
                        color: black;
                    }
                    .navbar {
                        background-color: black;
                    }
                    .navbar-brand, .nav-link {
                        color: white !important;
                    }
                    .btn-red {
                        background-color: red;
                        color: white;
                        border: none;
                    }
                    .btn-red:hover {
                        background-color: darkred;
                    }
                    .container {
                        margin-top: 80px;
                    }
                    .form-container {
                        background-color: black;
                        padding: 20px;
                        border-radius: 8px;
                        color: white;
                    }
                    input, label {
                        color: black;
                    }
                </style>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg fixed-top">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Meu Sistema</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="/cadastrarProduto">Cadastrar Produto</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/listarProdutos">Produtos</a>
                                </li>
                            </ul>
                            <a class="btn btn-red" href="/logout">Sair</a>
                        </div>
                    </div>
                </nav>
                <div class="container text-center">
                    <h1 class="mt-5">Bem-vindo ao Sistema</h1>
                    <p class="mt-3">Gerencie seus produtos de forma simples e eficiente.</p>
                    <a class="btn btn-red m-2" href="/cadastrarProduto">Cadastrar Produto</a>
                    <a class="btn btn-dark m-2" href="/listarProdutos">Ver Produtos</a>
                </div>
                <div class="container form-container mt-5">
                    <h2>Cadastro de Produto</h2>
                    <form method="POST" action="/cadastrarProduto" class="row g-3">
                        <div class="col-md-6">
                            <label for="codigoBarras" class="form-label">Código de Barras</label>
                            <input type="text" class="form-control" id="codigoBarras" name="codigoBarras" required>
                        </div>
                        <div class="col-md-6">
                            <label for="descricao" class="form-label">Descrição</label>
                            <input type="text" class="form-control" id="descricao" name="descricao" required>
                        </div>
                        <div class="col-md-6">
                            <label for="precoCusto" class="form-label">Preço de Custo</label>
                            <input type="number" step="0.01" class="form-control" id="precoCusto" name="precoCusto" required>
                        </div>
                        <div class="col-md-6">
                            <label for="precoVenda" class="form-label">Preço de Venda</label>
                            <input type="number" step="0.01" class="form-control" id="precoVenda" name="precoVenda" required>
                        </div>
                        <div class="col-md-6">
                            <label for="dataValidade" class="form-label">Data de Validade</label>
                            <input type="date" class="form-control" id="dataValidade" name="dataValidade" required>
                        </div>
                        <div class="col-md-6">
                            <label for="qtdEstoque" class="form-label">Quantidade em Estoque</label>
                            <input type="number" class="form-control" id="qtdEstoque" name="qtdEstoque" required>
                        </div>
                        <div class="col-md-12">
                            <label for="nomeFabricante" class="form-label">Fabricante</label>
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
});
