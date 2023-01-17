## Rationale

This package implements an abstraction over sending individual packets to other nodes, by potentially traversing one or more NATs. The exposed API is kept rather simple.

- `send(destination, data)`
- `on_incoming((data) => void)`
- `get_addresses_to_announce()`
- `add_potential_relay(relay)`

Over which means of transport the data is actually delivered and how that stream has been established is kept hidden.

## Means of transport

This package multiplexes three main means of transport. These are:

| Name          | Protocol used | Purpose                                                              |
| ------------- | ------------- | -------------------------------------------------------------------- |
| Direct        | TCP           | Connect directly to an IP address. Used to contact nodes and relays. |
| Relayed       | TURN-like     | Relay packets over another node that can receive direct TCP packet.  |
| Direct WebRTC | WebRTC        | Sent packets directly to a socket after successful signalling        |

Each connection can run through three stages:

1. Try to contact using TCP and IP address, **if successful done**, otherwise
2. Try to contact a relay using TCP and IP address, if no relay avaiable **end with failure**, otherwise
3. Ask relay to extend connection to destination, if not successful **end with failure**, otherwise

_the connection is now ready to use_

4. Initiate upgrade to direct WebRTC connection, if not successful, **stay with relayed connection**, otherwise
5. switch stream to direct WebRTC connection

_there is a low-latency connection to the node_

## Anatomy of a NATed node

Nodes that live behind a mechanism - such as a router - that dynamically maps one or more clients to the same external IP address are considered _NATed nodes_. The NAT (Network Address Translation) _can_ map an internal port to the very same external port, e.g. a node that runs a web server at port 80 which gets mapped to the very same external port, is accessible to other clients as `external_ip:80`.

In general, internal ports are _not mapped_ to the same external port, namely the aforementioned web server is avaible at a different port, e.g. `external_ip:50729`. In oder to connect to such a node, other clients need _to know_ to _which_ external port the node is mapped. This can be done by guessing, or off-the-band signaling by using a third party.

To not run out of external ports, the NAT _might_ recycle its assigned external ports after some time, so the client needs to verify whether it is still mapped to `external_ip:50729`.

**A NATed node can create outbound connection to other exposed nodes but in general, it cannot receive _inbound_ connections from other nodes - unless a node knows the mapped external port**

## Initialisation sequence

At startup, each nodes binds to a given port, the default port is `9091`. The node for TCP _and_ UDP packets. As of now, TCP is used for P2P data exchange and STUN whereas UDP is exclusively used for STUN. Once listening, the determines all IPv4 addresses plus port under which it is available. In addition, it tries to determine its external IPv4 address using the STUN protocol.

By using recent extensions to the STUN protocol, the node then checks whether other nodes can reach it through UDP _and_ TCP, if not the node will look for relays to connect to.

## Anatomy of a relay node

Relay nodes can receive _inbound_ connections from other nodes and can forward packets to those NAT nodes that have established a direct connection to them. By doing so, they allow NATed nodes to receive _inbound_ packets from other nodes. On the other hand, the relay node becomes a single point of failure for the communication of the NATed node. For that reason, each NATed node establishes connections to _multiple_ relay nodes.

## Relay slots

Each nodes maintains a list of potential relay nodes. Learning about a relay node happens off-the-band and is out of scope. The see if the relay is available and willing to act as a relay, the NATed nodes calls the `can-relay` protocol and the relay replies with `OK`

| Direction     | Message           |
| ------------- | ----------------- |
| Node -> Relay | `/hopr/can-relay` |
| Relay -> Node | `OK`              |

In all other cases, such as if the relay refuses the connection, does not respond to the `can-relay` protocol or answer with anything else than `OK`, the relay is considered to be not available.

At any time the NATed node will try to hold the connection to `MIN_RELAYS_PER_NODE`. This especially includes reconnecting to _other relay nodes_ once the connection to any of the connected relay node gets lost.

## Relay protocol

Each packet is prefixed by their type

- Payload traffic, exposed to the consumer of the API
- WebRTC signalling
- Status messages

## Initialisation of a relayed connection
