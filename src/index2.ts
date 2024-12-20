// Simple Node.js Application with OpenID Connect Provider in TypeScript
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 63906;

// Body parser for JSON
app.use(bodyParser.json());

// Mock user database
interface User {
  id: number;
  username: string;
  password: string;
  name: string;
}

const users: User[] = [
  { id: 1, username: 'testuser', password: 'password123', name: 'Test User' },
];

// Simple authentication middleware
function authenticate(username: string, password: string): User | undefined {
  return users.find((user) => user.username === username && user.password === password);
}

// OpenID Connect Provider metadata
const oidcProviderMetadata = {
  issuer: process.env.URL_ISSUER || "http://localhost:63906",
  authorization_endpoint: (process.env.URL_ISSUER || "http://localhost:63906") + "/authorize",
  token_endpoint: (process.env.URL_ISSUER || "http://localhost:63906") + "/token",
  userinfo_endpoint: (process.env.URL_ISSUER || "http://localhost:63906") + "/userinfo",
  jwks_uri: (process.env.URL_ISSUER || "http://localhost:63906") + "/jwks",
};

app.get('/.well-known/openid-configuration', (req: Request, res: Response) => {
  res.json(oidcProviderMetadata);
});

// Mock JWKS endpoint
app.get('/jwks', (req: Request, res: Response) => {
  res.json({ keys: [] }); // Replace with real keys if implementing token signing
});

// Authorization endpoint
app.get('/authorize', (req: Request, res: Response) => {
  const { response_type, client_id, redirect_uri, state } = req.query;
  // Simple HTML form for login
  res.send(`
    <form action="/login" method="post">
      <input type="hidden" name="client_id" value="${client_id}" />
      <input type="hidden" name="redirect_uri" value="${redirect_uri}" />
      <input type="hidden" name="response_type" value="${response_type}" />
      <input type="hidden" name="state" value="${state}" />
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Login handler
app.post('/login', bodyParser.urlencoded({ extended: true }), (req: Request, res: Response) => {
  const { username, password, client_id, redirect_uri, response_type, state } = req.body;
  const user = authenticate(username, password);

  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Simulate issuing an authorization code
  const code = 'authcode123'; // Replace with real code logic
  res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
});

// Token endpoint
app.post('/token', (req: Request, res: Response) => {
  const { code, client_id, redirect_uri } = req.body;

  if (code !== 'authcode123') {
    return res.status(400).json({ error: 'invalid_grant' });
  }

  // Issue a simple token response
  res.json({
    access_token: 'accesstoken123',
    token_type: 'Bearer',
    expires_in: 3600,
    id_token: 'idtoken123',
  });
});

// Userinfo endpoint
app.get('/userinfo', (req: Request, res: Response) => {
  // Return mock user info for the access token
  res.json({
    sub: '1',
    name: 'Test User',
    preferred_username: 'testuser',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`OIDC Provider running on http://localhost:${port}`);
});
