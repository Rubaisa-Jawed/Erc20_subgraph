import { BigInt } from "@graphprotocol/graph-ts"
import {
  TestToken,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/TestToken/TestToken"
import { ApprovalSchema, TransferSchema, BalanceSchema } from "../generated/schema"

// export function handleTransfer(event: Transfer): void {
//   let transfer = new TransferSchema(event.transaction.hash.toHex())
//   transfer.Sender = event.params.from;
//   transfer.Receiver = event.params.to;
//   transfer.TokenValue = event.params.value;

//   transfer.save();
// } 

export function handleApproval(event: Approval): void {
  let approval = new ApprovalSchema(event.transaction.hash.toHex())
  approval.Owner = event.params.owner;
  approval.Spender = event.params.spender;
  approval.TokenValue = event.params.value;

  approval.save();
} 

export function handleBalance(event: Transfer): void {
  let userFrom = BalanceSchema.load(event.params.from.toHexString());
  let userTo = BalanceSchema.load(event.params.to.toHexString());
  
  if(userFrom) {
    userFrom.Balance = userFrom.Balance.minus(event.params.value);
    userFrom.save();
  }

  if(!userTo) {
    userTo = new BalanceSchema(event.params.to.toHexString());
    userTo.Balance = event.params.value;
  }
  else {
    userTo.Balance = userTo.Balance.plus(event.params.value);
  }
  userTo.save();
}

// export function handleApproval(event: Approval): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (!entity) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.owner = event.params.owner
//   entity.spender = event.params.spender

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.allowance(...)
//   // - contract.approve(...)
//   // - contract.balanceOf(...)
//   // - contract.decimals(...)
//   // - contract.decreaseAllowance(...)
//   // - contract.increaseAllowance(...)
//   // - contract.name(...)
//   // - contract.owner(...)
//   // - contract.symbol(...)
//   // - contract.totalSupply(...)
//   // - contract.transfer(...)
//   // - contract.transferFrom(...)
// }

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

// export function handleTransfer(event: Transfer): void {}
