[@hoprnet/hopr-utils](README.md) / Exports

# @hoprnet/hopr-utils

## Table of contents

### References

- [DialOpts](modules.md#dialopts)

### Enumerations

- [ChannelStatus](enums/ChannelStatus.md)
- [DialStatus](enums/DialStatus.md)

### Classes

- [AccountEntry](classes/AccountEntry.md)
- [AcknowledgedTicket](classes/AcknowledgedTicket.md)
- [Address](classes/Address.md)
- [Balance](classes/Balance.md)
- [Challenge](classes/Challenge.md)
- [ChannelEntry](classes/ChannelEntry.md)
- [CurvePoint](classes/CurvePoint.md)
- [EthereumChallenge](classes/EthereumChallenge.md)
- [HalfKey](classes/HalfKey.md)
- [HalfKeyChallenge](classes/HalfKeyChallenge.md)
- [Hash](classes/Hash.md)
- [HoprDB](classes/HoprDB.md)
- [MultiCounter](classes/MultiCounter.md)
- [MultiGauge](classes/MultiGauge.md)
- [MultiHistogram](classes/MultiHistogram.md)
- [NativeBalance](classes/NativeBalance.md)
- [PRG](classes/PRG.md)
- [PRP](classes/PRP.md)
- [PublicKey](classes/PublicKey.md)
- [Response](classes/Response.md)
- [Signature](classes/Signature.md)
- [SimpleCounter](classes/SimpleCounter.md)
- [SimpleGauge](classes/SimpleGauge.md)
- [SimpleHistogram](classes/SimpleHistogram.md)
- [SimpleTimer](classes/SimpleTimer.md)
- [Snapshot](classes/Snapshot.md)
- [Ticket](classes/Ticket.md)
- [UINT256](classes/UINT256.md)
- [UnacknowledgedTicket](classes/UnacknowledgedTicket.md)

### Interfaces

- [FIFO](interfaces/FIFO.md)
- [Intermediate](interfaces/Intermediate.md)
- [NetOptions](interfaces/NetOptions.md)

### Type Aliases

- [AddressSorter](modules.md#addresssorter)
- [DeferType](modules.md#defertype)
- [DialResponse](modules.md#dialresponse)
- [Hosts](modules.md#hosts)
- [LibP2PHandlerArgs](modules.md#libp2phandlerargs)
- [LibP2PHandlerFunction](modules.md#libp2phandlerfunction)
- [MetricCollector](modules.md#metriccollector)
- [Network](modules.md#network)
- [PRGParameters](modules.md#prgparameters)
- [PRPParameters](modules.md#prpparameters)
- [PendingAckowledgement](modules.md#pendingackowledgement)
- [TimeoutOpts](modules.md#timeoutopts)
- [U8aAndSize](modules.md#u8aandsize)
- [WaitingAsRelayer](modules.md#waitingasrelayer)
- [WaitingAsSender](modules.md#waitingassender)

### Variables

- [ADDRESS\_LENGTH](modules.md#address_length)
- [A\_EQUALS\_B](modules.md#a_equals_b)
- [A\_STRICLY\_LESS\_THAN\_B](modules.md#a_stricly_less_than_b)
- [A\_STRICTLY\_GREATER\_THAN\_B](modules.md#a_strictly_greater_than_b)
- [CARRIER\_GRADE\_NAT\_NETWORK](modules.md#carrier_grade_nat_network)
- [DEFAULT\_BACKOFF\_PARAMETERS](modules.md#default_backoff_parameters)
- [HASH\_LENGTH](modules.md#hash_length)
- [INVERSE\_TICKET\_WIN\_PROB](modules.md#inverse_ticket_win_prob)
- [LENGTH\_PREFIX\_LENGTH](modules.md#length_prefix_length)
- [LINK\_LOCAL\_NETWORKS](modules.md#link_local_networks)
- [LOOPBACK\_ADDRS](modules.md#loopback_addrs)
- [MAX\_AUTO\_CHANNELS](modules.md#max_auto_channels)
- [MAX\_RANDOM\_BIGINTEGER](modules.md#max_random_biginteger)
- [MAX\_RANDOM\_INTEGER](modules.md#max_random_integer)
- [MINIMUM\_REASONABLE\_CHANNEL\_STAKE](modules.md#minimum_reasonable_channel_stake)
- [MIN\_NATIVE\_BALANCE](modules.md#min_native_balance)
- [MULTI\_ADDR\_MAX\_LENGTH](modules.md#multi_addr_max_length)
- [POR\_STRING\_LENGTH](modules.md#por_string_length)
- [PRG\_COUNTER\_LENGTH](modules.md#prg_counter_length)
- [PRG\_IV\_LENGTH](modules.md#prg_iv_length)
- [PRG\_KEY\_LENGTH](modules.md#prg_key_length)
- [PRICE\_PER\_PACKET](modules.md#price_per_packet)
- [PRIVATE\_KEY\_LENGTH](modules.md#private_key_length)
- [PRIVATE\_NETWORKS](modules.md#private_networks)
- [PRIVATE\_V4\_CLASS\_A](modules.md#private_v4_class_a)
- [PRIVATE\_V4\_CLASS\_AVADO](modules.md#private_v4_class_avado)
- [PRIVATE\_V4\_CLASS\_B](modules.md#private_v4_class_b)
- [PRIVATE\_V4\_CLASS\_C](modules.md#private_v4_class_c)
- [PRP\_IV\_LENGTH](modules.md#prp_iv_length)
- [PRP\_KEY\_LENGTH](modules.md#prp_key_length)
- [PRP\_MIN\_LENGTH](modules.md#prp_min_length)
- [PUBLIC\_KEY\_LENGTH](modules.md#public_key_length)
- [RESERVED\_ADDRS](modules.md#reserved_addrs)
- [SECP256K1\_CONSTANTS](modules.md#secp256k1_constants)
- [SECRET\_LENGTH](modules.md#secret_length)
- [SIGNATURE\_LENGTH](modules.md#signature_length)
- [SIGNATURE\_RECOVERY\_LENGTH](modules.md#signature_recovery_length)
- [SUGGESTED\_BALANCE](modules.md#suggested_balance)
- [SUGGESTED\_NATIVE\_BALANCE](modules.md#suggested_native_balance)
- [UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH](modules.md#uncompressed_public_key_length)
- [b58StringRegex](modules.md#b58stringregex)
- [dbMock](modules.md#dbmock)
- [durations](modules.md#durations)
- [metricCollectors](modules.md#metriccollectors)

### Functions

- [FIFO](modules.md#fifo)
- [abortableTimeout](modules.md#abortabletimeout)
- [cacheNoArgAsyncFunction](modules.md#cachenoargasyncfunction)
- [channelStatusToString](modules.md#channelstatustostring)
- [checkNetworks](modules.md#checknetworks)
- [convertPubKeyFromB58String](modules.md#convertpubkeyfromb58string)
- [convertPubKeyFromPeerId](modules.md#convertpubkeyfrompeerid)
- [createCircuitAddress](modules.md#createcircuitaddress)
- [createMAC](modules.md#createmac)
- [createPacket](modules.md#createpacket)
- [createPoRString](modules.md#createporstring)
- [createPoRValuesForSender](modules.md#createporvaluesforsender)
- [createRelayerKey](modules.md#createrelayerkey)
- [create\_counter](modules.md#create_counter)
- [create\_gauge](modules.md#create_gauge)
- [create\_histogram](modules.md#create_histogram)
- [create\_histogram\_with\_buckets](modules.md#create_histogram_with_buckets)
- [create\_multi\_counter](modules.md#create_multi_counter)
- [create\_multi\_gauge](modules.md#create_multi_gauge)
- [create\_multi\_histogram](modules.md#create_multi_histogram)
- [create\_multi\_histogram\_with\_buckets](modules.md#create_multi_histogram_with_buckets)
- [debug](modules.md#debug)
- [decodePoRBytes](modules.md#decodeporbytes)
- [defer](modules.md#defer)
- [deriveAckKeyShare](modules.md#deriveackkeyshare)
- [deriveBlinding](modules.md#deriveblinding)
- [deriveCommitmentSeed](modules.md#derivecommitmentseed)
- [derivePRGParameters](modules.md#deriveprgparameters)
- [derivePRPParameters](modules.md#deriveprpparameters)
- [derivePacketTag](modules.md#derivepackettag)
- [deserializeKeyPair](modules.md#deserializekeypair)
- [dial](modules.md#dial)
- [expandVars](modules.md#expandvars)
- [forwardTransform](modules.md#forwardtransform)
- [gather\_all\_metrics](modules.md#gather_all_metrics)
- [gcd](modules.md#gcd)
- [generateChannelId](modules.md#generatechannelid)
- [generateKeyShares](modules.md#generatekeyshares)
- [getB58String](modules.md#getb58string)
- [getBackoffRetries](modules.md#getbackoffretries)
- [getBackoffRetryTimeout](modules.md#getbackoffretrytimeout)
- [getHeaderLength](modules.md#getheaderlength)
- [getLocalAddresses](modules.md#getlocaladdresses)
- [getLocalHosts](modules.md#getlocalhosts)
- [getMetricsCollectors](modules.md#getmetricscollectors)
- [getNetworkPrefix](modules.md#getnetworkprefix)
- [getPacketLength](modules.md#getpacketlength)
- [getPrivateAddresses](modules.md#getprivateaddresses)
- [getPublicAddresses](modules.md#getpublicaddresses)
- [get\_package\_version](modules.md#get_package_version)
- [hasB58String](modules.md#hasb58string)
- [inSameNetwork](modules.md#insamenetwork)
- [ipToU8aAddress](modules.md#iptou8aaddress)
- [isAddressWithPeerId](modules.md#isaddresswithpeerid)
- [isAnyAddress](modules.md#isanyaddress)
- [isAvadoPrivateNetwork](modules.md#isavadoprivatenetwork)
- [isErrorOutOfFunds](modules.md#iserroroutoffunds)
- [isErrorOutOfHoprFunds](modules.md#iserroroutofhoprfunds)
- [isErrorOutOfNativeFunds](modules.md#iserroroutofnativefunds)
- [isExpired](modules.md#isexpired)
- [isLinkLocaleAddress](modules.md#islinklocaleaddress)
- [isLocalhost](modules.md#islocalhost)
- [isMultiaddrLocal](modules.md#ismultiaddrlocal)
- [isPrivateAddress](modules.md#isprivateaddress)
- [isReservedAddress](modules.md#isreservedaddress)
- [isSecp256k1PeerId](modules.md#issecp256k1peerid)
- [iterableToArray](modules.md#iterabletoarray)
- [iterateHash](modules.md#iteratehash)
- [keyShareTransform](modules.md#keysharetransform)
- [libp2pSendMessage](modules.md#libp2psendmessage)
- [libp2pSubscribe](modules.md#libp2psubscribe)
- [loadJson](modules.md#loadjson)
- [merge\_encoded\_metrics](modules.md#merge_encoded_metrics)
- [moveDecimalPoint](modules.md#movedecimalpoint)
- [nAtATime](modules.md#natatime)
- [oneAtATime](modules.md#oneatatime)
- [ordered](modules.md#ordered)
- [parseHosts](modules.md#parsehosts)
- [parseJSON](modules.md#parsejson)
- [pickVersion](modules.md#pickversion)
- [preVerify](modules.md#preverify)
- [prefixLength](modules.md#prefixlength)
- [privKeyToPeerId](modules.md#privkeytopeerid)
- [pubKeyToPeerId](modules.md#pubkeytopeerid)
- [randomBigInteger](modules.md#randombiginteger)
- [randomChoice](modules.md#randomchoice)
- [randomFloat](modules.md#randomfloat)
- [randomInteger](modules.md#randominteger)
- [randomPermutation](modules.md#randompermutation)
- [randomSubset](modules.md#randomsubset)
- [recoverIteratedHash](modules.md#recoveriteratedhash)
- [registerMetricsCollector](modules.md#registermetricscollector)
- [retimer](modules.md#retimer)
- [retryWithBackoffThenThrow](modules.md#retrywithbackoffthenthrow)
- [sampleGroupElement](modules.md#samplegroupelement)
- [serializeKeyPair](modules.md#serializekeypair)
- [serializeToU8a](modules.md#serializetou8a)
- [setupPromiseRejectionFilter](modules.md#setuppromiserejectionfilter)
- [startResourceUsageLogger](modules.md#startresourceusagelogger)
- [stringToU8a](modules.md#stringtou8a)
- [timeout](modules.md#timeout)
- [timer](modules.md#timer)
- [toNetworkPrefix](modules.md#tonetworkprefix)
- [toU8a](modules.md#tou8a)
- [tryExistingConnections](modules.md#tryexistingconnections)
- [u8aAdd](modules.md#u8aadd)
- [u8aAddrToString](modules.md#u8aaddrtostring)
- [u8aAddressToCIDR](modules.md#u8aaddresstocidr)
- [u8aCompare](modules.md#u8acompare)
- [u8aConcat](modules.md#u8aconcat)
- [u8aEquals](modules.md#u8aequals)
- [u8aSplit](modules.md#u8asplit)
- [u8aToHex](modules.md#u8atohex)
- [u8aToNumber](modules.md#u8atonumber)
- [u8aToNumberOrBigInt](modules.md#u8atonumberorbigint)
- [u8aXOR](modules.md#u8axor)
- [validateData](modules.md#validatedata)
- [validatePoRHalfKeys](modules.md#validateporhalfkeys)
- [validatePoRHint](modules.md#validateporhint)
- [validatePoRResponse](modules.md#validateporresponse)
- [verifySignatureFromPeerId](modules.md#verifysignaturefrompeerid)
- [wait](modules.md#wait)

## References

### DialOpts

Renames and re-exports [TimeoutOpts](modules.md#timeoutopts)

## Type Aliases

### AddressSorter

Ƭ **AddressSorter**: (`input`: `Address`[]) => `Address`[]

#### Type declaration

▸ (`input`): `Address`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Address`[] |

##### Returns

`Address`[]

#### Defined in

[utils/src/libp2p/addressSorters.ts:35](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L35)

___

### DeferType

Ƭ **DeferType**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> |
| `reject` | (`reason?`: `any`) => `void` |
| `resolve` | (`value`: `T` \| `PromiseLike`<`T`\>) => `void` |

#### Defined in

[utils/src/async/defer.ts:1](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/defer.ts#L1)

___

### DialResponse

Ƭ **DialResponse**: { `resp`: `ProtocolStream` & { `conn`: `Connection`  } ; `status`: [`SUCCESS`](enums/DialStatus.md#success)  } \| { `status`: [`TIMEOUT`](enums/DialStatus.md#timeout)  } \| { `status`: [`ABORTED`](enums/DialStatus.md#aborted)  } \| { `dhtContacted`: `boolean` ; `status`: [`DIAL_ERROR`](enums/DialStatus.md#dial_error)  } \| { `query`: `string` ; `status`: [`DHT_ERROR`](enums/DialStatus.md#dht_error)  } \| { `status`: [`NO_DHT`](enums/DialStatus.md#no_dht)  }

#### Defined in

[utils/src/libp2p/dialHelper.ts:40](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/dialHelper.ts#L40)

___

### Hosts

Ƭ **Hosts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ip4?` | [`NetOptions`](interfaces/NetOptions.md) |
| `ip6?` | [`NetOptions`](interfaces/NetOptions.md) |

#### Defined in

[utils/src/network/hosts.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/hosts.ts#L6)

___

### LibP2PHandlerArgs

Ƭ **LibP2PHandlerArgs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connection` | `Connection` |
| `protocol` | `string` |
| `stream` | `ProtocolStream`[``"stream"``] |

#### Defined in

[utils/src/libp2p/index.ts:171](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L171)

___

### LibP2PHandlerFunction

Ƭ **LibP2PHandlerFunction**<`T`\>: (`msg`: `Uint8Array`, `remotePeer`: `PeerId`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`msg`, `remotePeer`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `Uint8Array` |
| `remotePeer` | `PeerId` |

##### Returns

`T`

#### Defined in

[utils/src/libp2p/index.ts:172](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L172)

___

### MetricCollector

Ƭ **MetricCollector**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[utils/src/index.ts:46](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/index.ts#L46)

___

### Network

Ƭ **Network**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `family` | `NetworkInterfaceInfo`[``"family"``] |
| `networkPrefix` | `Uint8Array` |
| `subnet` | `Uint8Array` |

#### Defined in

[utils/src/network/constants.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L3)

___

### PRGParameters

Ƭ **PRGParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `iv` | `Uint8Array` |
| `key` | `Uint8Array` |

#### Defined in

[utils/src/crypto/prg.ts:11](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L11)

___

### PRPParameters

Ƭ **PRPParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `iv` | `Uint8Array` |
| `key` | `Uint8Array` |

#### Defined in

[utils/src/crypto/prp.ts:16](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L16)

___

### PendingAckowledgement

Ƭ **PendingAckowledgement**: [`WaitingAsSender`](modules.md#waitingassender) \| [`WaitingAsRelayer`](modules.md#waitingasrelayer)

#### Defined in

[utils/src/db/db.ts:126](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/db/db.ts#L126)

___

### TimeoutOpts

Ƭ **TimeoutOpts**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signal?` | `AbortSignal` |
| `timeout` | `number` |

#### Defined in

[utils/src/async/abortableTimeout.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/abortableTimeout.ts#L8)

___

### U8aAndSize

Ƭ **U8aAndSize**: [`Uint8Array`, `number`]

#### Defined in

[utils/src/u8a/index.ts:17](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L17)

___

### WaitingAsRelayer

Ƭ **WaitingAsRelayer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMessageSender` | ``false`` |
| `ticket` | [`UnacknowledgedTicket`](classes/UnacknowledgedTicket.md) |

#### Defined in

[utils/src/db/db.ts:121](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/db/db.ts#L121)

___

### WaitingAsSender

Ƭ **WaitingAsSender**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isMessageSender` | ``true`` |

#### Defined in

[utils/src/db/db.ts:117](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/db/db.ts#L117)

## Variables

### ADDRESS\_LENGTH

• `Const` **ADDRESS\_LENGTH**: ``20``

#### Defined in

[utils/src/constants.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L6)

___

### A\_EQUALS\_B

• `Const` **A\_EQUALS\_B**: ``0``

#### Defined in

[utils/src/u8a/u8aCompare.ts:2](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L2)

___

### A\_STRICLY\_LESS\_THAN\_B

• `Const` **A\_STRICLY\_LESS\_THAN\_B**: ``-1``

#### Defined in

[utils/src/u8a/u8aCompare.ts:1](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L1)

___

### A\_STRICTLY\_GREATER\_THAN\_B

• `Const` **A\_STRICTLY\_GREATER\_THAN\_B**: ``1``

#### Defined in

[utils/src/u8a/u8aCompare.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L3)

___

### CARRIER\_GRADE\_NAT\_NETWORK

• `Const` **CARRIER\_GRADE\_NAT\_NETWORK**: [`Network`](modules.md#network)

#### Defined in

[utils/src/network/constants.ts:34](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L34)

___

### DEFAULT\_BACKOFF\_PARAMETERS

• `Const` **DEFAULT\_BACKOFF\_PARAMETERS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `delayMultiple` | `number` |
| `maxDelay` | `number` |
| `minDelay` | `number` |

#### Defined in

[utils/src/async/backoff.ts:9](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L9)

___

### HASH\_LENGTH

• `Const` **HASH\_LENGTH**: ``32``

#### Defined in

[utils/src/constants.ts:7](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L7)

___

### INVERSE\_TICKET\_WIN\_PROB

• `Const` **INVERSE\_TICKET\_WIN\_PROB**: `BN`

#### Defined in

[utils/src/constants.ts:16](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L16)

___

### LENGTH\_PREFIX\_LENGTH

• `Const` **LENGTH\_PREFIX\_LENGTH**: ``4``

#### Defined in

[utils/src/u8a/constants.ts:1](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/constants.ts#L1)

___

### LINK\_LOCAL\_NETWORKS

• `Const` **LINK\_LOCAL\_NETWORKS**: [`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/constants.ts:55](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L55)

___

### LOOPBACK\_ADDRS

• `Const` **LOOPBACK\_ADDRS**: [`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/constants.ts:69](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L69)

___

### MAX\_AUTO\_CHANNELS

• `Const` **MAX\_AUTO\_CHANNELS**: ``5``

#### Defined in

[utils/src/constants.ts:20](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L20)

___

### MAX\_RANDOM\_BIGINTEGER

• `Const` **MAX\_RANDOM\_BIGINTEGER**: `bigint`

Maximum random big integer that can be generated using randomInteger function.

#### Defined in

[utils/src/crypto/randomInteger.ts:18](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L18)

___

### MAX\_RANDOM\_INTEGER

• `Const` **MAX\_RANDOM\_INTEGER**: `bigint`

Maximum random integer that can be generated using randomInteger function.

#### Defined in

[utils/src/crypto/randomInteger.ts:144](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L144)

___

### MINIMUM\_REASONABLE\_CHANNEL\_STAKE

• `Const` **MINIMUM\_REASONABLE\_CHANNEL\_STAKE**: `BN`

#### Defined in

[utils/src/constants.ts:18](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L18)

___

### MIN\_NATIVE\_BALANCE

• `Const` **MIN\_NATIVE\_BALANCE**: `BN`

#### Defined in

[utils/src/constants.ts:23](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L23)

___

### MULTI\_ADDR\_MAX\_LENGTH

• `Const` **MULTI\_ADDR\_MAX\_LENGTH**: ``200``

#### Defined in

[utils/src/constants.ts:12](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L12)

___

### POR\_STRING\_LENGTH

• `Const` **POR\_STRING\_LENGTH**: `number`

#### Defined in

[utils/src/crypto/por/index.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L8)

___

### PRG\_COUNTER\_LENGTH

• `Const` **PRG\_COUNTER\_LENGTH**: ``4``

#### Defined in

[utils/src/crypto/prg.ts:7](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L7)

___

### PRG\_IV\_LENGTH

• `Const` **PRG\_IV\_LENGTH**: ``12``

#### Defined in

[utils/src/crypto/prg.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L6)

___

### PRG\_KEY\_LENGTH

• `Const` **PRG\_KEY\_LENGTH**: ``16``

#### Defined in

[utils/src/crypto/prg.ts:5](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prg.ts#L5)

___

### PRICE\_PER\_PACKET

• `Const` **PRICE\_PER\_PACKET**: `BN`

#### Defined in

[utils/src/constants.ts:14](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L14)

___

### PRIVATE\_KEY\_LENGTH

• `Const` **PRIVATE\_KEY\_LENGTH**: ``32``

#### Defined in

[utils/src/constants.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L3)

___

### PRIVATE\_NETWORKS

• `Const` **PRIVATE\_NETWORKS**: [`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/constants.ts:41](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L41)

___

### PRIVATE\_V4\_CLASS\_A

• `Const` **PRIVATE\_V4\_CLASS\_A**: [`Network`](modules.md#network)

#### Defined in

[utils/src/network/constants.ts:9](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L9)

___

### PRIVATE\_V4\_CLASS\_AVADO

• `Const` **PRIVATE\_V4\_CLASS\_AVADO**: [`Network`](modules.md#network)

#### Defined in

[utils/src/network/constants.ts:22](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L22)

___

### PRIVATE\_V4\_CLASS\_B

• `Const` **PRIVATE\_V4\_CLASS\_B**: [`Network`](modules.md#network)

#### Defined in

[utils/src/network/constants.ts:15](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L15)

___

### PRIVATE\_V4\_CLASS\_C

• `Const` **PRIVATE\_V4\_CLASS\_C**: [`Network`](modules.md#network)

#### Defined in

[utils/src/network/constants.ts:28](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L28)

___

### PRP\_IV\_LENGTH

• `Const` **PRP\_IV\_LENGTH**: `number`

#### Defined in

[utils/src/crypto/prp.ts:13](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L13)

___

### PRP\_KEY\_LENGTH

• `Const` **PRP\_KEY\_LENGTH**: `number`

#### Defined in

[utils/src/crypto/prp.ts:12](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L12)

___

### PRP\_MIN\_LENGTH

• `Const` **PRP\_MIN\_LENGTH**: ``32``

#### Defined in

[utils/src/crypto/prp.ts:14](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/prp.ts#L14)

___

### PUBLIC\_KEY\_LENGTH

• `Const` **PUBLIC\_KEY\_LENGTH**: ``33``

#### Defined in

[utils/src/constants.ts:4](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L4)

___

### RESERVED\_ADDRS

• `Const` **RESERVED\_ADDRS**: [`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/constants.ts:82](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/constants.ts#L82)

___

### SECP256K1\_CONSTANTS

• `Const` **SECP256K1\_CONSTANTS**: `Object`

Several ECDSA on secp256k1 related constants

#### Type declaration

| Name | Type |
| :------ | :------ |
| `COMPRESSED_PUBLIC_KEY_LENGTH` | `number` |
| `PRIVATE_KEY_LENGTH` | `number` |
| `RECOVERABLE_SIGNATURE_LENGTH` | `number` |
| `SIGNATURE_LENGTH` | `number` |
| `UNCOMPRESSED_PUBLIC_KEY_LENGTH` | `number` |

#### Defined in

[utils/src/crypto/constants.ts:4](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/constants.ts#L4)

___

### SECRET\_LENGTH

• `Const` **SECRET\_LENGTH**: ``32``

#### Defined in

[utils/src/constants.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L8)

___

### SIGNATURE\_LENGTH

• `Const` **SIGNATURE\_LENGTH**: ``64``

#### Defined in

[utils/src/constants.ts:9](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L9)

___

### SIGNATURE\_RECOVERY\_LENGTH

• `Const` **SIGNATURE\_RECOVERY\_LENGTH**: ``1``

#### Defined in

[utils/src/constants.ts:10](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L10)

___

### SUGGESTED\_BALANCE

• `Const` **SUGGESTED\_BALANCE**: `BN`

#### Defined in

[utils/src/constants.ts:27](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L27)

___

### SUGGESTED\_NATIVE\_BALANCE

• `Const` **SUGGESTED\_NATIVE\_BALANCE**: `BN`

#### Defined in

[utils/src/constants.ts:24](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L24)

___

### UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH

• `Const` **UNCOMPRESSED\_PUBLIC\_KEY\_LENGTH**: ``66``

#### Defined in

[utils/src/constants.ts:5](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/constants.ts#L5)

___

### b58StringRegex

• `Const` **b58StringRegex**: `RegExp`

Regular expresion used to match b58Strings

#### Defined in

[utils/src/libp2p/index.ts:30](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L30)

___

### dbMock

• `Const` **dbMock**: [`HoprDB`](classes/HoprDB.md) = `db`

#### Defined in

[utils/src/db/db.mock.ts:13](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/db/db.mock.ts#L13)

___

### durations

• `Const` **durations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `days` | (`days`: `number`) => `number` |
| `hours` | (`hours`: `number`) => `number` |
| `minutes` | (`minutes`: `number`) => `number` |
| `seconds` | (`seconds`: `number`) => `number` |

#### Defined in

[utils/src/time.ts:1](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/time.ts#L1)

___

### metricCollectors

• **metricCollectors**: [`MetricCollector`](modules.md#metriccollector)[] = `[]`

#### Defined in

[utils/src/index.ts:48](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/index.ts#L48)

## Functions

### FIFO

▸ **FIFO**<`T`\>(): [`FIFO`](modules.md#fifo)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`FIFO`](modules.md#fifo)<`T`\>

#### Defined in

[utils/src/collection/fifo.ts:19](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/collection/fifo.ts#L19)

___

### abortableTimeout

▸ **abortableTimeout**<`Result`, `AbortMsg`, `TimeoutMsg`\>(`fn`, `abortMsg`, `timeoutMsg`, `opts`): `Promise`<`Result` \| `AbortMsg` \| `TimeoutMsg`\>

Cals the worker function with a timeout. Once the timeout is done
abort the call using an abort controller.
If the caller aims to end the call before the tiemout has happened
it can pass an AbortController and end the call prematurely.

#### Type parameters

| Name |
| :------ |
| `Result` |
| `AbortMsg` |
| `TimeoutMsg` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`opts`: `Required`<[`TimeoutOpts`](modules.md#timeoutopts)\>) => `Promise`<`Result`\> | worker function to dial |
| `abortMsg` | `AbortMsg` | value to be returned if aborted |
| `timeoutMsg` | `TimeoutMsg` | value to be returned on timeout |
| `opts` | [`TimeoutOpts`](modules.md#timeoutopts) | options to pass to worker function |

#### Returns

`Promise`<`Result` \| `AbortMsg` \| `TimeoutMsg`\>

#### Defined in

[utils/src/async/abortableTimeout.ts:24](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/abortableTimeout.ts#L24)

___

### cacheNoArgAsyncFunction

▸ **cacheNoArgAsyncFunction**<`T`\>(`func`, `expiry`): () => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | () => `Promise`<`T`\> |
| `expiry` | `number` |

#### Returns

`fn`

▸ (): `Promise`<`T`\>

##### Returns

`Promise`<`T`\>

#### Defined in

[utils/src/async/cache.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/cache.ts#L8)

___

### channelStatusToString

▸ **channelStatusToString**(`status`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`ChannelStatus`](enums/ChannelStatus.md) |

#### Returns

`string`

#### Defined in

[utils/src/types/channelEntry.ts:31](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/types/channelEntry.ts#L31)

___

### checkNetworks

▸ **checkNetworks**(`networks`, `address`, `family`): `boolean`

Checks if given address is in one of the given networks

**`Dev`**

Used to check if a node is in the same network

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `networks` | [`Network`](modules.md#network)[] | network address spaces to check |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if address is at least one of the given networks

#### Defined in

[utils/src/network/addrs.ts:97](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L97)

___

### convertPubKeyFromB58String

▸ **convertPubKeyFromB58String**(`b58string`): `PublicKey`

Takes a B58String and converts them to a PublicKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `b58string` | `string` | the B58String used to represent the PeerId |

#### Returns

`PublicKey`

#### Defined in

[utils/src/libp2p/index.ts:47](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L47)

___

### convertPubKeyFromPeerId

▸ **convertPubKeyFromPeerId**(`peerId`): `PublicKey`

Takes a peerId and returns its corresponding public key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `PeerId` | the PeerId used to generate a public key |

#### Returns

`PublicKey`

#### Defined in

[utils/src/libp2p/index.ts:37](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L37)

___

### createCircuitAddress

▸ **createCircuitAddress**(`relay`): `Multiaddr`

Create a multiaddress that is a circuit address using given relay to the given destination.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `relay` | `PeerId` | Relay peer ID |

#### Returns

`Multiaddr`

#### Defined in

[utils/src/network/addrs.ts:314](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L314)

___

### createMAC

▸ **createMAC**(`secret`, `header`): `Uint8Array`

Computes the authentication tag to make the integrity of
the packet header verifiable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |
| `header` | `Uint8Array` | the packet header |

#### Returns

`Uint8Array`

the authentication tag

#### Defined in

[utils/src/crypto/packet/mac.ts:14](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/mac.ts#L14)

___

### createPacket

▸ **createPacket**(`secrets`, `alpha`, `msg`, `path`, `maxHops`, `additionalDataRelayerLength`, `additionalDataRelayer`, `additionalDataLastHop?`): `Uint8Array`

Creates a mixnet packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secrets` | `Uint8Array`[] | - |
| `alpha` | `Uint8Array` | - |
| `msg` | `Uint8Array` | payload to send |
| `path` | `PeerId`[] | nodes to use for relaying, including the final destination |
| `maxHops` | `number` | maximal number of hops to use |
| `additionalDataRelayerLength` | `number` | - |
| `additionalDataRelayer` | `Uint8Array`[] | additional data to put next to each node's routing information |
| `additionalDataLastHop?` | `Uint8Array` | additional data for the final destination |

#### Returns

`Uint8Array`

the packet as u8a

#### Defined in

[utils/src/crypto/packet/index.ts:69](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L69)

___

### createPoRString

▸ **createPoRString**(`secretC`, `secretD?`): `Uint8Array`

Creates the bitstring containing the PoR challenge for the next
downstream node as well as the hint that is used to verify the
challenge that is given to the relayer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretC` | `Uint8Array` | shared secret with node +2 |
| `secretD?` | `Uint8Array` | shared secret with node +3 |

#### Returns

`Uint8Array`

the bitstring that is embedded next to the routing
information for each relayer

#### Defined in

[utils/src/crypto/por/index.ts:46](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L46)

___

### createPoRValuesForSender

▸ **createPoRValuesForSender**(`secretB`, `secretC?`): `Object`

Takes the secrets which the first and the second relayer are able
to derive from the packet header and computes the challenge for
the first ticket.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretB` | `Uint8Array` | shared secret with node +1 |
| `secretC?` | `Uint8Array` | shared secret with node +2 |

#### Returns

`Object`

the challenge for the first ticket sent to the first relayer

| Name | Type |
| :------ | :------ |
| `ackChallenge` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `ownKey` | [`HalfKey`](classes/HalfKey.md) |
| `ticketChallenge` | [`Challenge`](classes/Challenge.md) |

#### Defined in

[utils/src/crypto/por/index.ts:20](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L20)

___

### createRelayerKey

▸ **createRelayerKey**(`destination`): `CID`

Creates a DHT entry to give relays the opportunity to signal
other nodes in the network that they act as a relay for the given
node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `PeerId` | peerId of the node for which relay services are provided |

#### Returns

`CID`

the DHT entry key

#### Defined in

[utils/src/libp2p/relayCode.ts:16](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/relayCode.ts#L16)

___

### create\_counter

▸ **create_counter**(`name`, `description`): [`SimpleCounter`](classes/SimpleCounter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

[`SimpleCounter`](classes/SimpleCounter.md)

#### Defined in

utils/lib/utils_metrics.d.ts:23

___

### create\_gauge

▸ **create_gauge**(`name`, `description`): [`SimpleGauge`](classes/SimpleGauge.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

[`SimpleGauge`](classes/SimpleGauge.md)

#### Defined in

utils/lib/utils_metrics.d.ts:36

___

### create\_histogram

▸ **create_histogram**(`name`, `description`): [`SimpleHistogram`](classes/SimpleHistogram.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |

#### Returns

[`SimpleHistogram`](classes/SimpleHistogram.md)

#### Defined in

utils/lib/utils_metrics.d.ts:49

___

### create\_histogram\_with\_buckets

▸ **create_histogram_with_buckets**(`name`, `description`, `buckets`): [`SimpleHistogram`](classes/SimpleHistogram.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `buckets` | `Float64Array` |

#### Returns

[`SimpleHistogram`](classes/SimpleHistogram.md)

#### Defined in

utils/lib/utils_metrics.d.ts:56

___

### create\_multi\_counter

▸ **create_multi_counter**(`name`, `description`, `labels`): [`MultiCounter`](classes/MultiCounter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `labels` | `string`[] |

#### Returns

[`MultiCounter`](classes/MultiCounter.md)

#### Defined in

utils/lib/utils_metrics.d.ts:30

___

### create\_multi\_gauge

▸ **create_multi_gauge**(`name`, `description`, `labels`): [`MultiGauge`](classes/MultiGauge.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `labels` | `string`[] |

#### Returns

[`MultiGauge`](classes/MultiGauge.md)

#### Defined in

utils/lib/utils_metrics.d.ts:43

___

### create\_multi\_histogram

▸ **create_multi_histogram**(`name`, `description`, `labels`): [`MultiHistogram`](classes/MultiHistogram.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `labels` | `string`[] |

#### Returns

[`MultiHistogram`](classes/MultiHistogram.md)

#### Defined in

utils/lib/utils_metrics.d.ts:63

___

### create\_multi\_histogram\_with\_buckets

▸ **create_multi_histogram_with_buckets**(`name`, `description`, `buckets`, `labels`): [`MultiHistogram`](classes/MultiHistogram.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `buckets` | `Float64Array` |
| `labels` | `string`[] |

#### Returns

[`MultiHistogram`](classes/MultiHistogram.md)

#### Defined in

utils/lib/utils_metrics.d.ts:71

___

### debug

▸ **debug**(`namespace`): (`message`: `any`, ...`parameters`: `any`[]) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `any` |

#### Returns

`fn`

▸ (`message`, `...parameters`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `...parameters` | `any`[] |

##### Returns

`void`

#### Defined in

[utils/src/process/debug.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/process/debug.ts#L3)

___

### decodePoRBytes

▸ **decodePoRBytes**(`porBytes`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `porBytes` | `Uint8Array` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `ackChallenge` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `nextTicketChallenge` | [`Challenge`](classes/Challenge.md) |

#### Defined in

[utils/src/crypto/por/index.ts:111](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L111)

___

### defer

▸ **defer**<`T`\>(): [`DeferType`](modules.md#defertype)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

[`DeferType`](modules.md#defertype)<`T`\>

#### Defined in

[utils/src/async/defer.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/defer.ts#L8)

___

### deriveAckKeyShare

▸ **deriveAckKeyShare**(`secret`): [`HalfKey`](classes/HalfKey.md)

Computes the key share that is embedded in the acknowledgement
for a packet and thereby unlocks the incentive for the previous
relayer for transforming and delivering the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |

#### Returns

[`HalfKey`](classes/HalfKey.md)

#### Defined in

[utils/src/crypto/por/keyDerivation.ts:31](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/keyDerivation.ts#L31)

___

### deriveBlinding

▸ **deriveBlinding**(`secret`): `Uint8Array`

Derive the blinding that is applied to the group element
before forwarding the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |

#### Returns

`Uint8Array`

the blinding

#### Defined in

[utils/src/crypto/packet/keyDerivation.ts:20](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyDerivation.ts#L20)

___

### deriveCommitmentSeed

▸ **deriveCommitmentSeed**(`privateKey`, `channelInfo`): `Uint8Array`

Derives the initial commitment seed on a newly opened channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `Uint8Array` | Node private key. |
| `channelInfo` | `Uint8Array` | Additional information identifying the channel. |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/crypto/commitment/keyDerivation.ts:12](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/commitment/keyDerivation.ts#L12)

___

### derivePRGParameters

▸ **derivePRGParameters**(`secret`): [`PRGParameters`](modules.md#prgparameters)

Derive the seed for the pseudo-randomness generator
by using the secret shared derived from the mixnet packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |

#### Returns

[`PRGParameters`](modules.md#prgparameters)

the PRG seed

#### Defined in

[utils/src/crypto/packet/keyDerivation.ts:40](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyDerivation.ts#L40)

___

### derivePRPParameters

▸ **derivePRPParameters**(`secret`): [`PRPParameters`](modules.md#prpparameters)

Derive the seed for the pseudo-random permutation
by using the secret shared with the creator of the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |

#### Returns

[`PRPParameters`](modules.md#prpparameters)

#### Defined in

[utils/src/crypto/packet/keyDerivation.ts:65](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyDerivation.ts#L65)

___

### derivePacketTag

▸ **derivePacketTag**(`secret`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/crypto/packet/keyDerivation.ts:84](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyDerivation.ts#L84)

___

### deserializeKeyPair

▸ **deserializeKeyPair**(`serialized`, `password`, `useWeakCrypto?`): `Promise`<`DeserializationResponse`\>

Deserializes an encoded key pair

**`Dev`**

This method uses a computation and memory intensive hash function,
     for testing set `useWeakCrypto = true`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `serialized` | `Uint8Array` | `undefined` | encoded key pair |
| `password` | `string` | `undefined` | password to use for decryption |
| `useWeakCrypto` | `boolean` | `false` | [optional] use faster but weaker crypto to reconstruct key pair |

#### Returns

`Promise`<`DeserializationResponse`\>

reconstructed key pair

#### Defined in

[utils/src/crypto/keyPair.ts:76](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/keyPair.ts#L76)

___

### dial

▸ **dial**(`components`, `destination`, `protocols`, `withDHT?`, `noRelay?`): `Promise`<[`DialResponse`](modules.md#dialresponse)\>

Runs through the dial strategy and handles possible errors

1. Use already known addresses
2. Check the DHT (if available) for additional addresses
3. Try new addresses

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `components` | `Components` | `undefined` | components of libp2p instance |
| `destination` | `PeerId` \| `Multiaddr` | `undefined` | which peer to connect to |
| `protocols` | `string` \| `string`[] | `undefined` | which protocol to use |
| `withDHT` | `boolean` | `true` | - |
| `noRelay` | `boolean` | `false` | - |

#### Returns

`Promise`<[`DialResponse`](modules.md#dialresponse)\>

#### Defined in

[utils/src/libp2p/dialHelper.ts:432](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/dialHelper.ts#L432)

___

### expandVars

▸ **expandVars**(`input`, `vars`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | a string containing templated references to environment variables e.g. 'foo ${bar}' |
| `vars` | `Object` | a key-value vars storage object, e.g. { 'bar': 'bar_value' } |

#### Returns

`string`

a string with variables resolved to the actual values

#### Defined in

[utils/src/utils.ts:19](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/utils.ts#L19)

___

### forwardTransform

▸ **forwardTransform**(`privKey`, `packet`, `additionalDataRelayerLength`, `additionalDataLastHopLength`, `maxHops`): `LastNodeOutput` \| `RelayNodeOutput`

Applies the transformation to the header to forward
it to the next node or deliver it to the user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `PeerId` | private key of the relayer |
| `packet` | `Uint8Array` | incoming packet as u8a |
| `additionalDataRelayerLength` | `number` | length of the additional data next the routing information of each hop |
| `additionalDataLastHopLength` | `number` | lenght of the additional data for the last hop |
| `maxHops` | `number` | maximal amount of hops |

#### Returns

`LastNodeOutput` \| `RelayNodeOutput`

whether the packet is valid, if yes returns
the transformed packet, the public key of the next hop
and the data next to the routing information. If current
hop is the final recipient, it returns the plaintext

#### Defined in

[utils/src/crypto/packet/index.ts:132](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L132)

___

### gather\_all\_metrics

▸ **gather_all_metrics**(): `string`

#### Returns

`string`

#### Defined in

utils/lib/utils_metrics.d.ts:17

___

### gcd

▸ **gcd**(`a`, `b`): `number`

Computes the greatest common divisor of two integers

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `number` | first number |
| `b` | `number` | second number |

#### Returns

`number`

#### Defined in

[utils/src/math/gcd.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/math/gcd.ts#L6)

___

### generateChannelId

▸ **generateChannelId**(`source`, `destination`): [`Hash`](classes/Hash.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Address`](classes/Address.md) |
| `destination` | [`Address`](classes/Address.md) |

#### Returns

[`Hash`](classes/Hash.md)

#### Defined in

[utils/src/types/channelEntry.ts:12](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/types/channelEntry.ts#L12)

___

### generateKeyShares

▸ **generateKeyShares**(`path`): `Object`

Performs an offline Diffie-Hellman key exchange with
the nodes along the given path

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `PeerId`[] | the path to use for the mixnet packet |

#### Returns

`Object`

the first group element and the shared secrets
with the nodes along the path

| Name | Type |
| :------ | :------ |
| `alpha` | `Uint8Array` |
| `secrets` | `Uint8Array`[] |

#### Defined in

[utils/src/crypto/packet/keyShares.ts:17](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyShares.ts#L17)

___

### getB58String

▸ **getB58String**(`content`): `string`

Returns the b58String within a given content. Returns empty string if none is found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | arbitrary content with maybe a b58string |

#### Returns

`string`

#### Defined in

[utils/src/libp2p/index.ts:74](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L74)

___

### getBackoffRetries

▸ **getBackoffRetries**(`minDelay`, `maxDelay`, `delayMultiple`): `number`

Returns the maximal number of retries after which the `retryWithBackoff` throws

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minDelay` | `number` | initial delay |
| `maxDelay` | `number` | maximal delay to retry |
| `delayMultiple` | `number` | factor by which last delay got multiplied |

#### Returns

`number`

#### Defined in

[utils/src/async/backoff.ts:26](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L26)

___

### getBackoffRetryTimeout

▸ **getBackoffRetryTimeout**(`minDelay`, `maxDelay`, `delayMultiple`): `number`

Returns the *total* amount of time between calling `retryWithBackThenThrow` and
once it throws because it ran out of retries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minDelay` | `number` | initial delay |
| `maxDelay` | `number` | maximal delay to retry |
| `delayMultiple` | `number` | factor by which last delay got multiplied |

#### Returns

`number`

#### Defined in

[utils/src/async/backoff.ts:48](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L48)

___

### getHeaderLength

▸ **getHeaderLength**(`maxHops`, `additionalDataRelayerLength`, `additionalDataLastHopLength`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxHops` | `number` |
| `additionalDataRelayerLength` | `number` |
| `additionalDataLastHopLength` | `number` |

#### Returns

`number`

#### Defined in

[utils/src/crypto/packet/index.ts:32](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L32)

___

### getLocalAddresses

▸ **getLocalAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/addrs.ts:295](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L295)

___

### getLocalHosts

▸ **getLocalHosts**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/addrs.ts:306](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L306)

___

### getMetricsCollectors

▸ **getMetricsCollectors**(): [`MetricCollector`](modules.md#metriccollector)[]

#### Returns

[`MetricCollector`](modules.md#metriccollector)[]

#### Defined in

[utils/src/index.ts:51](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/index.ts#L51)

___

### getNetworkPrefix

▸ **getNetworkPrefix**(`address`, `subnet`, `family`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Uint8Array` |
| `subnet` | `Uint8Array` |
| `family` | ``"IPv4"`` \| ``"IPv6"`` |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/network/addrs.ts:220](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L220)

___

### getPacketLength

▸ **getPacketLength**(`maxHops`, `additionalDataRelayerLength`, `additionalDataLastHopLength`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxHops` | `number` |
| `additionalDataRelayerLength` | `number` |
| `additionalDataLastHopLength` | `number` |

#### Returns

`number`

#### Defined in

[utils/src/crypto/packet/index.ts:43](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/index.ts#L43)

___

### getPrivateAddresses

▸ **getPrivateAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/addrs.ts:292](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L292)

___

### getPublicAddresses

▸ **getPublicAddresses**(`_iface?`): [`Network`](modules.md#network)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `_iface?` | `string` |

#### Returns

[`Network`](modules.md#network)[]

#### Defined in

[utils/src/network/addrs.ts:299](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L299)

___

### get\_package\_version

▸ **get_package_version**(`package_file`): `string`

Reads the given package.json file and determines its version.

#### Parameters

| Name | Type |
| :------ | :------ |
| `package_file` | `string` |

#### Returns

`string`

#### Defined in

utils/lib/utils_misc.d.ts:8

___

### hasB58String

▸ **hasB58String**(`content`): `Boolean`

Returns true or false if given string does not contain a b58string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | arbitrary content with maybe a b58string |

#### Returns

`Boolean`

#### Defined in

[utils/src/libp2p/index.ts:57](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L57)

___

### inSameNetwork

▸ **inSameNetwork**(`address`, `networkPrefix`, `subnetMask`, `family`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Uint8Array` |
| `networkPrefix` | `Uint8Array` |
| `subnetMask` | `Uint8Array` |
| `family` | ``"IPv4"`` \| ``"IPv6"`` |

#### Returns

`boolean`

#### Defined in

[utils/src/network/addrs.ts:233](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L233)

___

### ipToU8aAddress

▸ **ipToU8aAddress**(`address`, `family`): `Uint8Array`

Converts ip address string to Uint8Arrays

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | ip address as string, e.g. 192.168.12.34 |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`Uint8Array`

Byte representation of the given ip address

#### Defined in

[utils/src/network/addrs.ts:119](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L119)

___

### isAddressWithPeerId

▸ **isAddressWithPeerId**(`ma`): `boolean`

Checks known direct and circuit addresses if they end with `/p2p/<PEER_ID>`

If not a known address, use generic but expensive Multiaddr function

Used to filter addresses that get stored into libp2p's peer-store

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ma` | `Multiaddr` | Multiaddr to check |

#### Returns

`boolean`

#### Defined in

[utils/src/network/addrs.ts:329](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L329)

___

### isAnyAddress

▸ **isAnyAddress**(`address`, `family`): `boolean`

Checks if given address is any address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

#### Defined in

[utils/src/network/addrs.ts:27](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L27)

___

### isAvadoPrivateNetwork

▸ **isAvadoPrivateNetwork**(`address`, `family`): `boolean`

Checks if given address is in internally network of
Dappnode or AVADO based nodes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `Uint8Array` |
| `family` | ``"IPv4"`` \| ``"IPv6"`` |

#### Returns

`boolean`

#### Defined in

[utils/src/network/addrs.ts:65](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L65)

___

### isErrorOutOfFunds

▸ **isErrorOutOfFunds**(`error`): ``"NATIVE"`` \| ``"HOPR"`` \| ``false``

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

``"NATIVE"`` \| ``"HOPR"`` \| ``false``

#### Defined in

[utils/src/ethereum/index.ts:17](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L17)

___

### isErrorOutOfHoprFunds

▸ **isErrorOutOfHoprFunds**(`error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/src/ethereum/index.ts:11](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L11)

___

### isErrorOutOfNativeFunds

▸ **isErrorOutOfNativeFunds**(`error`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `any` |

#### Returns

`boolean`

#### Defined in

[utils/src/ethereum/index.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/ethereum/index.ts#L6)

___

### isExpired

▸ **isExpired**(`value`, `now`, `ttl`): `boolean`

Compares timestamps to find out if "value" has expired.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | timestamp to compare with |
| `now` | `number` | timestamp example: `new Date().getTime()` |
| `ttl` | `number` | in milliseconds |

#### Returns

`boolean`

true if it's expired

#### Defined in

[utils/src/time.ts:23](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/time.ts#L23)

___

### isLinkLocaleAddress

▸ **isLinkLocaleAddress**(`address`, `family`): `boolean`

Checks if given address is link-locale address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if is link-locale address

#### Defined in

[utils/src/network/addrs.ts:75](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L75)

___

### isLocalhost

▸ **isLocalhost**(`address`, `family`): `boolean`

Checks if given address is a loopback address (localhost)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if localhost

#### Defined in

[utils/src/network/addrs.ts:44](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L44)

___

### isMultiaddrLocal

▸ **isMultiaddrLocal**(`multiaddr`): `boolean`

Checks if given Multiaddr encodes a private address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multiaddr` | `Multiaddr` | multiaddr to check |

#### Returns

`boolean`

true if address is a private ip address

#### Defined in

[utils/src/libp2p/addressSorters.ts:15](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/addressSorters.ts#L15)

___

### isPrivateAddress

▸ **isPrivateAddress**(`address`, `family`): `boolean`

Checks if given address is a private address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if private address

#### Defined in

[utils/src/network/addrs.ts:54](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L54)

___

### isReservedAddress

▸ **isReservedAddress**(`address`, `family`): `boolean`

Checks if given address is a reserved address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip address to check |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`boolean`

true if address is a reserved address

#### Defined in

[utils/src/network/addrs.ts:85](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L85)

___

### isSecp256k1PeerId

▸ **isSecp256k1PeerId**(`peer`): `boolean`

Check if PeerId contains a secp256k1 privKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peer` | `PeerId` | PeerId to check |

#### Returns

`boolean`

whether embedded privKey is a secp256k1 key

#### Defined in

[utils/src/libp2p/index.ts:90](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L90)

___

### iterableToArray

▸ **iterableToArray**<`T`\>(`iter`): `Promise`<`T`[]\>

Convert an async iterator to an array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iter` | `AsyncIterable`<`T`\> | generator |

#### Returns

`Promise`<`T`[]\>

array of promises

#### Defined in

[utils/src/utils.ts:61](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/utils.ts#L61)

___

### iterateHash

▸ **iterateHash**(`seed`, `hashFunc`, `iterations`, `stepSize`, `hint?`): `Promise`<{ `hash`: `Uint8Array` ; `intermediates`: [`Intermediate`](interfaces/Intermediate.md)[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `seed` | `Uint8Array` |
| `hashFunc` | (`preImage`: `Uint8Array`) => `Uint8Array` |
| `iterations` | `number` |
| `stepSize` | `number` |
| `hint?` | (`index`: `number`) => `Uint8Array` \| `Promise`<`Uint8Array`\> |

#### Returns

`Promise`<{ `hash`: `Uint8Array` ; `intermediates`: [`Intermediate`](interfaces/Intermediate.md)[]  }\>

#### Defined in

[utils/src/crypto/hashIterator.ts:7](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/hashIterator.ts#L7)

___

### keyShareTransform

▸ **keyShareTransform**(`alpha`, `peerId`): `Object`

Applies the forward transformation of the key shares to
an incoming packet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alpha` | `Uint8Array` | the group element used for the offline Diffie-Hellman key exchange (compressed EC point) |
| `peerId` | `PeerId` | id of the relayer |

#### Returns

`Object`

Next public key (compressed EC point) and derived secret

| Name | Type |
| :------ | :------ |
| `alpha` | `Uint8Array` |
| `secret` | `Uint8Array` |

#### Defined in

[utils/src/crypto/packet/keyShares.ts:77](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/packet/keyShares.ts#L77)

___

### libp2pSendMessage

▸ **libp2pSendMessage**<`T`\>(`components`, `destination`, `protocols`, `message`, `includeReply`, `opts?`): `Promise`<`T` extends ``true`` ? `Uint8Array`[] : `void`\>

Asks libp2p to establish a connection to another node and
send message. If `includeReply` is set, wait for a response

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `Components` | libp2p components |
| `destination` | `PeerId` | peer to connect to |
| `protocols` | `string` \| `string`[] | protocols to speak |
| `message` | `Uint8Array` | message to send |
| `includeReply` | `T` | try to receive a reply |
| `opts` | `Object` | [optional] timeout |
| `opts.timeout?` | `number` | - |

#### Returns

`Promise`<`T` extends ``true`` ? `Uint8Array`[] : `void`\>

#### Defined in

[utils/src/libp2p/index.ts:108](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L108)

___

### libp2pSubscribe

▸ **libp2pSubscribe**<`T`\>(`components`, `protocols`, `handler`, `errHandler`, `includeReply`): `Promise`<`void`\>

Generates a handler that pulls messages out of a stream
and feeds them to the given handler.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `Components` | libp2p components |
| `protocols` | `string` \| `string`[] | protocol to dial |
| `handler` | [`LibP2PHandlerFunction`](modules.md#libp2phandlerfunction)<`T` extends ``true`` ? `Promise`<`Uint8Array`\> : `void` \| `Promise`<`void`\>\> | called once another node requests that protocol |
| `errHandler` | `ErrHandler` | handle stream pipeline errors |
| `includeReply` | `T` | try to receive a reply |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/src/libp2p/index.ts:239](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/index.ts#L239)

___

### loadJson

▸ **loadJson**(`file_path`): `any`

loads JSON data from file

**`Throws`**

if unable to open the file the JSON data is malformed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file_path` | `string` | json file to load |

#### Returns

`any`

object parsed from JSON data

#### Defined in

[utils/src/utils.ts:34](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/utils.ts#L34)

___

### merge\_encoded\_metrics

▸ **merge_encoded_metrics**(`metrics1`, `metrics2`): `string`

A naive merging method for two serialized metric registries.
It performs union of the sets, removing those metrics which have the same name and type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `metrics1` | `string` |
| `metrics2` | `string` |

#### Returns

`string`

#### Defined in

utils/lib/utils_metrics.d.ts:10

___

### moveDecimalPoint

▸ **moveDecimalPoint**(`amount`, `position`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` \| `number` \| `BigNumber` |
| `position` | `number` |

#### Returns

`string`

#### Defined in

[utils/src/math/moveDecimalPoint.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/math/moveDecimalPoint.ts#L3)

___

### nAtATime

▸ **nAtATime**<`ArgType`, `Return`, `Args`\>(`fn`, `args`, `concurrency`, `done?`): `Promise`<(`Return` \| `Error`)[]\>

Runs the same worker function with multiple arguments but does not run more
than a given number of workers concurrently.

**`Dev`**

Iterative implementation of the functionality

**`Example`**

```ts
import { setTimeout } from 'timers/promises'

const result = await nAtaTime(setTimeout, [[300, 'one'], [200, 'two'], [100, 'three']], 2)
// => ['two', 'one', 'three']
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ArgType` | `ArgType` |
| `Return` | `Return` |
| `Args` | extends `ArgType`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (...`args`: `Args`) => `Promise`<`Return`\> | worker function |
| `args` | `Iterable`<`Args`\> | arguments passed to worker function |
| `concurrency` | `number` | number of parallel jobs |
| `done?` | (`results`: (`Error` \| `Return`)[]) => `boolean` | - |

#### Returns

`Promise`<(`Return` \| `Error`)[]\>

an array containing the results

#### Defined in

[utils/src/async/parallel.ts:37](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/parallel.ts#L37)

___

### oneAtATime

▸ **oneAtATime**<`ReturnType`\>(): (`fn`: () => `Promise`<`ReturnType`\>) => `void`

Creates a limiter that takes functions and runs them subsequently
with no concurrency.

**`Example`**

```ts
let limiter = oneAtATime()
limiter(() => Promise.resolve('1'))
limiter(() => Promise.resolve('2'))
```

#### Type parameters

| Name |
| :------ |
| `ReturnType` |

#### Returns

`fn`

a limiter that takes additional functions

▸ (`fn`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `Promise`<`ReturnType`\> |

##### Returns

`void`

#### Defined in

[utils/src/async/concurrency.ts:14](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/concurrency.ts#L14)

___

### ordered

▸ **ordered**<`T`\>(): `Object`

Creates a queue that consumes items asynchronously and potentially
unorders but outputs them ordered using an asynchronous iterator.
Each element consists of a value and an index upon which
elements are ordered.

**`Example`**

```ts
import { ordered, wait } from '@hoprnet/hopr-utils'

const order = ordered<number>()

(async function () {
  order.push({ index: 0, value: 'first' })
  wait(50)
  order.push({ index: 2, value: 'second' })
  wait(50)
  order.push({ index: 1, value: 'third' })
  wait(50)
  order.end()
})()

const result: string[] = []
for await (const item of order.iterator()) {
  result.push(item.value)
}
// result == ['first', 'third', 'second']
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`Object`

an ordered stream

| Name | Type |
| :------ | :------ |
| `end` | () => `void` |
| `iterator` | () => `AsyncGenerator`<`Item`<`T`\>, `void`, `unknown`\> |
| `push` | (`newItem`: `Item`<`T`\>) => `void` |

#### Defined in

[utils/src/async/ordering.ts:35](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/ordering.ts#L35)

___

### parseHosts

▸ **parseHosts**(): [`Hosts`](modules.md#hosts)

#### Returns

[`Hosts`](modules.md#hosts)

#### Defined in

[utils/src/network/hosts.ts:11](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/hosts.ts#L11)

___

### parseJSON

▸ **parseJSON**(`str`): `object`

Parse JSON while recovering all Buffer elements

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | JSON string |

#### Returns

`object`

#### Defined in

[utils/src/parseJSON.ts:5](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/parseJSON.ts#L5)

___

### pickVersion

▸ **pickVersion**(`full_version`): `string`

Used by our network stack and deployment scripts to determine.

#### Parameters

| Name | Type |
| :------ | :------ |
| `full_version` | `string` |

#### Returns

`string`

major and minor versions, ex: `1.8.5` -> `1.8.0`

#### Defined in

[utils/src/libp2p/pickVersion.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/pickVersion.ts#L6)

___

### preVerify

▸ **preVerify**(`secret`, `porBytes`, `challenge`): `ValidOutput` \| `InvalidOutput`

Verifies that an incoming packet contains all values that
are necessary to reconstruct the response to redeem the
incentive for relaying the packet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secret` | `Uint8Array` | shared secret with the creator of the packet |
| `porBytes` | `Uint8Array` | PoR bitstring as included within the packet |
| `challenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) | ticket challenge of the incoming ticket |

#### Returns

`ValidOutput` \| `InvalidOutput`

whether the challenge is derivable, if yes, it returns
the keyShare of the relayer as well as the secret that is used
to create it and the challenge for the next relayer.

#### Defined in

[utils/src/crypto/por/index.ts:82](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L82)

___

### prefixLength

▸ **prefixLength**(`prefix`): `number`

Returns the prefix length of a network prefix

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `Uint8Array` | network prefix, e.g. `new Uint8Array([255,255,255,0])` |

#### Returns

`number`

the prefix length, e.g. 24

#### Defined in

[utils/src/network/addrs.ts:168](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L168)

___

### privKeyToPeerId

▸ **privKeyToPeerId**(`privKey`): `PeerId`

Converts a plain compressed ECDSA private key over the curve `secp256k1`
to a peerId in order to use it with libp2p.
It equips the generated peerId with private key and public key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privKey` | `string` \| `Uint8Array` | the plain private key |

#### Returns

`PeerId`

#### Defined in

[utils/src/libp2p/privKeyToPeerId.ts:20](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/privKeyToPeerId.ts#L20)

___

### pubKeyToPeerId

▸ **pubKeyToPeerId**(`pubKey`): `PeerId`

Converts a plain compressed ECDSA public key over the curve `secp256k1`
to a peerId in order to use it with libp2p.

**`Notice`**

Libp2p stores the keys in format that is derived from `protobuf`.
Using `libsecp256k1` directly does not work.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pubKey` | `string` \| `Uint8Array` | the plain public key |

#### Returns

`PeerId`

#### Defined in

[utils/src/libp2p/pubKeyToPeerId.ts:18](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/pubKeyToPeerId.ts#L18)

___

### randomBigInteger

▸ **randomBigInteger**(`start`, `end?`): `bigint`

same as randomInteger, but for BigInts

#### Parameters

| Name | Type |
| :------ | :------ |
| `start` | `bigint` |
| `end?` | `bigint` |

#### Returns

`bigint`

#### Defined in

[utils/src/crypto/randomInteger.ts:181](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L181)

___

### randomChoice

▸ **randomChoice**<`T`\>(`collection`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `T`[] |

#### Returns

`T`

#### Defined in

[utils/src/crypto/randomInteger.ts:194](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L194)

___

### randomFloat

▸ **randomFloat**(): `number`

#### Returns

`number`

#### Defined in

[utils/src/crypto/randomFloat.ts:3](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomFloat.ts#L3)

___

### randomInteger

▸ **randomInteger**(`start`, `end?`): `number`

Returns a random value between `start` and `end`.

**`Example`**

```
randomInteger(3) // result in { 0, 1, 2}
randomInteger(0, 3) // result in { 0, 1, 2 }
randomInteger(7, 9) // result in { 7, 8 }
```
The maximum number generated by this function is MAX_RANDOM_INTEGER.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | start of the interval (inclusive). Must be non-negative. |
| `end?` | `number` | end of the interval (not inclusive). Must not exceed MAX_RANDOM_INTEGER. |

#### Returns

`number`

random number between

#### Defined in

[utils/src/crypto/randomInteger.ts:159](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/randomInteger.ts#L159)

___

### randomPermutation

▸ **randomPermutation**<`T`\>(`array`): `T`[]

Return a random permutation of the given `array`
by using the (optimized) Fisher-Yates shuffling algorithm.

**`Example`**

```javascript
randomPermutation([1,2,3,4]);
// first run: [2,4,1,2]
// second run: [3,1,2,4]
// ...
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | the array to permutate |

#### Returns

`T`[]

#### Defined in

[utils/src/collection/randomPermutation.ts:18](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/collection/randomPermutation.ts#L18)

___

### randomSubset

▸ **randomSubset**<`T`\>(`array`, `subsetSize`, `filter?`): `T`[]

Picks

**`Notice`**

If less than

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `T`[] | . The order of the picked elements does not coincide with their order in |
| `subsetSize` | `number` | elements at random from |
| `filter?` | (`candidate`: `T`) => `boolean` | called with `(peerInfo)` and should return `true` for every node that should be in the subset |

#### Returns

`T`[]

array with at most

#### Defined in

[utils/src/collection/randomSubset.ts:20](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/collection/randomSubset.ts#L20)

___

### recoverIteratedHash

▸ **recoverIteratedHash**(`hashValue`, `hashFunc`, `hint`, `maxIterations`, `stepSize?`, `indexHint?`): `Promise`<[`Intermediate`](interfaces/Intermediate.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hashValue` | `Uint8Array` |
| `hashFunc` | (`preImage`: `Uint8Array`) => `Uint8Array` |
| `hint` | (`index`: `number`) => `Promise`<`Uint8Array`\> |
| `maxIterations` | `number` |
| `stepSize?` | `number` |
| `indexHint?` | `number` |

#### Returns

`Promise`<[`Intermediate`](interfaces/Intermediate.md) \| `undefined`\>

#### Defined in

[utils/src/crypto/hashIterator.ts:55](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/hashIterator.ts#L55)

___

### registerMetricsCollector

▸ **registerMetricsCollector**(`collector`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collector` | [`MetricCollector`](modules.md#metriccollector) |

#### Returns

`void`

#### Defined in

[utils/src/index.ts:54](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/index.ts#L54)

___

### retimer

▸ **retimer**(`fn`, `newTimeout`): () => `void`

Repeatedly apply a function after a timeout

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | () => `void` \| `Promise`<`void`\> | function to apply after every timeout |
| `newTimeout` | () => `number` | function that returns the new timeout |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[utils/src/process/retimer.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/process/retimer.ts#L6)

___

### retryWithBackoffThenThrow

▸ **retryWithBackoffThenThrow**<`T`\>(`fn`, `options?`): `Promise`<`T`\>

A general-use exponential backoff that will throw once
iteratively increased timeout reaches MAX_DELAY.

**`Dev`**

this function THROWS if retries were not successful

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | () => `Promise`<`T`\> | `undefined` | asynchronous function to run on every tick |
| `options` | `Object` | `DEFAULT_BACKOFF_PARAMETERS` | - |
| `options.delayMultiple?` | `number` | `undefined` | multiplier to apply to increase running delay |
| `options.maxDelay?` | `number` | `undefined` | maximum delay, we reject once we reach this |
| `options.minDelay?` | `number` | `undefined` | minimum delay, we start with this |

#### Returns

`Promise`<`T`\>

#### Defined in

[utils/src/async/backoff.ts:83](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L83)

___

### sampleGroupElement

▸ **sampleGroupElement**(`compressed?`): [exponent: Uint8Array, groupElement: Uint8Array]

Samples a valid exponent and returns the exponent
and the product of exponent and base-point.

**`Dev`**

can be used to derive a secp256k1 keypair

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `compressed` | `boolean` | `false` |

#### Returns

[exponent: Uint8Array, groupElement: Uint8Array]

[ exponent, groupElement]

#### Defined in

[utils/src/crypto/sampleGroupElement.ts:11](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/sampleGroupElement.ts#L11)

___

### serializeKeyPair

▸ **serializeKeyPair**(`peerId`, `password`, `useWeakCrypto?`, `__iv?`, `__salt?`, `__uuidSalt?`): `Promise`<`Uint8Array`\>

Serializes a peerId using geth's KeyStore format
see https://medium.com/@julien.maffre/what-is-an-ethereum-keystore-file-86c8c5917b97

**`Dev`**

This method uses a computation and memory intensive hash function,
     for testing set `useWeakCrypto = true`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `peerId` | `PeerId` | `undefined` | id to store |
| `password` | `string` | `undefined` | password used for encryption |
| `useWeakCrypto` | `boolean` | `false` | [optional] weak parameter for fast serialization |
| `__iv?` | `string` | `undefined` | - |
| `__salt?` | `string` | `undefined` | - |
| `__uuidSalt?` | `string` | `undefined` | - |

#### Returns

`Promise`<`Uint8Array`\>

Uint8Array representation

#### Defined in

[utils/src/crypto/keyPair.ts:19](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/keyPair.ts#L19)

___

### serializeToU8a

▸ **serializeToU8a**(`items`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | [`U8aAndSize`](modules.md#u8aandsize)[] |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/index.ts:19](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L19)

___

### setupPromiseRejectionFilter

▸ **setupPromiseRejectionFilter**(): `void`

Sets a custom promise rejection handler to filter out known promise rejections
that are harmless but couldn't be handled for some reason.

#### Returns

`void`

#### Defined in

[utils/src/process/promiseRejectionFilter.ts:13](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/process/promiseRejectionFilter.ts#L13)

___

### startResourceUsageLogger

▸ **startResourceUsageLogger**(`log`, `ms?`): () => `void`

Creates a resource logger and provides a function to stop it.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `log` | `LogType` | `undefined` | logs resource stat strings |
| `ms` | `number` | `60_000` | interval to redo the measurement |

#### Returns

`fn`

a function that stop the resource logger

▸ (): `void`

##### Returns

`void`

#### Defined in

[utils/src/process/resourceLogger.ts:26](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/process/resourceLogger.ts#L26)

___

### stringToU8a

▸ **stringToU8a**(`str`, `length?`): `Uint8Array`

Converts a **HEX** string to a Uint8Array and optionally adds some padding to match
the desired size.

**`Example`**

```ts
stringToU8a('0xDEadBeeF') // Uint8Array [ 222, 173, 190, 239 ]
```

**`Notice`**

Throws an error in case a length was provided and the result does not fit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | string to convert |
| `length?` | `number` | desired length of the Uint8Array |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/toU8a.ts:105](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/toU8a.ts#L105)

___

### timeout

▸ **timeout**<`T`\>(`ms`, `work`): `Promise`<`T`\>

Races a timeout against some work

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | return after timeout in ms |
| `work` | () => `Promise`<`T`\> | function that returns a Promise that resolves once the work is done |

#### Returns

`Promise`<`T`\>

a Promise that resolves once the timeout is due or the work is done

#### Defined in

[utils/src/async/timeout.ts:10](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/timeout.ts#L10)

___

### timer

▸ **timer**(`fn`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`number`

#### Defined in

[utils/src/utils.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/utils.ts#L6)

___

### toNetworkPrefix

▸ **toNetworkPrefix**(`addr`): [`Network`](modules.md#network)

#### Parameters

| Name | Type |
| :------ | :------ |
| `addr` | `NetworkInterfaceInfo` |

#### Returns

[`Network`](modules.md#network)

#### Defined in

[utils/src/network/addrs.ts:266](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L266)

___

### toU8a

▸ **toU8a**(`arg`, `length?`): `Uint8Array`

Converts a number to a Uint8Array and optionally adds some padding to match
the desired size.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `number` | to convert to Uint8Array |
| `length?` | `number` | desired length of the Uint8Array |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/toU8a.ts:7](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/toU8a.ts#L7)

___

### tryExistingConnections

▸ **tryExistingConnections**(`components`, `destination`, `protocols`): `Promise`<`undefined` \| `ProtocolStream` & { `conn`: `Connection`  }\>

Tries to use existing connection to connect to the given peer.
Closes all connection that could not be used to speak the desired
protocols.

**`Dev`**

if used with unsupported protocol, this function might close
connections unintendedly

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `components` | `Components` | libp2p components |
| `destination` | `PeerId` | peer to connect to |
| `protocols` | `string` \| `string`[] | desired protocol |

#### Returns

`Promise`<`undefined` \| `ProtocolStream` & { `conn`: `Connection`  }\>

#### Defined in

[utils/src/libp2p/dialHelper.ts:99](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/dialHelper.ts#L99)

___

### u8aAdd

▸ **u8aAdd**(`inplace`, `a`, `b`): `Uint8Array`

Adds the contents of two arrays together while ignoring the final overflow.
Computes `a + b % ( 2 ** (8 * a.length) - 1)`

**`Example`**

```ts
u8aAdd(false, new Uint8Array([1], new Uint8Array([2])) // Uint8Array([3])
u8aAdd(false, new Uint8Array([1], new Uint8Array([255])) // Uint8Array([0])
u8aAdd(false, new Uint8Array([0, 1], new Uint8Array([0, 255])) // Uint8Array([1, 0])
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inplace` | `boolean` | result is stored in a if set to true |
| `a` | `Uint8Array` | first array |
| `b` | `Uint8Array` | second array |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/u8aAdd.ts:13](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aAdd.ts#L13)

___

### u8aAddrToString

▸ **u8aAddrToString**(`address`, `family`): `string`

Converts ip address from byte representation to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | ip addr given as Uint8Array |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | ip address family, 'IPv4' or 'IPv6' |

#### Returns

`string`

#### Defined in

[utils/src/network/addrs.ts:201](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L201)

___

### u8aAddressToCIDR

▸ **u8aAddressToCIDR**(`prefix`, `subnet`, `family`): `string`

Takes a network prefix, a subnet and a IP address family and
returns a CIDR string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix` | `Uint8Array` | network prefix, e.g. `new Uint8Array([10,0,0,0]) @param subnet subnet, e.g. `new Uint8Array([255,255,255,0]) |
| `subnet` | `Uint8Array` | - |
| `family` | ``"IPv4"`` \| ``"IPv6"`` | IP address family, `IPv4` or `IPv6` |

#### Returns

`string`

a CIDR string, such as `192.168.1.0/24`

#### Defined in

[utils/src/network/addrs.ts:191](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/network/addrs.ts#L191)

___

### u8aCompare

▸ **u8aCompare**(`a`, `b`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `Uint8Array` |
| `b` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[utils/src/u8a/u8aCompare.ts:5](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aCompare.ts#L5)

___

### u8aConcat

▸ **u8aConcat**(`...list`): `Uint8Array`

Concatenates the input arrays into a single `UInt8Array`.

**`Example`**

```ts
u8aConcat(
  new Uint8Array([1, 1, 1]),
  new Uint8Array([2, 2, 2])
); // Uint8Arrau([1, 1, 1, 2, 2, 2])
 * u8aConcat(
  new Uint8Array([1, 1, 1]),
  undefined
  new Uint8Array([2, 2, 2])
); // Uint8Arrau([1, 1, 1, 2, 2, 2])
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `...list` | `Uint8Array`[] |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/concat.ts:15](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/concat.ts#L15)

___

### u8aEquals

▸ **u8aEquals**(`...arrays`): `boolean`

Checks if the contents of the given Uint8Arrays are equal. Returns once at least
one different entry is found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...arrays` | `Uint8Array`[] | additional arrays |

#### Returns

`boolean`

#### Defined in

[utils/src/u8a/equals.ts:6](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/equals.ts#L6)

___

### u8aSplit

▸ **u8aSplit**(`u8a`, `sizes`): `Uint8Array`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `u8a` | `Uint8Array` |
| `sizes` | `number`[] |

#### Returns

`Uint8Array`[]

#### Defined in

[utils/src/u8a/index.ts:33](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/index.ts#L33)

___

### u8aToHex

▸ **u8aToHex**(`arr?`, `prefixed?`): `string`

Converts a Uint8Array to a hex string.

**`Notice`**

Mainly used for debugging.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `arr?` | `Uint8Array` | `undefined` | Uint8Array |
| `prefixed` | `boolean` | `true` | if `true` add a `0x` in the beginning |

#### Returns

`string`

#### Defined in

[utils/src/u8a/toHex.ts:8](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/toHex.ts#L8)

___

### u8aToNumber

▸ **u8aToNumber**(`arr`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `Uint8Array` |

#### Returns

`number`

#### Defined in

[utils/src/u8a/u8aToNumber.ts:41](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aToNumber.ts#L41)

___

### u8aToNumberOrBigInt

▸ **u8aToNumberOrBigInt**(`arr`): `number` \| `bigint`

Converts a Uint8Array to number.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `Uint8Array` | Uint8Array to convert to number |

#### Returns

`number` \| `bigint`

#### Defined in

[utils/src/u8a/u8aToNumber.ts:5](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/u8aToNumber.ts#L5)

___

### u8aXOR

▸ **u8aXOR**(`inPlace?`, `...list`): `Uint8Array`

Apply an XOR on a list of arrays.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `inPlace` | `boolean` | `false` | if `true` overwrite first Array with result |
| `...list` | `Uint8Array`[] | `undefined` | arrays to XOR |

#### Returns

`Uint8Array`

#### Defined in

[utils/src/u8a/xor.ts:7](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/u8a/xor.ts#L7)

___

### validateData

▸ **validateData**(`data`, `schema`): `void`

validates JSON data against JSON schema
prints errors to the console and throws in case of non-conforming

**`Throws`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | parsed JSON data |
| `schema` | `any` | parsed JSON schema for the data |

#### Returns

`void`

#### Defined in

[utils/src/utils.ts:46](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/utils.ts#L46)

___

### validatePoRHalfKeys

▸ **validatePoRHalfKeys**(`ethereumChallenge`, `ownKey`, `ack`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `ownKey` | [`HalfKey`](classes/HalfKey.md) |
| `ack` | [`HalfKey`](classes/HalfKey.md) |

#### Returns

`boolean`

#### Defined in

[utils/src/crypto/por/index.ts:127](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L127)

___

### validatePoRHint

▸ **validatePoRHint**(`ethereumChallenge`, `ownShare`, `ack`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `ownShare` | [`HalfKeyChallenge`](classes/HalfKeyChallenge.md) |
| `ack` | [`HalfKey`](classes/HalfKey.md) |

#### Returns

`boolean`

#### Defined in

[utils/src/crypto/por/index.ts:138](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L138)

___

### validatePoRResponse

▸ **validatePoRResponse**(`ethereumChallenge`, `response`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ethereumChallenge` | [`EthereumChallenge`](classes/EthereumChallenge.md) |
| `response` | [`Response`](classes/Response.md) |

#### Returns

`boolean`

#### Defined in

[utils/src/crypto/por/index.ts:132](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/crypto/por/index.ts#L132)

___

### verifySignatureFromPeerId

▸ **verifySignatureFromPeerId**(`peerId`, `message`, `signature`): `Promise`<`boolean`\>

Verifies a given signature comes from a specific PeerId, based on the
signature generated and the PeerId id.

**`Notice`**

Currently we assume that the peerId was generated with a sec256k1
key, but no other tests had been done for additional keys (e.g. Curve25519)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `peerId` | `string` | the base58String representation of the PeerId |
| `message` | `string` | the message signed by the given PeerId |
| `signature` | `string` | the generated signature created by the PeerId |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[utils/src/libp2p/verifySignatureFromPeerId.ts:16](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/libp2p/verifySignatureFromPeerId.ts#L16)

___

### wait

▸ **wait**(`milliseconds`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `milliseconds` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/src/async/backoff.ts:15](https://github.com/hoprnet/hoprnet/blob/master/packages/utils/src/async/backoff.ts#L15)
