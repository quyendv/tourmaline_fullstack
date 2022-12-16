#!/usr/bin/env bash

IMAGE_NAME=mysql
HOST_PORT=3306
MAP_PORT=3306
DATABASE_NAME=database.sql

err() {
    echo $* >&2
}

usage() {
    err "$(basename $0): [build|run|all|login]"
}

clean() {
    IMAGE=$(docker ps -a -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}")

    if ! test -z "$IMAGE"
    then
        docker rm $(docker stop ${IMAGE})
        docker rmi -f ${IMAGE_NAME}
    fi
}

build_docker() {
    docker build -t ${IMAGE_NAME} .
}

launch() {
    docker run -p ${HOST_PORT}:${MAP_PORT} -d ${IMAGE_NAME} --name mysql-server --env-file .env -d mysql
}


login() {
	docker cp ${DATABASE_NAME} $(docker ps -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}"):${DATABASE_NAME}
    docker exec -it $(docker ps -q --filter ancestor=${IMAGE_NAME} --format="{{.ID}}") /bin/bash
}

execute() {
    local task=${1}
    case ${task} in
        build)
            clean
            build_docker
            ;;
        run)
            launch
            ;;
        login)
            login
            ;;
        all) 
            clean
            build_docker
            launch
            ;;
        *)
            err "invalid task: ${task}"
            usage
            exit 1
            ;;
    esac
}

main() {
    [ $# -ne 1 ] && { usage; exit 1; }
    local task=${1}
    execute ${task}
}

main $@
