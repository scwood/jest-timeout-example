const fromEmail = '';
const emailPassword = '';
const emailHost = '';

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
  mongo: '',
  nodemailer: `${fromEmail}:${emailPassword}@${emailHost}`,
  secret: '',
};

export default config;
