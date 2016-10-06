import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import validator from 'validator';

import User from '../models/user';
import config from '../config';

class AuthController {

  createToken(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email })
      .then((user) => {
        if (!user || !user.comparePassword(password)) {
          res.status(401).send({ error: 'Incorrect email/password combination' });
          return;
        }
        const token = jwt.sign({ email }, config.secret);
        res.send({ data: { token } });
      })
      .catch(next);
  }

  sendSignUpEmail(req, res, next) {
    const { email, name, password } = req.body;
    User.find({ email })
      .then((docs) => {
        if (docs.length) {
          res.status(403).send({ error: 'User with that email address already exists' });
          return;
        }
        if (!validator.isEmail(email)) {
          res.status(400).send({ error: 'Email address is invalid' });
          return;
        }
        const token = jwt.sign({ email, name, password }, config.secret);
        const link = `${req.protocol}://${req.get('host')}/emailConfirmed?token=${token}`;
        const transporter = nodemailer.createTransport(config.nodemailer);
        transporter.sendMail({
          from: config.nodemailer.user,
          to: email,
          subject: 'Day by Day email confirmation',
          text: `Click the link below to confirm your email:\n${link}`,
        }, (error) => {
          if (error) {
            next(error);
            return;
          }
          res.send({ success: true });
        });
      })
      .catch(next);
  }
}

export default AuthController;
