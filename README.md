## Ganache with Blockscout

### Running Ganache and Blockscout

The repo uses `docker-compose` in order to create a local development environment. At root of repo, run:

    docker-compose up

Local Ganache devnet forked from `Cronos Testnet3` should be running at `127.0.0.1:8545`.
Blockscout should be running at `127.0.0.1:4000`

### Swapping USDC for ETH

`scripts/main.ts` can be used to call `swapExactTokensForETH` and checking balance before and after. In order to run the script, execute:

    cd scripts
    npm install
    npm run deploy

The output of the deploy step should be as follows:
```
> deploy
> ts-node main.ts

------- Balances of sender before -------
USDC Balance is  70.700941
ETH balance is  804.989066496803265639
------- Balances of recipient before -------
ETH balance is  0.0

Withdrawal Approved

------- Balances of sender after -------
USDC Balance is  40.700941
ETH balance is  804.225307906728179785
------- Balances of recipient before -------
ETH balance is  42.178069328160653254 


At http://localhost:4000/address/0x007E8cAdB9221690fdf4A84acDc9A567D91FC2b4/transactions tx is not shown and balance is incorrect
```

The balance of the recipient `0x007E8cAdB9221690fdf4A84acDc9A567D91FC2b4` should have 42.17 ETH. However, the explorer and the API show no balance found. 
