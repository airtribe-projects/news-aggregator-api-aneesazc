const axios = require('axios');
const usersModel = require('../models/usersModel');

const getNews = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await usersModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const preferences = user.preferences || [];

        if (preferences.length === 0) {
            return res.status(200).json({ news: [] });
        }

        const allArticles = [];

        for (const keyword of preferences) {
            const url = `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(keyword)}&apiKey=${process.env.NEWS_API_KEY}`;
            // console.log('Fetching news from:', url);

            try {
                const response = await axios.get(url);
                if (response.status === 200 && response.data.articles) {
                    // console.log(`Fetched ${response.data.articles.length} articles for "${keyword}"`);
                    allArticles.push(...response.data.articles);
                }
            } catch (err) {
                console.warn(`Error fetching for "${keyword}": ${err.message}`);
            }
        }

        const uniqueArticles = Array.from(
            new Map(allArticles.map(article => [article.url, article])).values()
        );

        res.status(200).json({ news: uniqueArticles });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getNews
};