import axios from "axios";
import React from "react";
import { format } from "date-fns";

const midnightMewsApi = axios.create({
    baseURL: "https://megs-news-app.onrender.com/api"
});

export const getAllArticles = (topic, sortBy, order, currentPage, articlesPerPage) => {

    let params = {
        sort_by: sortBy, 
        order: order,
        limit: articlesPerPage, 
        p: currentPage}
    
        if (topic){
            params.topic = topic;
        }
    return midnightMewsApi.get("/articles", {params})
    .then((res) => {
        return res.data.articles;
    });
};

export const getArticle = (articleId) => {
    return midnightMewsApi.get(`/articles/${articleId}`)
    .then((res) => {
        return res.data.article;
    });
};

export const formattingString = (string) => {
    if(!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formattingDate = (date) => {
    if (date){
        const parsedDate = new Date(date)
        return format(parsedDate, "MMM dd, yyyy HH:mm a");
    }
    return "Date not available";
};

export const getRecentArticles = () => {
    return midnightMewsApi.get("/articles?sort_by=created_at&order=asc")
    .then((res) => {
        return res.data.articles;
    });
};

export const getCommentsByArticle = (articleId) => {
    return midnightMewsApi.get(`/articles/${articleId}/comments`)
    .then((res) => {
        return res.data.comments;
    });
};

export const getAllUsers = () => {
    return midnightMewsApi.get("/users")
    .then((res) => {
        return res.data.users;
    });
};

export const getUser = (username) => {
    return midnightMewsApi.get(`/users/${username}`)
    .then((res) => {
        return res.data.user;
    });
};

export const updateCommentVotesByArticle = (commentId, inc_votes) => {
    return midnightMewsApi.patch(`/comments/${commentId}`, {
        inc_votes: inc_votes
    })
    .then((res) => {
        return res.data.updatedComment;
    });
};

export const updateArticleVotes = (articleId, inc_votes) => {
    return midnightMewsApi.patch(`/articles/${articleId}`, {
        inc_votes: inc_votes
    })
    .then((res) => {
        return res.data.updatedArticle;
    });
};

export const postNewComment = (articleId, username, body) => {
    return midnightMewsApi.post(`/articles/${articleId}/comments`, {
        username: username, body: body
    })
    .then((res) => {
        return res.data.newComment;
    });
};

export const deleteComment = (commentId) => {
    return midnightMewsApi.delete(`/comments/${commentId}`);
};

export const getAllTopics = () => {
    return midnightMewsApi.get("/topics")
    .then((res) => {
        return res.data.topics;
    });
};
