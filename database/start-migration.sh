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
    --script > ../prisma/migrations/$1/migration.sql

    if [ $(wc -c < "../prisma/migrations/${1}/migration.sql") -eq 0 ]; then
        echo "Error"
        exit 1
    fi

}

directory() {
    if [ -z $1 ]; then
        echo "ERROR: Timestamp not provided"
        exit 1
    fi
    if [ ! -d "/prisma/migrations" ]; then
        echo "Creating migrations folder..."
        mkdir -p "/prisma/migrations"
    else
        echo "Directory 'migrations' exist"
    fi
    if [ ! -d "/prisma/migrations/${1}/migration.sql" ]; then
        echo "Creating migration files..."
        mkdir -p "/prisma/migrations/${1}"
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

create "${tstamp}" 2>$err

if [ -s $err ]; then
    bun run keystone prisma migrate resolve --applied "$tstamp"
fi
