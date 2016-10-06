const fromEmail = 'noreply.daybyday@gmail.com';
const emailPassword = 'Daybydaypass1$';
const emailHost = 'smtp.gmail.com';

const config = {
  fromEmail,
  mailNotifier: {
    username: fromEmail,
    password: emailPassword,
    host: emailHost,
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
  mongo: 'localhost',
  nodemailer: `${fromEmail}:${emailPassword}@${emailHost}`,
  secret: 'SRr2iYqFRRANtCoeftUB',
};

export default config;
