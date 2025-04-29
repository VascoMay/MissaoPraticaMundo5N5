# Funções simuladas (definir de acordo com seu banco de dados e lógica)
def getLoginAttempts(username):
    # Simulação de tentativas de login
    return 0  # Exemplo: usuário não fez tentativas falhas

def userExists(username):
    # Simulação de verificação de existência de usuário
    return False  # Exemplo: usuário não existe

def lookupCredentialsInDatabase(username, password):
    # Simulação de verificação de credenciais
    return True  # Exemplo: credenciais válidas

def incrementLoginAttempts(username):
    # Simulação de incremento de tentativas
    pass

def resetLoginAttempts(username):
    # Simulação de reset de tentativas
    pass

# Função principal de login
def login(newUsername, newPassword):
    MIN_PASSWORD_LENGTH = 8
    MAX_LOGIN_ATTEMPTS = 5

    # Simulação de controle de tentativas
    if getLoginAttempts(newUsername) >= MAX_LOGIN_ATTEMPTS:
        return "Erro: Muitas tentativas inválidas. Tente novamente mais tarde."

    # Verifica se o nome de usuário já está em uso
    if userExists(newUsername):
        return "Erro: Usuário já existe."

    # Verifica se a senha tem o tamanho mínimo
    if len(newPassword) < MIN_PASSWORD_LENGTH:
        return "Erro: A senha deve conter no mínimo 8 caracteres."

    # Permite qualquer caractere na senha – sem restrições adicionais

    # Verifica as credenciais com mensagem genérica
    isValidCredentials = lookupCredentialsInDatabase(newUsername, newPassword)

    if not isValidCredentials:
        incrementLoginAttempts(newUsername)
        return "Erro: Usuário ou senha incorretos."  # 🔒 Erro genérico

    # Limpa tentativas após login bem-sucedido
    resetLoginAttempts(newUsername)

    return "Sucesso: Login realizado com sucesso."

# Testando a função de login
username = "exemploUser"
password = "exemploSenha"
print(login(username, password))
