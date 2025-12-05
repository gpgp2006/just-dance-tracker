import json
import os

# Nome do arquivo JSON gerado pelo scraper anterior
ARQUIVO_ENTRADA = "dados_jd17.json"
# Nome do arquivo de texto onde vamos salvar o código JS
ARQUIVO_SAIDA = "seed_output.txt"
# Edição do jogo (Inteiro, conforme seu pedido)
EDICAO = 2017

def escapar_aspas(texto):
    """
    Evita que músicas com aspas simples quebrem o JavaScript.
    Ex: "It's Raining Men" vira "It\\'s Raining Men"
    """
    if not texto: return ""
    return texto.replace("'", "\\'")

def main():
    if not os.path.exists(ARQUIVO_ENTRADA):
        print(f"Erro: O arquivo '{ARQUIVO_ENTRADA}' não foi encontrado.")
        print("Rode o scraper primeiro para gerar os dados.")
        return

    print(f"Lendo {ARQUIVO_ENTRADA}...")
    
    with open(ARQUIVO_ENTRADA, 'r', encoding='utf-8') as f:
        dados = json.load(f)
    
    linhas_codigo = []

    print(f"Gerando código para {len(dados)} músicas...\n")

    for musica in dados:
        # Recupera os dados do JSON
        # O scraper salvou como: id_code, titulo, artista, arquivo
        id_code = musica.get('id_code', 'DESCONHECIDO')
        titulo = escapar_aspas(musica.get('titulo', ''))
        artista = escapar_aspas(musica.get('artista', ''))
        
        # Formata a string exatamente como você pediu
        # await createSongHelper('CodeName', 'Titulo', 'Artista', 4);
        linha = f"await createSongHelper('{id_code}', '{titulo}', '{artista}', {EDICAO});"
        
        linhas_codigo.append(linha)
        
        # Imprime na tela para conferência rápida
        print(linha)

    # Salva no arquivo de texto
    with open(ARQUIVO_SAIDA, 'w', encoding='utf-8') as f:
        f.write("\n".join(linhas_codigo))
    
    print("-" * 50)
    print(f"Sucesso! O código foi salvo em '{ARQUIVO_SAIDA}'.")
    print("É só copiar o conteúdo desse arquivo e colar no seu seed.js.")

if __name__ == "__main__":
    main()