import { Request, Response } from 'express';

export class OpenIDConfigurationController {
    public getConfiguration(req: Request, res: Response): void {
        const openIDConfig = {
            issuer: "https://your-issuer.com",
            authorization_endpoint: "https://your-issuer.com/authorize",
            token_endpoint: "https://your-issuer.com/token",
            userinfo_endpoint: "https://your-issuer.com/userinfo",
            jwks_uri: "https://your-issuer.com/.well-known/jwks.json",
            response_types_supported: ["code", "token", "id_token"],
            subject_types_supported: ["public"],
            id_token_signing_alg_values_supported: ["RS256"],
            scopes_supported: ["openid", "profile", "email"],
            token_endpoint_auth_methods_supported: ["client_secret_basic", "client_secret_post"],
            claims_supported: ["sub", "iss", "aud", "exp", "iat", "auth_time", "nonce", "name", "email"]
        };

        res.json(openIDConfig);
    }
}