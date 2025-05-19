import axios from "axios";
import React from "react";

const midnightMewsApi = axios.create({
    baseURL: "https://megs-news-app.onrender.com/api"
});

export const getAllArticles = () => {
    return midnightMewsApi.get("/articles")
    .then((res) => {
        return res.data.articles;
    });
};

export const getArticle = (articleId) => {
    return midnightMewsApi.get(`/articles/${articleId}`)
    .then((res) => {
        return res.data.article;
    })
}

export const formattingString = (string) => {
    if(!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getRecentArticles = () => {
    return midnightMewsApi.get("/articles?sort_by=created_at&order=asc")
    .then((res) => {
        return res.data.articles;
    })
}