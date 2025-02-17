#!/bin/bash

B='\033[1m'
I='\033[3m'
R='\033[2m'
CL='\033[0m'
RED='\033[1;31m'
GREEN='\033[0;32m'

BACK='\033[1A'


# Logo display
echo "    _     _     _                 _  __                             _                         _   _ ";
echo "   /_\   | |_  | |  __ _   ___   | |/ /  ___   _ __    _ __   ___  | |_   ___   _ _    __    (_) (_)";
echo "  / _ \  |  _| | | / _\` | (_-<   | ' <  / _ \ | '  \  | '_ \ / -_) |  _| / -_) | ' \  / _|   | | | |";
echo " /_/ \_\  \__| |_| \__,_| /__/   |_|\_\ \___/ |_|_|_| | .__/ \___|  \__| \___| |_||_| \__|  _/ | |_|";
echo "                                                      |_|                                  |__/     ";

echo -e "${B}${RED}Content Management System for e-Atlas Kompetencji by GKHy@ZHR\033[0m";

echo -e "\n\n\033[7m[$(date "+%x %T")]${CL} ${B}Automatic start of the system\033[0m";

# ENVIROMENT VALIDATION
echo -e "\n${B}Enviroment Validation ${CL}";

# CHECK IF /MIGRATIONS EXIST
echo -n -e "\t${R}/migrations: ${CL}";
migrations=$([ -e "/app/migrations" ] && echo true || echo false)
$migrations && echo -e "${GREEN}ok${CL}" || echo -e "${RED}fail${CL}"

if $migrations; then
    echo -e "\t >${R} backup previous migrations ${CL}";
    cp -Rp /app/migrations /app/migrations_prev || echo -e "${RED}fail${CL}"
    rm -rf /app/migrations/*
else
    echo -n -e "\t >${R} create directory ${CL}";
    mkdir -p /app/migrations 2>/dev/null || echo -e "${RED}fail${CL}"
fi

# INITIAL MIGRATION
echo -e "\n${B}Initial migration ${CL}";

echo -n -e "\t${R}creating directory: ${CL}";
mkdir -p /app/migrations/0_init 2>/dev/null && echo -e "${GREEN}ok${CL}" || echo -e "${RED}fail${CL}"

echo -n -e "\t${R}creating files: ${CL}";
echo > /app/migrations/0_init/migration.sql && echo -e "${GREEN}ok${CL}" || echo -e "${RED}fail${CL}"

echo -n -e "\t${R}creating migration: ${CL}";
bun run keystone prisma migrate diff \
    --from-database "$DATABASE_URL" \
    --to-schema-datamodel schema.prisma \
    --script > ./migrations/0_init/migration.sql \
    && echo -e "${GREEN}ok${CL}" || echo -e "${RED}fail${CL}"

echo -n -e "\t${R}applying migration: ${CL}";
bun run keystone prisma migrate deploy \
    && echo -e "${GREEN}completed${CL}" || echo -e "${RED}fail${CL}"

echo -e "\n${B}Final check ${CL}";
echo -n -e "\t${R}migration applied: ${CL}";
bun run keystone prisma migrate diff \
    --from-database "$DB_URL" \
    --to-schema-datamodel schema.prisma \
    --exit-code
case "$?" in
    "0")
        echo -e "${GREEN}ok${CL}"
        ;;
    "1")
        echo -e "${RED}error${CL}"
        ;;
    "2")
        echo -e "\033[0;33mfailed${CL}"
        ;;
esac

echo -e "\n${B}Pre-start ${CL}${R}${GREEN}completed${CL}!";
echo -e "${R}starting system...${CL}\n";

bun run start-migrate
