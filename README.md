# PM2

```pm2 start yarn --name "food-expiring-backend" --interpreter bash -- start:prod```

```yarn install && yarn build```

```pm2 stop food-expiring-backend```

```pm2 start food-expiring-backend```

```pm2 logs food-expiring-backend```
