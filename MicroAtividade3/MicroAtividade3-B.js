const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretKey = 'suaChaveSecretaSuperSegura'; // Mantenha isso em um ambiente seguro!

app.use(bodyParser.json());

function doLogin(username, password) {
  // Simulação de autenticação (substitua pela sua lógica real - ex: consultar banco de dados)
  if (username === 'usuario' && password === 'senha') {
    const payload = {
      username: username,
      userId: 123, // Exemplo de outro dado útil
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expira em 1 hora (em segundos)
    };
    const jwtToken = jwt.sign(payload, secretKey);
    return jwtToken;
  } else {
    return null; // Falha na autenticação
  }
}

function loginRoute(req, res) {
  const { username, password } = req.body;
  const token = doLogin(username, password);

  if (token) {
    res.json({ jwt_token: token, expiresIn: jwt.decode(token).exp * 1000 }); // Envia o token e a expiração em ms
  } else {
    res.status(401).json({ error: 'Credenciais inválidas.' });
  }
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error('Erro na verificação do token:', err.message);
        return res.status(401).json({ error: 'Acesso não autorizado.' }); // Erro genérico
      }
      req.user = decoded; // Adiciona os dados do token na requisição para uso posterior
      next(); // Permite que a requisição continue para a próxima rota
    });
  } else {
    res.status(401).json({ error: 'Token não fornecido.' });
  }
}

function doSomeAction(req, res) {
  // Se o middleware verifyToken passou, req.user estará disponível
  console.log(`Usuário autenticado para ação: ${req.user.username}`);
  res.json({ message: 'Ação realizada com sucesso!' });
}

app.post('/auth', loginRoute);
app.post('/do_SomeAction', verifyToken, doSomeAction); // Protege a rota com o middleware de verificação

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});