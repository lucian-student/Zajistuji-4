const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

router.get('/get_comments', authorization, async (req, res) => {
    try {
        const {
            page,
            recipie_id
        } = req.query;
        const comments =
            await pool.query('WITH recipe_comments AS (SELECT * FROM comments WHERE recipie_id=$1' +
                ' ORDER BY posting_date desc OFFSET $2 LIMIT 10)' +
                ' SELECT recipe_comments.*, u1.name as username FROM recipe_comments' +
                ' inner join users u1 on u1.user_id=recipe_comments.user_id',
                [
                    recipie_id,
                    page * 10
                ]);
        res.json(comments.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').send('Server Error');
    }
});

module.exports = router;


/*  const comments =
            await pool.query('WITH recipe AS (SELECT * FROM recipies WHERE recipie_id=$1)' +
                ' SELECT' +
                ' recipe.*,' +
                ' u1.name as username,' +
                ' u2.name as username_comments,' +
                ' comments.comment_id,' +
                ' comments.user_id as user_id_comments,' +
                ' comments.content,' +
                ' comments.num_of_likes as num_of_likes_comments' +
                ' FROM recipe' +
                ' inner join users u1 on u1.user_id=recipe.user_id' +
                ' left join comments on recipe.recipie_id=comments.recipie_id' +
                ' left join users u2 on comments.user_id=u2.user_id',
                [
                    recipie_id
                ]);*/