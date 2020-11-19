SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN users u ON u.user_id = p.author_id
WHERE p.post_id = $1;