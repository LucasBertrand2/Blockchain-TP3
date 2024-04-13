import { BrowserProvider, InterfaceAbi, Contract, Eip1193Provider, JsonRpcSigner, parseUnits } from 'ethers';

export type TransactionParameters = {
    value: number,
    gasLimit: bigint | number,
    maxPriorityFeePerGas: bigint | number,
    maxFeePerGas: bigint | number
}

export type address = string
export type uint256 = number
export type tuple = any

export class LotteryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "defaultName";
    }
}

export class LotteryService {
    private readonly contractAddress: string;
    private readonly abi: string;
    private readonly ethereumProvider: Eip1193Provider;

    constructor(_address: string, _abi: string, _ethereumProvider: Eip1193Provider) {
        this.contractAddress = _address;
        this.abi = _abi;
        this.ethereumProvider = _ethereumProvider;
    }

    private async getSigner(): Promise<JsonRpcSigner> {
        try {
            const provider = new BrowserProvider(this.ethereumProvider);
            return provider.getSigner();
        } catch (e) {
            throw new LotteryError("Erreur lors de l'obtention du signer: " + (e as Error).message);
        }
    }

    private getContract(signer: JsonRpcSigner): Contract {
        return new Contract(this.contractAddress, this.abi as InterfaceAbi, signer);
    }

    private async executeContractMethod(methodName: string, ...args: any[]): Promise<any> {
        try {
            const signer = await this.getSigner();
            const contract = this.getContract(signer);
            return contract[methodName](...args);
        } catch (e) {
            this.handleError(e);
        }
    }

    private async executePayableContractMethod(methodName: string, parameters: TransactionParameters, ...args: any[]): Promise<any> {
        try {
            const signer = await this.getSigner();
            const contract = this.getContract(signer);
            return contract[methodName](...args, parameters);
        } catch (e) {
            this.handleError(e);
        }
    }

    private handleError(e: any): void {
        if (e instanceof LotteryError) {
            throw e;
        } else {
            throw new LotteryError("Erreur inattendue: " + (e as Error).message);
        }
    }

    public async LotteryResultAdded(index: uint256,winner: address,reward: uint256) : Promise<string> {
        return this.executeContractMethod("LotteryResultAdded", index,winner,reward);
    }

    public async buyTicket(param: TransactionParameters) : Promise<string> {
        return this.executePayableContractMethod("buyTicket", param);
    }

    public async getAllLotteryResults() : Promise<tuple[]> {
        return this.executeContractMethod("getAllLotteryResults");
    }

    public async getLotteryResult(index: uint256) : Promise<tuple> {
        return this.executeContractMethod("getLotteryResult", index);
    }

    public async getPlayers() : Promise<address[]> {
        return this.executeContractMethod("getPlayers");
    }

    public async maxPlayers() : Promise<uint256> {
        return this.executeContractMethod("maxPlayers");
    }

    public async owner() : Promise<address> {
        return this.executeContractMethod("owner");
    }

    public async pickWinner() : Promise<string> {
        return this.executeContractMethod("pickWinner");
    }

    public async ticketPrice() : Promise<uint256> {
        return this.executeContractMethod("ticketPrice");
    }
}