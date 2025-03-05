#!/bin/sh
set -e

# sudo -b wg-quick up wg0
# sudo -b openvpn vitalab.ovpn
DATABASE_URL="postgresql://vitalab:Pb7aHebT23v5P5akC@db:5432/partners?schema=public" npx prisma migrate deploy
DATABASE_URL="postgresql://vitalab:Pb7aHebT23v5P5akC@db:5432/partners?schema=public" node server.js
