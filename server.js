const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const openIDConfig = {
    issuer: process.env.URL_ISSUER || "https://192.168.100.6:63906",
    authorization_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/authorize",
    token_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/token",
    userinfo_endpoint: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/userinfo",
    jwks_uri: (process.env.URL_ISSUER || "https://192.168.100.6:63906") + "/.well-known/jwks.json",
    response_types_supported: ["code", "token", "id_token"],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256"],
    scopes_supported: ["openid", "profile", "email"],
    token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
    claims_supported: ["sub", "iss", "aud", "exp", "iat", "auth_time", "nonce", "name", "email"]
};

app.get('/.well-known/openid-configuration', (req, res) => {
    res.json(openIDConfig);
});

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});