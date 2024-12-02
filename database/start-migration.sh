#!/bin/bash

timestamp() {
    echo $(date +"%Y%M%d%H%M%S")
}

create() {
    if [ -z $1 ]; then
        echo "ERROR: Timestamp was not provided"
        exit 1
    fi

    echo "Creating migration file..."

    bun run keystone prisma migrate diff \
    --from-empty \
    --to-schema-datamodel schema.prisma \
    --script > ./migrations/$1/migration.sql
}

directory() {
    if [ -z $1 ]; then
        echo "ERROR: Timestamp not provided"
        exit 1
    fi
    if [ ! -d "/app/migrations" ]; then
        echo "Creating migrations folder..."
        mkdir -p "/app/migrations"
    else
        echo "Directory 'migrations' exist"
    fi
    if [ ! -d "/app/migrations/${1}/migration.sql" ]; then
        echo "Creating migration files..."
        mkdir -p "/app/migrations/${1}"
        echo > /app/migrations/${1}/migration.sql
        echo "Files for ${1} created!"
    else
        echo "Migration files exist"
    fi
}



echo "Stamp migration..."
tstamp=$(timestamp)
echo "Tmiestamp created: $tstamp"

echo "Checking directory..."
directory "${tstamp}"

create "${tstamp}"

bun run keystone prisma migrate resolve --applied "$tstamp"
