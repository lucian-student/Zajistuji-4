const pool = require('../configuration/db');

module.exports = async (req, res, next) => {
    try {
        const id = req.user;
        const comment_id = req.params.id;

        const checkUser =
            await pool.query('SELECT * FROM comments WHERE comment_id=$1 AND user_id=$2',
                [
                    comment_id,
                    id
                ]);
                if(checkUser.rows.length===0){
                    return res.status(403).json('Not Authorized!');
                }
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized!');
    }
    next();
};