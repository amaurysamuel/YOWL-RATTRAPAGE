import React, { useState } from 'react';
import './index.css'; // Importez le fichier CSS

function Home() {
    const [articles, setArticles] = useState([
        { id: 1, titre: 'Article 1', contenu: 'Contenu de l\'article 1', auteur: 'John Doe' },
        { id: 2, titre: 'Article 2', contenu: 'Contenu de l\'article 2', auteur: 'Jane Doe' },
    ]);

    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [idAModifier, setIdAModifier] = useState(null);

    function ajouterArticle() {
        const nouvelArticle = { id: Date.now(), titre, contenu, auteur: 'John Doe' }; // Ajouter le nom de la personne ici
        setArticles([...articles, nouvelArticle]);
        setTitre('');
        setContenu('');
    }

    function modifierArticle() {
        const nouveauxArticles = articles.map(article => {
            if (article.id === idAModifier) {
                return { ...article, titre, contenu };
            } else {
                return article;
            }
        });
        setArticles(nouveauxArticles);
        setTitre('');
        setContenu('');
        setIdAModifier(null);
    }

    function supprimerArticle(id) {
        const nouveauxArticles = articles.filter(article => article.id !== id);
        setArticles(nouveauxArticles);
    }

    return (
        <div className="container">
            <div className="input-container">
                <input type="text" value={titre} onChange={e => setTitre(e.target.value)} placeholder="Titre de l'article" />
                <textarea value={contenu} onChange={e => setContenu(e.target.value)} placeholder="Contenu de l'article" />
            </div>
            <div className="button-container">
                {idAModifier ? (
                    <button onClick={modifierArticle}>Modifier l'article</button>
                ) : (
                    <button onClick={ajouterArticle}>Ajouter un article</button>
                )}
            </div>
            <div className="article-container">
                {articles.map(article => (
                    <div key={article.id}>
                        <h2>{article.titre}</h2>
                        <p>{article.contenu}</p>
                        <p>Par: {article.auteur}</p> {/* Afficher le nom de l'auteur */}
                        <button onClick={() => setIdAModifier(article.id)}>Modifier</button>
                        <button onClick={() => supprimerArticle(article.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
