import { db } from "../database.js";

export const blogUser = (post_id, datetime, title, content, user_id, firstName, lastName) => {
    return {
        post_id,
        datetime,
        title,
        content,
        user_id,
        firstName,
        lastName
    };
};

export const getAllBlogs = async () => {
    try {
        const query = `
            SELECT b.post_id, b.post_datetime, b.post_title, b.post_content, b.post_user_id, u.user_firstName, u.user_lastName 
            FROM blog_posts b
            JOIN users u ON b.post_user_id = u.user_id
            ORDER BY b.post_datetime DESC
        `;
        const [rows] = await db.execute(query);
        return rows.map(row => blogUser(row.post_id, row.post_datetime, row.post_title, row.post_content, row.post_user_id, row.user_firstName, row.user_lastName));
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve blog posts with user information");
    }
};

// create one for indviual user post 

// Example usage

