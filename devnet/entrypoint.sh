#!/bin/bash

set -e

NODE_OPTIONS="--max-old-space-size=4096" ganache \
                                        --fork.url https://evm-t3.cronos.org \
                                        --fork.blockNumber 2428843 --chain.chainId 338 --chain.networkId 338 \
                                        --gasPrice 5000000000000 -b 6 \
                                        --secure --unlock "0x7ed8cEDbd9c07F66b60ED846e2b710d40A44bC00"