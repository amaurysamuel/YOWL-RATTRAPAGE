import React, { useState, useEffect } from 'react';
import './index.css';

function Home() {
    const [articles, setArticles] = useState([]);
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [error, setError] = useState(null);

    async function handleAjouterArticle() {
        setSelectedArticle(null);
      await  ajouterArticle();
    }

    async function handleModifierArticle(article) {
        if (!article || !article.id) {
            console.error("Article ou ID de l'article est undefined");
            return;
        }
        setSelectedArticle(article);
       await modifierArticle();
    }

    async function handleSupprimerArticle(article) {
        if (!article || !article.id) {
            console.error("Article ou ID de l'article est undefined");
            return;
        }
        setSelectedArticle(article);
      await  supprimerArticle();
    }

    useEffect(() => {
        async function fetchArticles() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('Token d\'authentification manquant');
                }

                const fetchedArticles = await fetch(`http://localhost:1337/api/articles`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!fetchedArticles.ok) {
                    throw new Error(`Erreur lors de la récupération des articles`);
                }

                const articlesData = await fetchedArticles.json();

                console.log(articlesData.data);

                setArticles(articlesData.data.map(article => {
                    if (!article.id) {
                        console.error("Article reçu sans ID: ", article);
                    }
                    return article;
                }));

            } catch (error) {
                console.error(error.message);
                setError(`Erreur lors du chargement des articles: ${error.message}`);
            }
        }

        fetchArticles();
    }, []);



    async function ajouterArticle() {
        const requestBody = {
            data: {
                auteur: titre,


                message: contenu,
            },
            state: "published"
        };
        console.log(requestBody)
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }
            //console.log(JSON.stringify(`data: {${titre}, ${contenu}}`))
            const response = await fetch('http://localhost:1337/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de l\'article');
            }

            const data = await response.json();

            setArticles([...articles, data.data]);
            //console.log(articles)
            setTitre('');
            setContenu('');
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un article: ", error);
            setError(`Erreur lors de l'ajout de l'article: ${error.message}`);
        }
    }

    async function modifierArticle() {
        console.log("selectedArticle:", selectedArticle);
        if (!selectedArticle || !selectedArticle.id) {
            console.error("L'article sélectionné est invalide.");
            return;
        }

        const requestBody = {
            data: {
                auteur: titre,
                message: contenu,
            },
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }
            console.log(selectedArticle.id)
            console.log(requestBody)
            const response = await fetch(`http://localhost:1337/api/articles/${selectedArticle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la modification de l\'article');
            }

            const updatedArticle = await response.json();
            const nouveauxArticles = articles.map(article =>
                article.id === selectedArticle.id ? updatedArticle.data : article
            );
            setArticles(nouveauxArticles);
            setTitre('');
            setContenu('');
            setSelectedArticle(null);
        } catch (error) {
            console.error("Erreur lors de la modification d'un article: ", error);
            setError(`Erreur lors de la modification de l'article: ${error.message}`);
        }
    }

    async function supprimerArticle() {
        if (!selectedArticle) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('Token d\'authentification manquant');
            }

            const response = await fetch(`http://localhost:1337/api/articles/${selectedArticle.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'article');
            }

            const nouveauxArticles = articles.filter(article => article.id !== selectedArticle.id);
            setArticles(nouveauxArticles);
            setSelectedArticle(null);
        }
        catch (error) {
            console.error("Erreur lors de la suppression d'un article: ", error);
            setError(`Erreur lors de la suppression de l'article: ${error.message}`);
        }
    }

    return (
        <div className="container">
            {error && <div className="error-message">{error}</div>}
            <div className="new-article-container">
                <input
                    type="text"
                    value={titre}
                    onChange={e => setTitre(e.target.value)}
                    placeholder="Titre de l'article"
                />
                <textarea
                    value={contenu}
                    onChange={e => setContenu(e.target.value)}
                    placeholder="Contenu de l'article"
                />
                {selectedArticle ? (
                    <button onClick={() => handleModifierArticle(selectedArticle)}>
                        Modifier l'article
                    </button>
                ) : (
                    <button onClick={handleAjouterArticle}>Ajouter un article</button>
                )}
            </div>
            <div className="article-container">
                {articles.map(article => (
                    <div key={article.id} className="article-card">
                        <h2>{article.attributes.auteur}</h2>
                        <p>{article.attributes.message}</p>
                        <div className="button-box">
                            <button onClick={() => handleSupprimerArticle(article)}>
                                Supprimer
                            </button>
                            <button onClick={() => handleModifierArticle(article)}>
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    );
}

export default Home;
