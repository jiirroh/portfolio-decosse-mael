import os
import json
import time
import feedparser
from google import genai
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

import sys
sys.stdout.reconfigure(encoding='utf-8')

if not GEMINI_API_KEY:
    print("Error: Please set GEMINI_API_KEY in the .env file.")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)

# Chemin vers le fichier news.json du portfolio
PORTFOLIO_DIR = Path(__file__).parent.parent
NEWS_JSON_PATH = PORTFOLIO_DIR / "veille" / "news.json"

def get_latest_github_release(repo_url):
    print(f"Fetching RSS feed from {repo_url}...")
    feed = feedparser.parse(repo_url)
    if feed.entries:
        latest_entry = feed.entries[0]
        
        # Le contenu HTML ou texte de la release
        content = latest_entry.content[0].value if 'content' in latest_entry else latest_entry.summary
        
        print(f"Latest release found: {latest_entry.title}")
        return {
            "title": latest_entry.title,
            "link": latest_entry.link,
            "published": getattr(latest_entry, 'published', getattr(latest_entry, 'updated', '')),
            "content": content
        }
    return None

def summarize_release(text, repo_name):
    print(f"Generating summary for {repo_name} with Gemini API...")
    prompt = (
        f"Tu es un Lead Developer expert en FiveM et Lua. "
        f"Voici la note de mise à jour (Release) brutes du dépôt : {repo_name}.\n"
        "Ta mission : Ne fais pas juste un résumé. Analyse cette mise à jour pour un développeur Junior et explique le contexte.\n"
        "Analyse : Qu'est-ce qui a changé techniquement ?\n"
        "Dictionnaire : Si des termes techniques sont mentionnés (ex: statebag, inv_busy, hooks, ou autres), explique brièvement ce que c'est et à quoi ça sert dans FiveM.\n"
        "Impact : Est-ce que c'est critique ? Est-ce que ça améliore la performance ou la sécurité ?\n"
        "Réponds en français, avec un ton professionnel et pédagogique. Structure ta réponse en Markdown avec des titres clairs (**Analyse**, **Dictionnaire**, **Impact**).\n\n"
        f"Données de la release:\n{text[:4000]}" # Limiter la taille si c'est énorme
    )
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        print(f"Error generating summary: {e}")
        return None

def load_news_json():
    if NEWS_JSON_PATH.exists():
        with open(NEWS_JSON_PATH, "r", encoding="utf-8") as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

def save_news_json(data):
    # Ensure directory exists
    NEWS_JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(NEWS_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    print("=== DEBUT DE LA VEILLE FIVEM OX ===")
    
    # 1. Dépôts OX à surveiller
    repositories = {
        "ox_inventory": "https://github.com/overextended/ox_inventory/releases.atom",
        "ox_lib": "https://github.com/overextended/ox_lib/releases.atom",
        "ox_target": "https://github.com/overextended/ox_target/releases.atom"
    }

    # Charger l'historique actuel
    news_history = load_news_json()
    new_entries_added = False

    for repo_name, rss_url in repositories.items():
        print(f"\n--- Vérification de : {repo_name} ---")
        release_data = get_latest_github_release(rss_url)
        
        if release_data:
            # Vérifier si on a déjà cette version en base (pour éviter les doublons)
            # On cherche par lien ou par id/version
            already_exists = any(item.get("lien") == release_data["link"] for item in news_history)
            
            if already_exists:
                print(f"⏭️ La release {release_data['title']} est déjà dans news.json. Ignoré.")
                continue
                
            summary = summarize_release(release_data["content"], repo_name)
            
            if summary:
                # Créer le nouvel objet
                new_entry = {
                    "version": f"[{repo_name}] {release_data['title']}",
                    "date": release_data["published"],
                    "contenu": summary,
                    "lien": release_data["link"]
                }
                
                # Ajouter en HAUT de la liste
                news_history.insert(0, new_entry)
                new_entries_added = True
                print(f"✅ Ajouté à l'historique : {new_entry['version']}")
            else:
                print(f"❌ Échec de la génération du résumé pour {repo_name}")

        time.sleep(3) # Pause entre les appels IA/RSS

    # Sauvegarder si modification
    if new_entries_added:
        print("\n💾 Sauvegarde du fichier news.json...")
        save_news_json(news_history)
        print("Mise à jour terminée avec succès.")
    else:
        print("\n📭 Aucune nouvelle release trouvée.")

    print("=== FIN DE LA VEILLE ===")

if __name__ == "__main__":
    main()
