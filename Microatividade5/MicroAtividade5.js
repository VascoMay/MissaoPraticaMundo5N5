function safeRedirectWithErrorHandling(urlFromQuery, allowedDomain = 'meusite.com', targetDomain = 'domain.com') {
    // 1. Remover ou codificar caracteres CRLF para prevenir injeção de cabeçalhos maliciosos.
    const sanitizedUrl = urlFromQuery.replace(/[\r\n]/g, ''); // Remove \r (Carriage Return) e \n (Line Feed).
  
    // 2. (Opcional, mas recomendado) Validar o domínio de redirecionamento para evitar redirecionamentos para sites não confiáveis.
    let redirectTarget;
    try {
      const parsedUrl = new URL(sanitizedUrl);
      if (parsedUrl.hostname === allowedDomain) {
        redirectTarget = `https://${targetDomain}`; // Redireciona para o domínio alvo se o domínio de entrada for o permitido.
      } else {
        console.warn(`Redirecionamento bloqueado para domínio não permitido: ${parsedUrl.hostname}`);
        return 400; // Retorna código de erro 400 (Bad Request) se o domínio não for permitido.
      }
    } catch (error) {
      console.error("URL inválida:", sanitizedUrl);
      return 400; // Retorna código de erro 400 (Bad Request) se a URL for mal formatada.
    }
  
    const header = `Location: ${redirectTarget}`;
    console.log(`Cabeçalho HTTP (seguro):\n${header}`);
  
    // Simulação do envio do cabeçalho HTTP. Em um servidor real, você configuraria o cabeçalho de resposta.
    console.log("\nSimulação de redirecionamento para:", redirectTarget);
    return header; // Retorna o cabeçalho para indicar sucesso (em um cenário real, seria um status 302).
  }
  
  // --- Testes ---
  
  // 1. Teste de Redirecionamento Válido para Domínio Alvo:
  const validSourceUrl = 'https://meusite.com';
  const allowedDomainForTest = 'meusite.com';
  const targetDomainForTest = 'domain.com';
  console.log(`\n--- Teste de Redirecionamento Válido (meusite.com -> domain.com): ${validSourceUrl} ---`);
  const resultRedirect = safeRedirectWithErrorHandling(validSourceUrl, allowedDomainForTest, targetDomainForTest);
  console.log("Resultado:", resultRedirect);
  // Resultado esperado:
  // Cabeçalho HTTP (seguro):
  // Location: https://domain.com
  //
  // Simulação de redirecionamento para: https://domain.com
  // Resultado: Location: https://domain.com/
  
  // 2. Teste de URL Maliciosa (Visual): Tentativa de injeção de conteúdo HTML.
  const maliciousVisualUrl = 'https://evil.com/pagina-ruim%0D%0AContent-Type:%20text/html%0D%0A%0D%0A';
  const allowedDomainForMalicious = 'meusite.com'; // Mesmo domínio permitido para este teste
  const targetDomainForMalicious = 'domain.com';
  console.log(`\n--- Teste de URL Maliciosa (Visual): ${maliciousVisualUrl} ---`);
  const resultMaliciousVisual = safeRedirectWithErrorHandling(maliciousVisualUrl, allowedDomainForMalicious, targetDomainForMalicious);
  console.log("Resultado:", resultMaliciousVisual);
  // Resultado esperado:
  // URL inválida: https://evil.com/pagina-ruimContent-Type
  // Resultado: 400
  // Explicação: Os caracteres CRLF são removidos, tornando a URL provavelmente inválida. Mesmo que fosse um domínio permitido,
  // o objetivo aqui é ver como a sanitização impede a injeção de um cabeçalho 'Content-Type' que poderia ser explorado.
  
  // --- URLs para outros testes (comente/descomente conforme necessário) ---
  
  // URL com injeção CRLF básica para outro domínio
  // const crlfExternalUrl = 'https://outrodominio.com/%0D%0AX-Malicious-Header:%20Injected';
  
  // URL mal formada
  // const veryMalformedUrl = 'this is not a url at all';
  
  // URL válida para outro domínio (deve ser bloqueada)
  // const anotherValidDomain = 'https://anothersafe.com/page';