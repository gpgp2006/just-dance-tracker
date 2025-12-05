import requests
from bs4 import BeautifulSoup
import os
import re
import time
import json

# --- CONFIGURAÇÕES ---
URL_ALVO = "https://justdance.fandom.com/wiki/Just_Dance_4"
PASTA_IMAGENS = "capas_jd4"
ARQUIVO_DADOS = "dados_jd4.json"

HEADERS_FAKE = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def configurar_ambiente():
    if not os.path.exists(PASTA_IMAGENS):
        os.makedirs(PASTA_IMAGENS)

def limpar_url_imagem(url_suja):
    if not url_suja: return None
    # Remove tudo depois de /revision/ para pegar a imagem original
    return url_suja.split('/revision/')[0]

def pegar_id_da_pagina(url_musica):
    """Acessa a página da música e extrai o wgArticleId."""
    try:
        r = requests.get(url_musica, headers=HEADERS_FAKE)
        match = re.search(r'wgArticleId":(\d+)', r.text)
        if match:
            return match.group(1)
        return None
    except Exception:
        return None

def baixar_imagem(url, id_musica):
    if not url: return None
    try:
        r = requests.get(url, headers=HEADERS_FAKE)
        if r.status_code == 200:
            nome_arquivo = f"{id_musica}.webp"
            caminho = os.path.join(PASTA_IMAGENS, nome_arquivo)
            with open(caminho, 'wb') as f:
                f.write(r.content)
            return nome_arquivo
    except Exception:
        pass
    return None

def main():
    configurar_ambiente()
    lista_db = []

    print(f"--- Iniciando Scraper em: {URL_ALVO} ---")
    response = requests.get(URL_ALVO, headers=HEADERS_FAKE)
    soup = BeautifulSoup(response.text, 'html.parser')

    # BUSCAR TABELA CORRETA
    # Procuramos em TODAS as tabelas, não apenas nas que tem classe wikitable
    todas_tabelas = soup.find_all("table")
    tabela_musicas = None
    
    print(f"Encontrei {len(todas_tabelas)} tabelas na página. Procurando a correta...")

    for i, tab in enumerate(todas_tabelas):
        # Limpa o texto dos cabeçalhos para comparação exata
        cabecalhos = [th.get_text(strip=True).lower() for th in tab.find_all('th')]
        
        # DEBUG: Mostra o que ele achou (se quiser ver, descomente a linha abaixo)
        # print(f"Tabela {i}: {cabecalhos}")

        # A regra de ouro: Tem que ter "song" e "artist"
        if "song" in cabecalhos and "artist" in cabecalhos:
            tabela_musicas = tab
            print(f"-> SUCESSO: Tabela encontrada (Índice {i}) com cabeçalhos: {cabecalhos}")
            break
    
    if not tabela_musicas:
        print("\n[ERRO CRÍTICO] Não encontrei nenhuma tabela com as colunas 'Song' e 'Artist'.")
        print("Verifique se a página mudou ou se os nomes das colunas são exatamente esses.")
        return

    # PROCESSAR LINHAS
    linhas = tabela_musicas.find_all("tr")[1:] # Pula o cabeçalho
    print(f"Processando {len(linhas)} linhas...\n")

    for linha in linhas:
        colunas = linha.find_all(["td", "th"])
        
        # Precisa ter pelo menos as colunas de Song, Artist...
        if len(colunas) < 2: continue

        try:
            # --- COLUNA 0: SONG (Música + Link) ---
            # Pode ser th ou td dependendo da formatação
            col_song = colunas[0]
            link_tag = col_song.find("a")
            
            if not link_tag: continue # Se não tem link, não é música jogável

            nome_musica = link_tag.get_text(strip=True)
            href = link_tag['href']
            
            # Filtro básico para evitar cabeçalhos repetidos no meio da tabela
            if nome_musica.lower() == "song": continue

            url_pagina = "https://justdance.fandom.com" + href

            # --- COLUNA 1: ARTIST (Artista) ---
            col_artist = colunas[1]
            nome_artista = col_artist.get_text(strip=True)

            # --- IMAGEM (Header "Square") ---
            # Em vez de tentar adivinhar o índice da coluna "Square",
            # buscamos a primeira imagem válida na linha inteira. É mais seguro.
            tag_img = linha.find("img")
            url_capa = None
            if tag_img:
                url_capa = tag_img.get('data-src') or tag_img.get('src')
                url_capa = limpar_url_imagem(url_capa)

            # --- FETCH DO ID E DOWNLOAD ---
            print(f"> {nome_musica}...")
            
            id_jd = pegar_id_da_pagina(url_pagina)

            if id_jd:
                arquivo_img = baixar_imagem(url_capa, id_jd)
                
                dados = {
                    "id": id_jd,
                    "song": nome_musica,
                    "artist": nome_artista,
                    "image_file": arquivo_img
                }
                lista_db.append(dados)
                print(f"   [OK] ID: {id_jd} | Imagem salva.")
            else:
                print(f"   [PULO] ID não encontrado.")

            # Delay para evitar bloqueio
            time.sleep(1)

        except Exception as e:
            print(f"   [ERRO] Falha ao processar linha: {e}")
            continue

    # SALVAR JSON
    if lista_db:
        with open(ARQUIVO_DADOS, 'w', encoding='utf-8') as f:
            json.dump(lista_db, f, indent=4, ensure_ascii=False)
        print(f"\nTerminado! {len(lista_db)} músicas extraídas.")
    else:
        print("\nNenhuma música foi extraída. Algo deu errado na leitura das linhas.")

if __name__ == "__main__":
    main()