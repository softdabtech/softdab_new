# Deploying opticaldt.softdab.tech

Quick steps to add the new subdomain `opticaldt.softdab.tech` on DigitalOcean and serve the static files via the existing Nginx setup.

## 1) Add DNS record on DigitalOcean

1. Log in to DigitalOcean → Networking → Domains → `softdab.tech`.
2. Add an "A" record:
   - Hostname: `opticaldt`
   - Will direct to: the droplet IP (e.g., `159.65.252.227`)
   - TTL: default

Or using `doctl`:

```bash
# replace <DROPLET_IP> with the server IP and ensure DOCTL is authenticated
doctl compute domain records create softdab.tech --record-type A --record-name opticaldt --record-data 159.65.252.227
```

DNS usually propagates in a few minutes but may take up to an hour.

## 2) Copy files to the server

On your local machine:

```bash
# from repo root
scp -r subdomain_downloads/opticaldt/* root@159.65.252.227:/var/www/subdomains/opticaldt/
```

If the directory does not exist on the server, create it first (`mkdir -p /var/www/subdomains/opticaldt && chown -R www-data:www-data /var/www/subdomains/opticaldt`).

## 3) Add nginx server block

Add a server block similar to `opto` or `optical` in `deployment/nginx-subdomains.conf`:

```nginx
# OpticalDT subdomain
server {
    server_name opticaldt.softdab.tech;
    root /var/www/subdomains/opticaldt;
    index index.html;

    access_log /var/log/nginx/opticaldt-access.log;
    error_log /var/log/nginx/opticaldt-error.log;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ /\.(env|git|htaccess|htpasswd) {
        deny all;
        return 404;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/softdab.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/softdab.tech/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

Also add `opticaldt.softdab.tech` to the HTTP->HTTPS redirect `server_name` list near the file bottom.

## 4) Reload nginx and obtain TLS certificate

```bash
# on server
sudo nginx -t
sudo systemctl reload nginx

# then request cert (certbot will auto-configure)
sudo certbot --nginx -d opticaldt.softdab.tech
```

If you use the same cert for all subdomains, certbot above will attach cert for this domain to the existing configuration.

## 5) Verify

- Visit: https://opticaldt.softdab.tech
- Check logs:

```bash
sudo tail -f /var/log/nginx/opticaldt-access.log /var/log/nginx/opticaldt-error.log
```

## Notes
- If you prefer a CDN or App Platform, adapt the DNS and upload steps accordingly.
- If you want me to perform the server steps (copy files, add nginx block, reload, request cert), provide SSH access or run the commands locally on the droplet.

---

If you want, I can prepare the exact nginx diff to apply and a one-line `scp` + `ssh` command to copy and reload automatically.