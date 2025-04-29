// Frontend (JavaScript) com Mock do Backend para Testes

async function mockLogin(username, password) {
  return new Promise((resolve, reject) => {
    // Simulação de lógica de autenticação
    if (username === 'usuario' && password === 'senha') {
      // Simulação da geração de um JWT (simplificado para teste)
      const now = Math.floor(Date.now() / 1000);
      const expirationTime = now + (60 * 60); // Expira em 1 hora

      const mockToken = btoa(JSON.stringify({
        alg: 'HS256',
        typ: 'JWT'
      })) + '.' + btoa(JSON.stringify({
        username: username,
        userId: 123,
        exp: expirationTime
      })) + '.'; // Sem assinatura para simplificar o mock

      const mockResponse = {
        jwt_token: mockToken,
        expiresIn: expirationTime * 1000 // Em milissegundos
      };
      resolve(mockResponse);
    } else {
      reject({ error: 'Credenciais inválidas (mock).' }); // Erro para credenciais incorretas
    }
  });
}

async function login(username, password) {
  try {
    const response = await mockLogin(username, password); // Usando o mock para teste

    localStorage.setItem("token", response.jwt_token);
    localStorage.setItem("tokenExpiration", response.expiresIn);
    console.log('Token armazenado (mock):', response.jwt_token);
    console.log('Expiração do token (mock):', new Date(response.expiresIn));

    // Redirecionar para a página protegida, por exemplo
    window.location.href = '/dashboard';

  } catch (err) {
    console.error('Erro no login (mock):', err.error); // Exibe a mensagem de erro
    alert(`Erro ao fazer login: ${err.error}`); // Mostra um alerta ao usuário
  }
}

function getTokenExpiration() {
  const expiration = localStorage.getItem("tokenExpiration");
  return expiration ? parseInt(expiration, 10) : null;
}

function isTokenExpired() {
  const expirationTime = getTokenExpiration();
  if (!expirationTime) {
    console.log('Token de expiração não encontrado.');
    return true; // Se não houver expiração, considera expirado ou inválido
  }
  const now = new Date().getTime();
  const isExpired = now >= expirationTime;
  if (isExpired) {
    console.log('Token expirado (frontend).');
  }
  return isExpired;
}

async function doAction() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error('Token não encontrado.');
    alert('Sessão inválida. Faça login novamente.');
    window.location.href = '/login';
    return;
  }

  if (isTokenExpired()) {
    alert('Sua sessão expirou. Faça login novamente.');
    window.location.href = '/login';
    return;
  }

  // Se o token não estiver expirado, você faria a chamada real para o backend aqui
  console.log('Token válido (frontend). Simulando chamada ao backend...');
  console.log('Token enviado (mock):', token);

  // Simulação da resposta do backend para uma ação bem-sucedida
  const mockBackendResponse = { message: 'Ação realizada com sucesso (mock)!' };
  console.log('Resposta do backend (mock):', mockBackendResponse);
}

// Simulação de uso no console do navegador (para testar o erro de login):
// login('usuario_errado', 'senha_errada');
// Para testar o fluxo normal, use as credenciais corretas no HTML.