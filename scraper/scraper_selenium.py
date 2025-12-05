import time
import json
import os
import re
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# --- CONFIGURAÇÕES ---
URL_TRACKLIST = "https://justdance.fandom.com/wiki/Just_Dance_2018"
PASTA_IMAGENS = "capas_jd18"
ARQUIVO_DADOS = "dados_jd18.json"

options = Options()
options.add_argument("--disable-blink-features=AutomationControlled") 
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

def configurar_ambiente():
    if not os.path.exists(PASTA_IMAGENS):
        os.makedirs(PASTA_IMAGENS)

def criar_sessao_robusta():
    session = requests.Session()
    retry = Retry(
        total=5, 
        backoff_factor=1, 
        status_forcelist=[500, 502, 503, 504],
        allowed_methods=["HEAD", "GET", "OPTIONS"]
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    session.headers.update({'User-Agent': 'Mozilla/5.0'})
    return session

sessao = criar_sessao_robusta()

def limpar_url_imagem(url_suja):
    if not url_suja: return None
    return url_suja.split('/revision/')[0]

def extrair_e_limpar_codename(texto_bruto):
    """
    Limpa o Code Name removendo conteúdo entre parênteses e colchetes,
    e remove explicitamente quaisquer sobras de (, ) ou espaços.
    """
    if not texto_bruto: return None

    # Divide por linhas e remove linhas vazias
    linhas = [x.strip() for x in texto_bruto.split('\n') if x.strip()]
    
    # Lista de cabeçalhos para ignorar
    headers_ignorados = ["classic", "mashup", "puppet master mode", "alternate", "extreme", "battle", "vip"]

    for linha in linhas:
        linha_lower = linha.lower()
        
        # 1. Pula se for só um cabeçalho
        if linha_lower in headers_ignorados:
            continue
        
        # 2. LIMPEZA PROFUNDA
        
        # Remove referências [1], [a]
        linha = re.sub(r'\[.*?\]', '', linha)
        
        # Remove conteúdo entre parênteses (JD4), (Classic)
        linha = re.sub(r'\(.*?\)', '', linha)
        
        # --- CORREÇÃO DO ERRO ---
        # Remove explicitamente qualquer parêntese que tenha sobrado
        linha = linha.replace("(", "").replace(")", "")
        
        # Remove espaços em branco
        linha = linha.replace(" ", "")
        
        # Remove caracteres proibidos em arquivos
        linha = "".join([c for c in linha if c not in r'/\:*?"<>|'])
        
        if linha:
            return linha

    return None

def baixar_imagem(url, nome_final):
    if not url or url.startswith("data:"): 
        print(f"   -> [ERRO URL] URL inválida: {str(url)[:20]}...")
        return None

    try:
        r = sessao.get(url, timeout=20)
        if r.status_code == 200:
            caminho = os.path.join(PASTA_IMAGENS, nome_final)
            with open(caminho, 'wb') as f:
                f.write(r.content)
            return nome_final
    except Exception as e:
        print(f"   -> [FALHA DOWNLOAD] {e}")
    return None

def main():
    configurar_ambiente()
    lista_db = []
    filas_para_processar = []

    print("--- 1. Coletando Track List ---")
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    try:
        driver.get(URL_TRACKLIST)
        time.sleep(5)
        
        soup_main = BeautifulSoup(driver.page_source, 'html.parser')
        
        # Achar tabela
        tabelas = soup_main.find_all("table")
        tabela_alvo = None
        for tab in tabelas:
            headers = [th.get_text(strip=True).lower() for th in tab.find_all('th')]
            if 'song' in headers and 'artist' in headers:
                tabela_alvo = tab
                break
        
        if not tabela_alvo:
            print("[ERRO] Tabela não encontrada.")
            return

        linhas = tabela_alvo.find_all("tr")[1:]
        
        for linha in linhas:
            colunas = linha.find_all(["td", "th"])
            if len(colunas) < 2: continue
            
            col_song = colunas[0]
            link = col_song.find('a')
            if not link: continue
            
            titulo = link.get_text(strip=True)
            if titulo.lower() == "song": continue
            
            url_musica = "https://justdance.fandom.com" + link['href']
            artista = colunas[1].get_text(strip=True)
            
            tag_img = linha.find('img')
            url_img = None
            if tag_img:
                candidato = tag_img.get('data-src')
                if not candidato:
                    src_temp = tag_img.get('src')
                    if src_temp and not src_temp.startswith("data:"):
                        candidato = src_temp
                
                if candidato and not candidato.startswith("data:"):
                    url_img = limpar_url_imagem(candidato)
            
            filas_para_processar.append({
                "titulo": titulo,
                "artista": artista,
                "url_pagina": url_musica,
                "url_imagem": url_img
            })

        print(f"Links: {len(filas_para_processar)}. Extraindo IDs...")
        print("-" * 50)

        for i, item in enumerate(filas_para_processar):
            print(f"[{i+1}/{len(filas_para_processar)}] {item['titulo']}...")
            
            try:
                driver.get(item['url_pagina'])
                time.sleep(1.5) # Tempo ligeiramente reduzido para agilizar

                soup_music = BeautifulSoup(driver.page_source, 'html.parser')
                
                labels = soup_music.find_all("h3", class_="pi-data-label")
                div_valor_encontrado = None
                
                for label in labels:
                    if "code name" in label.get_text(strip=True).lower():
                        div_valor_encontrado = label.find_next_sibling("div", class_="pi-data-value")
                        break
                
                codename_bruto = None
                if div_valor_encontrado:
                    codename_bruto = div_valor_encontrado.get_text(separator="\n")
                
                if codename_bruto:
                    codename_final = extrair_e_limpar_codename(codename_bruto)
                    
                    if codename_final:
                        nome_arquivo = f"{codename_final}.webp"
                        
                        if item['url_imagem']:
                            sucesso = baixar_imagem(item['url_imagem'], nome_arquivo)
                            if sucesso:
                                lista_db.append({
                                    "id_code": codename_final,
                                    "titulo": item['titulo'],
                                    "artista": item['artista'],
                                    "arquivo": nome_arquivo
                                })
                                print(f"   -> [OK] ID: {codename_final}")
                            else:
                                print("   -> [FALHA IMG] Erro no download.")
                        else:
                            print("   -> [AVISO] Sem URL de imagem.")
                    else:
                        print(f"   -> [FALHA] ID inválido após limpeza. Bruto: {codename_bruto[:15]}...")
                        
                else:
                    print("   -> [FALHA] 'Code Name' não encontrado.")

            except Exception as e:
                print(f"   -> [ERRO] {e}")
                continue

    finally:
        driver.quit()

    if lista_db:
        with open(ARQUIVO_DADOS, 'w', encoding='utf-8') as f:
            json.dump(lista_db, f, indent=4, ensure_ascii=False)
        print(f"\nConcluído! {len(lista_db)} músicas salvas.")

if __name__ == "__main__":
    main()