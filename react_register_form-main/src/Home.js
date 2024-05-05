import React, { useState, useEffect } from 'react';
import './index.css'; // Importez le fichier CSS

function Home() {
    const [articles, setArticles] = useState([]);
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');

    useEffect(() => {
        async function fetchArticles() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token d\'authentification manquant');
                }

                const fetchedArticles = await Promise.all([3, 4, 5, 6, 7].map(async id => {
                    const response = await fetch(`http://localhost:1337/api/articles/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`Erreur lors de la récupération de l'article ${id}`);
                    }

                    return await response.json();
                }));

                setArticles(fetchedArticles);

            } catch (error) {
                console.error(error);
            }
        }

        fetchArticles();
    }, []);

    async function ajouterArticle() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }

            const response = await fetch('http://localhost:1337/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titre, contenu }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'article');
            }

            const data = await response.json();
            setArticles([...articles, data]);
            setTitre('');
            setContenu('');
        } catch (error) {
            console.error(error);
        }
    }

    async function supprimerArticle(id) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }

            const response = await fetch(`http://localhost:1337/api/articles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression de l'article ${id}`);
            }

            // Filtrer les articles pour supprimer celui avec l'ID donné
            const nouveauxArticles = articles.filter(article => article.id !== id);
            setArticles(nouveauxArticles);
        } catch (error) {
            console.error(error);
        }
    }

    async function modifierArticle(id, nouveauTitre, nouveauContenu) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }

            const response = await fetch(`http://localhost:1337/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ titre: nouveauTitre, contenu: nouveauContenu }),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la modification de l'article ${id}`);
            }

            const data = await response.json();
            setArticles(articles.map(article => article.id === id ? data : article));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container">
            <div className="input-container">
                <input type="text" value={titre} onChange={e => setTitre(e.target.value)} placeholder="Titre de l'article" />
                <textarea value={contenu} onChange={e => setContenu(e.target.value)} placeholder="Contenu de l'article" />
            </div>
            <div className="button-container">
                <button onClick={ajouterArticle}>Ajouter un article</button>
            </div>
            <div className="article-container">
                {articles.map(article => (
                    <div key={article.id}>
                        <h2>{article.data.attributes.auteur}</h2>
                        <p>{article.data.attributes.message}</p>
                        <button onClick={() => supprimerArticle(article.id)}>Supprimer</button>
                        <button onClick={() => modifierArticle(article.id, titre, contenu)}>Modifier</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;