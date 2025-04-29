function doDBSafeAction(id) {
    const queryTemplate = "SELECT * FROM users WHERE userID = ?";
    const parameters = [id];
  
    console.log("Consulta SQL (segura - template):", queryTemplate);
    console.log("Parâmetros:", parameters);
  
    // Simulação de execução segura da consulta
    const resultados = simulateDatabaseQuerySafe(queryTemplate, parameters);
    console.log("Resultados da consulta (simulada):", resultados);
    return resultados;
  }
  
  function simulateDatabaseQuerySafe(queryTemplate, parameters) {
    // Simulação de um banco de dados fictício de usuários
    const users = [
      { userID: 1, username: 'alice', email: 'alice@example.com' },
      { userID: 10, username: 'bob', email: 'bob@example.com' },
      { userID: 25, username: 'charlie', email: 'charlie@example.com' }
    ];
  
    if (queryTemplate.includes("WHERE userID = ?")) {
      const userIdToFind = parameters[0];
      return users.filter(user => user.userID === userIdToFind);
    } else {
      return "Consulta não suportada na simulação.";
    }
  }
  
  // Simulação de requisições HTTP com diferentes IDs
  
  console.log("\nExecução segura com ID normal:");
  const resultadoNormalSafe = doDBSafeAction(10);
  console.log("Resultado:", resultadoNormalSafe);
  
  console.log("\nExecução segura com ID malicioso (tentativa de SQL Injection tratada):");
  const resultadoMaliciosoSafe = doDBSafeAction("1");
  console.log("Resultado:", resultadoMaliciosoSafe);