import { BrowserProvider, InterfaceAbi, Contract, Eip1193Provider, JsonRpcSigner, parseUnits } from 'ethers';

export type TransactionParameters = {
    value: number,
    gasLimit: bigint | number,
    maxPriorityFeePerGas: bigint | number,
    maxFeePerGas: bigint | number
}

export type address = string
export type bytes32 = any
export type uint64 = number
export type uint256 = number
export type tuple = any
export type bytes = any

export class defaultNameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "defaultName";
    }
}

export class defaultName {
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
            throw new defaultNameError("Erreur lors de l'obtention du signer: " + (e as Error).message);
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
        if (e instanceof defaultNameError) {
            throw e;
        } else {
            throw new defaultNameError("Erreur inattendue: " + (e as Error).message);
        }
    }

    public async AddressEmptyCode(target: address) : Promise<string> {
        return this.executeContractMethod("AddressEmptyCode", target);
    }

    public async ERC1967InvalidImplementation(implementation: address) : Promise<string> {
        return this.executeContractMethod("ERC1967InvalidImplementation", implementation);
    }

    public async ERC1967NonPayable() : Promise<string> {
        return this.executeContractMethod("ERC1967NonPayable");
    }

    public async FailedInnerCall() : Promise<string> {
        return this.executeContractMethod("FailedInnerCall");
    }

    public async InvalidInitialization() : Promise<string> {
        return this.executeContractMethod("InvalidInitialization");
    }

    public async NotInitializing() : Promise<string> {
        return this.executeContractMethod("NotInitializing");
    }

    public async OwnableInvalidOwner(owner: address) : Promise<string> {
        return this.executeContractMethod("OwnableInvalidOwner", owner);
    }

    public async OwnableUnauthorizedAccount(account: address) : Promise<string> {
        return this.executeContractMethod("OwnableUnauthorizedAccount", account);
    }

    public async UUPSUnauthorizedCallContext() : Promise<string> {
        return this.executeContractMethod("UUPSUnauthorizedCallContext");
    }

    public async UUPSUnsupportedProxiableUUID(slot: bytes32) : Promise<string> {
        return this.executeContractMethod("UUPSUnsupportedProxiableUUID", slot);
    }

    public async Initialized(version: uint64) : Promise<string> {
        return this.executeContractMethod("Initialized", version);
    }

    public async LotteryResultAdded(index: uint256,winner: address,reward: uint256) : Promise<string> {
        return this.executeContractMethod("LotteryResultAdded", index,winner,reward);
    }

    public async OwnershipTransferred(previousOwner: address,newOwner: address) : Promise<string> {
        return this.executeContractMethod("OwnershipTransferred", previousOwner,newOwner);
    }

    public async Upgraded(implementation: address) : Promise<string> {
        return this.executeContractMethod("Upgraded", implementation);
    }

    public async UPGRADE_INTERFACE_VERSION() : Promise<string> {
        return this.executeContractMethod("UPGRADE_INTERFACE_VERSION");
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

    public async initialize(sender: address) : Promise<string> {
        return this.executeContractMethod("initialize", sender);
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

    public async proxiableUUID() : Promise<bytes32> {
        return this.executeContractMethod("proxiableUUID");
    }

    public async renounceOwnership() : Promise<string> {
        return this.executeContractMethod("renounceOwnership");
    }

    public async ticketPrice() : Promise<uint256> {
        return this.executeContractMethod("ticketPrice");
    }

    public async transferOwnership(newOwner: address) : Promise<string> {
        return this.executeContractMethod("transferOwnership", newOwner);
    }

    public async upgradeToAndCall(newImplementation: address,data: bytes, param: TransactionParameters) : Promise<string> {
        return this.executePayableContractMethod("upgradeToAndCall", param, newImplementation,data);
    }

}