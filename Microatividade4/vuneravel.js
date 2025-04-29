function doDBActionVulneravel(id) {
    const query = "SELECT * FROM users WHERE userID='" + id + "'";
    console.log("Consulta SQL executada (vulnerável):", query);
  
    // Simulação de execução da consulta (sem banco de dados real)
    const resultados = simulateDatabaseQueryVulneravel(query);
    console.log("Resultados da consulta (simulada):", resultados);
    return resultados;
  }
  
  function simulateDatabaseQueryVulneravel(query) {
    // Simulação de um banco de dados fictício de usuários
    const users = [
      { userID: 1, username: 'alice', email: 'alice@example.com' },
      { userID: 10, username: 'bob', email: 'bob@example.com' },
      { userID: 25, username: 'charlie', email: 'charlie@example.com' }
    ];
  
    if (query.startsWith("SELECT * FROM users WHERE userID='")) {
      const userIdString = query.split("WHERE userID='")[1].split("'")[0];
      const userId = parseInt(userIdString);
      if (!isNaN(userId)) {
        return users.filter(user => user.userID === userId);
      } else if (userIdString === "' or '1'='1'") {
        return users; // Vulnerabilidade explorada! Retorna todos os usuários
      }
    }
    return "Consulta inválida na simulação.";
  }
  
  // Simulação de requisições HTTP com diferentes IDs
  
  console.log("\nExecução com ID normal:");
  const resultadoNormal = doDBActionVulneravel(10);
  console.log("Resultado:", resultadoNormal);
  
  console.log("\nExecução com ID malicioso (tentativa de SQL Injection):");
  const resultadoMalicioso = doDBActionVulneravel("' or '1'='1'--");
  console.log("Resultado:", resultadoMalicioso);