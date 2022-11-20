/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface LibCastTestInterface extends utils.Interface {
  functions: {
    "asAddresses(uint256[])": FunctionFragment;
    "asEvalFunctionPointer(uint256)": FunctionFragment;
    "asIntegrityFunctionPointer(uint256)": FunctionFragment;
    "asIntegrityPointers(uint256[])": FunctionFragment;
    "asOpFunctionPointer(uint256)": FunctionFragment;
    "asOpFunctionPointers(uint256[])": FunctionFragment;
    "asUint256ArrayIntPtrs(uint256[])": FunctionFragment;
    "asUint256ArrayOpPtrs(uint256[])": FunctionFragment;
    "asUint256ArrayUint256(uint256[])": FunctionFragment;
    "asUint256Bool(bool)": FunctionFragment;
    "asUint256EvalPtr(uint256)": FunctionFragment;
    "asUint256IntPtr(uint256[])": FunctionFragment;
    "asUint256Uint256()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "asAddresses"
      | "asEvalFunctionPointer"
      | "asIntegrityFunctionPointer"
      | "asIntegrityPointers"
      | "asOpFunctionPointer"
      | "asOpFunctionPointers"
      | "asUint256ArrayIntPtrs"
      | "asUint256ArrayOpPtrs"
      | "asUint256ArrayUint256"
      | "asUint256Bool"
      | "asUint256EvalPtr"
      | "asUint256IntPtr"
      | "asUint256Uint256"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "asAddresses",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asEvalFunctionPointer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "asIntegrityFunctionPointer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "asIntegrityPointers",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asOpFunctionPointer",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "asOpFunctionPointers",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256ArrayIntPtrs",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256ArrayOpPtrs",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256ArrayUint256",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256Bool",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256EvalPtr",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256IntPtr",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "asUint256Uint256",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "asAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asEvalFunctionPointer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asIntegrityFunctionPointer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asIntegrityPointers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asOpFunctionPointer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asOpFunctionPointers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256ArrayIntPtrs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256ArrayOpPtrs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256ArrayUint256",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256Bool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256EvalPtr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256IntPtr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "asUint256Uint256",
    data: BytesLike
  ): Result;

  events: {};
}

export interface LibCastTest extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibCastTestInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    asAddresses(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[string[]] & { addresses_: string[] }>;

    asEvalFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asIntegrityFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asIntegrityPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asOpFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asOpFunctionPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256ArrayIntPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256ArrayOpPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256ArrayUint256(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    asUint256Bool(
      bool_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256EvalPtr(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256IntPtr(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    asUint256Uint256(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  asAddresses(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<string[]>;

  asEvalFunctionPointer(
    i_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asIntegrityFunctionPointer(
    i_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asIntegrityPointers(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asOpFunctionPointer(
    i_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asOpFunctionPointers(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256ArrayIntPtrs(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256ArrayOpPtrs(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256ArrayUint256(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  asUint256Bool(
    bool_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256EvalPtr(
    i_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256IntPtr(
    is_: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  asUint256Uint256(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    asAddresses(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<string[]>;

    asEvalFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    asIntegrityFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    asIntegrityPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    asOpFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    asOpFunctionPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    asUint256ArrayIntPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    asUint256ArrayOpPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    asUint256ArrayUint256(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    asUint256Bool(
      bool_: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    asUint256EvalPtr(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    asUint256IntPtr(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    asUint256Uint256(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    asAddresses(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    asEvalFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asIntegrityFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asIntegrityPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asOpFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asOpFunctionPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256ArrayIntPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256ArrayOpPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256ArrayUint256(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    asUint256Bool(
      bool_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256EvalPtr(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256IntPtr(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    asUint256Uint256(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    asAddresses(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    asEvalFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asIntegrityFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asIntegrityPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asOpFunctionPointer(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asOpFunctionPointers(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256ArrayIntPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256ArrayOpPtrs(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256ArrayUint256(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    asUint256Bool(
      bool_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256EvalPtr(
      i_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256IntPtr(
      is_: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    asUint256Uint256(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}