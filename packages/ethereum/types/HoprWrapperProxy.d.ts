/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface HoprWrapperProxyInterface extends ethers.utils.Interface {
  functions: {
    "ERC1820_REGISTRY()": FunctionFragment;
    "TOKENS_RECIPIENT_INTERFACE_HASH()": FunctionFragment;
    "WRAPPER()": FunctionFragment;
    "WXHOPR_TOKEN()": FunctionFragment;
    "XDAI_MULTISIG()": FunctionFragment;
    "XHOPR_TOKEN()": FunctionFragment;
    "onTokenTransfer(address,uint256,bytes)": FunctionFragment;
    "recoverTokens(address)": FunctionFragment;
    "tokensReceived(address,address,address,uint256,bytes,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ERC1820_REGISTRY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "TOKENS_RECIPIENT_INTERFACE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "WRAPPER", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "WXHOPR_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "XDAI_MULTISIG",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "XHOPR_TOKEN",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "onTokenTransfer",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverTokens",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tokensReceived",
    values: [string, string, string, BigNumberish, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ERC1820_REGISTRY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "TOKENS_RECIPIENT_INTERFACE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WRAPPER", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "WXHOPR_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "XDAI_MULTISIG",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "XHOPR_TOKEN",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onTokenTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokensReceived",
    data: BytesLike
  ): Result;

  events: {
    "FowardedFrom(address,uint256)": EventFragment;
    "FowardedTo(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FowardedFrom"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FowardedTo"): EventFragment;
}

export type FowardedFromEvent = TypedEvent<
  [string, BigNumber] & { from: string; amount: BigNumber }
>;

export type FowardedToEvent = TypedEvent<
  [string, BigNumber] & { to: string; amount: BigNumber }
>;

export class HoprWrapperProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: HoprWrapperProxyInterface;

  functions: {
    ERC1820_REGISTRY(overrides?: CallOverrides): Promise<[string]>;

    TOKENS_RECIPIENT_INTERFACE_HASH(
      overrides?: CallOverrides
    ): Promise<[string]>;

    WRAPPER(overrides?: CallOverrides): Promise<[string]>;

    WXHOPR_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    XDAI_MULTISIG(overrides?: CallOverrides): Promise<[string]>;

    XHOPR_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    onTokenTransfer(
      _from: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recoverTokens(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokensReceived(
      operator: string,
      from: string,
      to: string,
      amount: BigNumberish,
      userData: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  ERC1820_REGISTRY(overrides?: CallOverrides): Promise<string>;

  TOKENS_RECIPIENT_INTERFACE_HASH(overrides?: CallOverrides): Promise<string>;

  WRAPPER(overrides?: CallOverrides): Promise<string>;

  WXHOPR_TOKEN(overrides?: CallOverrides): Promise<string>;

  XDAI_MULTISIG(overrides?: CallOverrides): Promise<string>;

  XHOPR_TOKEN(overrides?: CallOverrides): Promise<string>;

  onTokenTransfer(
    _from: string,
    _value: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recoverTokens(
    token: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokensReceived(
    operator: string,
    from: string,
    to: string,
    amount: BigNumberish,
    userData: BytesLike,
    operatorData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ERC1820_REGISTRY(overrides?: CallOverrides): Promise<string>;

    TOKENS_RECIPIENT_INTERFACE_HASH(overrides?: CallOverrides): Promise<string>;

    WRAPPER(overrides?: CallOverrides): Promise<string>;

    WXHOPR_TOKEN(overrides?: CallOverrides): Promise<string>;

    XDAI_MULTISIG(overrides?: CallOverrides): Promise<string>;

    XHOPR_TOKEN(overrides?: CallOverrides): Promise<string>;

    onTokenTransfer(
      _from: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    recoverTokens(token: string, overrides?: CallOverrides): Promise<void>;

    tokensReceived(
      operator: string,
      from: string,
      to: string,
      amount: BigNumberish,
      userData: BytesLike,
      operatorData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "FowardedFrom(address,uint256)"(
      from?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { from: string; amount: BigNumber }
    >;

    FowardedFrom(
      from?: null,
      amount?: null
    ): TypedEventFilter<
      [string, BigNumber],
      { from: string; amount: BigNumber }
    >;

    "FowardedTo(address,uint256)"(
      to?: null,
      amount?: null
    ): TypedEventFilter<[string, BigNumber], { to: string; amount: BigNumber }>;

    FowardedTo(
      to?: null,
      amount?: null
    ): TypedEventFilter<[string, BigNumber], { to: string; amount: BigNumber }>;
  };

  estimateGas: {
    ERC1820_REGISTRY(overrides?: CallOverrides): Promise<BigNumber>;

    TOKENS_RECIPIENT_INTERFACE_HASH(
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    WRAPPER(overrides?: CallOverrides): Promise<BigNumber>;

    WXHOPR_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    XDAI_MULTISIG(overrides?: CallOverrides): Promise<BigNumber>;

    XHOPR_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    onTokenTransfer(
      _from: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recoverTokens(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokensReceived(
      operator: string,
      from: string,
      to: string,
      amount: BigNumberish,
      userData: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ERC1820_REGISTRY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TOKENS_RECIPIENT_INTERFACE_HASH(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    WRAPPER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WXHOPR_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    XDAI_MULTISIG(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    XHOPR_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onTokenTransfer(
      _from: string,
      _value: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recoverTokens(
      token: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokensReceived(
      operator: string,
      from: string,
      to: string,
      amount: BigNumberish,
      userData: BytesLike,
      operatorData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
