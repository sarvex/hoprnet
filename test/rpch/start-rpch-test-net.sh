#!/usr/bin/env bash

# prevent sourcing of this script, only allow execution
$(return >/dev/null 2>&1)
test "$?" -eq "0" && { echo "This script should only be executed." >&2; exit 1; }

# exit on errors, undefined variables, ensure errors in pipes are not hidden
set -Eeuo pipefail

# set log id and use shared log function for readable logs
declare mydir
mydir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
declare HOPR_LOG_ID="start-rpch-test-net"

source "${mydir}/../../scripts/utils.sh"
source "${mydir}/.env"

declare project="rpch-test-net"
declare log_dir="${mydir}/logs"

# safe curl: error when response status code is >400
scurl() {
    curl --silent --show-error --fail "$@" || exit 1
}

log "Stop previously started services"

docker compose -p ${project} stop
rm -rf "${log_dir}"

log "Start RPCh services"

mkdir "${log_dir}"
docker compose -p ${project} \
    up -d --remove-orphans --build --force-recreate --renew-anon-volumes

declare exit_node_logs_1="${log_dir}/exit-1.log"
declare exit_node_logs_2="${log_dir}/exit-2.log"
declare exit_node_logs_3="${log_dir}/exit-3.log"
declare exit_node_logs_4="${log_dir}/exit-4.log"
declare exit_node_logs_5="${log_dir}/exit-5.log"

log "Waiting for RPCh exit nodes to come up"

until grep "Listening for incoming messages from HOPRd" "${exit_node_logs_1}"; do
    docker logs ${project}-exit-1-1 &> "${exit_node_logs_1}"
    sleep 1
done
log "RPCh exit node 1 started"

until grep "Listening for incoming messages from HOPRd" "${exit_node_logs_2}"; do
    docker logs ${project}-exit-2-1 &> "${exit_node_logs_2}"
    sleep 1
done
log "RPCh exit node 2 started"

until grep "Listening for incoming messages from HOPRd" "${exit_node_logs_3}"; do
    docker logs ${project}-exit-3-1 &> "${exit_node_logs_3}"
    sleep 1
done
log "RPCh exit node 3 started"

until grep "Listening for incoming messages from HOPRd" "${exit_node_logs_4}"; do
    docker logs ${project}-exit-4-1 &> "${exit_node_logs_4}"
    sleep 1
done
log "RPCh exit node 4 started"

until grep "Listening for incoming messages from HOPRd" "${exit_node_logs_5}"; do
    docker logs ${project}-exit-5-1 &> "${exit_node_logs_5}"
    sleep 1
done
log "RPCh exit node 5 started"

# fund funding-service wallet
log "Funding funding-service wallet"
scurl -X POST "http://127.0.0.1:${MANAGER_PORT}/fund-via-hoprd" \
    -H "Content-Type: application/json" \
    -d '{
        "hoprdEndpoint": "'$HOPRD_API_ENDPOINT_1'",
        "hoprdToken": "'$HOPRD_API_TOKEN'",
        "nativeAmount": "'$NATIVE_AMOUNT'",
        "hoprAmount": "'$HOPR_AMOUNT'",
        "recipient": "'$FUNDING_SERVICE_ADDRESS'"
    }'

# register nodes
log "Registering nodes to discovery-platform"
scurl -X POST "http://127.0.0.1:${MANAGER_PORT}/register-exit-nodes" \
    -H "Content-Type: application/json" \
    -d '{
        "discoveryPlatformEndpoint": "'$DISCOVERY_PLATFORM_ENDPOINT'",
        "chainId": "31337",
        "hoprdApiEndpoints": [
            "'$HOPRD_API_ENDPOINT_1'",
            "'$HOPRD_API_ENDPOINT_2'",
            "'$HOPRD_API_ENDPOINT_3'",
            "'$HOPRD_API_ENDPOINT_4'",
            "'$HOPRD_API_ENDPOINT_5'"
        ],
        "hoprdApiEndpointsExt": [
            "'$HOPRD_API_ENDPOINT_1_EXT'",
            "'$HOPRD_API_ENDPOINT_2_EXT'",
            "'$HOPRD_API_ENDPOINT_3_EXT'",
            "'$HOPRD_API_ENDPOINT_4_EXT'",
            "'$HOPRD_API_ENDPOINT_5_EXT'"
        ],
        "hoprdApiTokens": [
            "'$HOPRD_API_TOKEN'",
            "'$HOPRD_API_TOKEN'",
            "'$HOPRD_API_TOKEN'",
            "'$HOPRD_API_TOKEN'",
            "'$HOPRD_API_TOKEN'"
        ],
        "exitNodePubKeys": [
            "'$EXIT_NODE_PUB_KEY_1'",
            "'$EXIT_NODE_PUB_KEY_2'",
            "'$EXIT_NODE_PUB_KEY_3'",
            "'$EXIT_NODE_PUB_KEY_4'",
            "'$EXIT_NODE_PUB_KEY_5'"
        ]
    }'
log "Registered nodes to discovery-platform"

# add quota to client 'sandbox'
log "Adding quota to 'sandbox' in 'discovery-platform'"
scurl -X POST "http://127.0.0.1:${MANAGER_PORT}/add-quota" \
    -H "Content-Type: application/json" \
    -d '{
        "discoveryPlatformEndpoint": "'$DISCOVERY_PLATFORM_ENDPOINT'",
        "client": "'${project}'",
        "quota": "50000000000000"
    }'
log "Added quota to client '${project}' in 'discovery-platform'"

echo "RPCh test net has started"
