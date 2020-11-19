const bcrypt = require('bcrypt');
module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username);
        if(foundUser) {
            return res.status(400).send("Username already exists")
        }
        const profilePic = `https://robohash.org/${username}`

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user([username, hash, profilePic])

        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username, 
            profilePic: newUser.profile_pic  
        }
        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body
        const [foundUser] = await db.check_user(username);
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username,
                profilePic: foundUser.profile_pic  
            }
            res.status(200).send(req.session.user)
        }else{
            res.status(401).send("Incorrect login information")
        }
    },

    logoutUser: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUserPosts: (req, res) => {
        const db = req.app.get('db');
        const {myPosts, search} = req.query

        db.get_user_posts([myPosts, req.session.user.userId, search])
        .then(posts => res.status(200).send(posts))
        .catch(error => res.status(500).send(error))
        //req.query search and userposts:true
    },

    getOnePost: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        const [post] = await db.get_one_post(id)
        res.status(200).send(post)
    },

    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, img, content} = req.body

        await db.add_post([req.session.user.userId, title, img, content])
        res.sendStatus(200)
    },

    getMe: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.session.user
        
        const [currentUser] = await db.get_me(userId)

        if (currentUser) {
            return res.status(200).send(req.session.user)
        } else {
            res.status(404).send("Login again pls")
        }
    },
}