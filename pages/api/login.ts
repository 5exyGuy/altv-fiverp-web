import nextConnect from 'next-connect';
import auth from '../../services/auth/Auth';
import passport from '../../services/auth/Passport';

const handler = nextConnect();

handler.use(auth).post(passport.authenticate('local'), (req, res) => {
    res.json({ user: req.user });
});

export default handler;
