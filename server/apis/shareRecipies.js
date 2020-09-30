const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

router.put('/share_unshare_recipie', authorization, async (req, res) => {
    try {
        const id = req.body.id;
        const share = req.body.share;

        const recipie =
            await pool.query('UPDATE recipies SET shared=$1 WHERE user_id=$2 RETURNING shared,recipie_id',
                [
                    share, id
                ]);
        res.json(recipie.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/like_unlike_recipie', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        const id = parseInt(req.body.id);
        await client.query('BEGIN');
        const checkTweet =
            await client.query('SELECT like_id FROM recipie_like WHERE user_id=$1 AND recipie_id=$2',
                [
                    req.user,
                    id
                ]);
        if (checkTweet.rows.length === 0) {
            const newLike =
                await client.query('INSERT INTO recipie_like (user_id,recipie_id)' +
                    ' VALUES ($1,$2) RETURNING *', [
                    req.user,
                    id
                ]);
            const update =
                await client.query('UPDATE recipies SET num_of_likes = num_of_likes+1 WHERE recipie_id=$1 RETURNING *',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            console.log()
            res.json({
                type: 'like',
                num_of_likes: update.rows[0].num_of_likes
            });
        } else {
            const deleteLike =
                await client.query('DELETE FROM recipie_like WHERE recipie_id=$1 AND user_id=$2 RETURNING *',
                    [
                        id,
                        req.user
                    ]);
            const updateTweet =
                await client.query('UPDATE recipies SET num_of_likes=num_of_likes-1 WHERE recipie_id=$1 RETURNING *',
                    [
                        id
                    ]);
            await client.query('COMMIT');
            // const updateTweetRes = updateTweet.rows[0];
            res.json({
                type: 'unlike',
                num_of_likes: updateTweet.rows[0].num_of_likes,
            });
        }

    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
module.exports = router;