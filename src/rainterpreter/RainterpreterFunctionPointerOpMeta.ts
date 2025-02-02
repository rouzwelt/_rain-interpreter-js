import { OpChainlinkOraclePrice } from './ops/chainlink/OpChainlinkOraclePrice';
import { OpCall } from './ops/core/OpCall';
import { OpContext } from './ops/core/OpContext';
import { OpDebug } from './ops/core/OpDebug';
import { OpDoWhile } from './ops/core/OpDoWhile';
import { OpLoopN } from './ops/core/OpLoopN';
import { OpState } from './ops/core/OpState';
import { OpStorage } from './ops/core/OpStorage';
import { OpHash } from './ops/crypto/OpHash';
import { OpERC1155BalanceOf } from './ops/erc1155/OpERC1155BalanceOf';
import { OpERC1155BalanceOfBatch } from './ops/erc1155/OpERC1155BalanceOfBatch';
import { OpERC20BalanceOf } from './ops/erc20/OpERC20BalanceOf';
import { OpERC20TotalSupply } from './ops/erc20/OpERC20TotalSupply';
import { OpERC20SnapshotBalanceOfAt } from './ops/erc20/snapshot/OpERC20SnapshotBalanceOfAt';
import { OpERC20SnapshotTotalSupplyAt } from './ops/erc20/snapshot/OpERC20SnapshotTotalSupplyAt';
import { OpERC721BalanceOf } from './ops/erc721/OpERC721BalanceOf';
import { OpERC721OwnerOf } from './ops/erc721/OpERC721OwnerOf';
import { OpEnsure } from './ops/error/OpEnsure';
import { OpBlockNumber } from './ops/evm/OpBlockNumber';
import { OpCaller } from './ops/evm/OpCaller';
import { OpThisAddress } from './ops/evm/OpThisAddress';
import { OpTimestamp } from './ops/evm/OpTimestamp';
import { OpExplode32 } from './ops/list/OpExplode32';
import { OpScale18 } from './ops/math/fixedPoint/OpScale18';
import { OpScale18Div } from './ops/math/fixedPoint/OpScale18Div';
import { OpScale18Mul } from './ops/math/fixedPoint/OpScale18Mul';
import { OpScaleBy } from './ops/math/fixedPoint/OpScaleBy';
import { OpScaleN } from './ops/math/fixedPoint/OpScaleN';
import { OpAny } from './ops/math/logic/OpAny';
import { OpEagerIf } from './ops/math/logic/OpEagerIf';
import { OpEqualTo } from './ops/math/logic/OpEqualTo';
import { OpEvery } from './ops/math/logic/OpEvery';
import { OpGreaterThan } from './ops/math/logic/OpGreaterThan';
import { OpIsZero } from './ops/math/logic/OpIsZero';
import { OpLessThan } from './ops/math/logic/OpLessThan';
import { OpAdd } from './ops/math/OpAdd';
import { OpDiv } from './ops/math/OpDiv';
import { OpExp } from './ops/math/OpExp';
import { OpMax } from './ops/math/OpMax';
import { OpMin } from './ops/math/OpMin';
import { OpMod } from './ops/math/OpMod';
import { OpMul } from './ops/math/OpMul';
import { OpSub } from './ops/math/OpSub';
import { OpSaturatingAdd } from './ops/math/saturating/OpSaturatingAdd';
import { OpSaturatingMul } from './ops/math/saturating/OpSaturatingMul';
import { OpSaturatingSub } from './ops/math/saturating/OpSaturatingSub';
import { OpIOrderBookV1VaultBalance } from './ops/rain/IOrderBookV1/OpIOrderBookV1VaultBalance';
import { OpISaleV2RemainingTokenInventory } from './ops/rain/ISaleV2/OpISaleV2RemainingTokenInventory';
import { OpISaleV2Reserve } from './ops/rain/ISaleV2/OpISaleV2Reserve';
import { OpISaleV2SaleStatus } from './ops/rain/ISaleV2/OpISaleV2SaleStatus';
import { OpISaleV2Token } from './ops/rain/ISaleV2/OpISaleV2Token';
import { OpISaleV2TotalReserveReceived } from './ops/rain/ISaleV2/OpISaleV2TotalReserveReceived';
import { OpITierV2Report } from './ops/tier/OpITierV2Report';
import { OpITierV2ReportTimesForTier } from './ops/tier/OpITierV2ReportTimesForTier';
import { OpSaturatingDiff } from './ops/tier/OpSaturatingDiff';
import { OpSelectLte } from './ops/tier/OpSelectLte';
import { OpUpdateTimesForTierRange } from './ops/tier/OpUpdateTimesForTierRange';
import { AllStandardOps, FunctionPointerOpMeta } from '../types';
import { callOperand, hexlify, loopNOperand, memoryOperand, selectLteOperand, tierRange } from '../utils';

/**
 * @public
 * All Standard Rainterpreter OpMeta with Function Pointers
 */
export const RainterpreterFunctionPointerOpMeta: FunctionPointerOpMeta[] = [
    {
        enum: AllStandardOps.CHAINLINK_PRICE,
        name: 'CHAINLIN_PRICE',
        description: 'Takes 2 items from constants array and calls the Chainlink Oracle to get price and insert into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['CHAINLINKPRICE', 'PRICE'],
        functionPointer: OpChainlinkOraclePrice,
        data: {
            description: 'Insert the price of a Chainlink Oracle into the stack.',
            category: 'chainlink',
            example: 'chainlink(contractAddress, staleAfter)',
            parameters: [
                {
                    spread: false,
                    name: 'contract address',
                    description: 'The address of the contract.',
                },
                {
                    spread: false,
                    name: 'stale after',
                    description: '',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.CALL,
        name: 'CALL',
        description: 'Takes some items from the stack and runs a source with sub-stack and puts the results back to the stack',
        outputs: (_operand) => (_operand >> 3) & 3,
        inputs: (_operand) => _operand & 7,
        paramsValidRange: (_paramsLength) => _paramsLength >= 0 && _paramsLength < 8,
        operand: {
            // 3 args that construct CALL operand
            argsConstraints: [
                (_value, _paramsLength) =>
                    _value < 8 && _value >= 0 && _paramsLength === _value,      // inputSize valid range
                (_value) => _value < 4 && _value > 0,                           // outputSize valid range
                (_value) => _value < 8 && _value > 0,                           // sourceIndex valid range
            ],
            encoder: (_args) => callOperand(_args[0], _args[1], _args[2]),
            decoder: (_operand) => [_operand & 7, (_operand >> 3) & 3, _operand >> 5],
        },
        aliases: ['FUNCTION', 'FN'],
        functionPointer: OpCall,
        data: {
            description: 'Call a source with some inputs and put the outputs back into the stack',
            category: 'core',
            example: 'call<1, 1>(100 50)',
            parameters: [
                {
                    spread: false,
                    name: 'outputSize',
                    description: 'Number of outputs.',
                },
                {
                    spread: false,
                    name: 'sourceIndex',
                    description: 'Source index to run.',
                },
                {
                    spread: true,
                    name: 'input values',
                    argsConstraints: [],
                },
            ],
        },
    },
    {
        enum: AllStandardOps.CONTEXT,
        name: 'CONTEXT',
        description: 'Inserts an argument passed to a contracts function into the stack, context is a 2D array of uint256',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            // 2 args that construct CONTEXT operand
            argsConstraints: [
                (_value) => _value < 256 && _value >= 0,     // column valid range
                (_value) => _value < 256 && _value >= 0,     // row valid range
            ],
            encoder: (_args) => Number(hexlify(
                new Uint8Array([
                    _args[0],    // column
                    _args[1]     // row
                ])
            )),
            decoder: (_operand) => [
                _operand >> 8,      // column
                _operand & 0xff     // row
            ]
        },
        functionPointer: OpContext,
        data: {
            description: 'Insert a value from the calling function context',
            category: 'core',
            example: 'context<2 6>()',
            parameters: [
                {
                    spread: false,  // not sure 
                    name: 'column index',
                    description: 'The index of the context column to insert.',
                },
                {
                    spread: false,  // not sure
                    name: 'row index',
                    description: 'The index of the constant row to insert.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.DEBUG,
        name: 'DEBUG',
        description: 'ABI encodes the entire stack and logs it to the hardhat console.',
        outputs: (_operand) => 0,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [
                (_value) => _value === 0 || _value === 1,     // type of debug
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['LOG', 'CONSOLE', 'CONSOLE_LOG'],
        functionPointer: OpDebug,
        data: {
            description: 'ABI encodes the entire stack and logs it to the hardhat console.',
            category: 'core',
            example: 'debug()',
            parameters: [],
        },
    },
    {
        enum: AllStandardOps.DO_WHILE,
        name: 'DO_WHILE',
        description: 'Runs a source on stack item(s) until a condition is not met anymore',
        outputs: (_operand) => 0,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength > 0,
        operand: {
            // 1 arg that constructs DO_WHILE operand
            argsConstraints: [
                (_value) => _value < 256 && _value > 0,     // sourceIndex valid range
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['WHILE', 'DOWHILE'],
        functionPointer: OpDoWhile,
        data: {
            description: 'Insert a constant into the expression.',
            category: 'core',
            example: 'do_while<1>(exp1 exp2 condition); add(STATE<0> STATE<1>) sub(STATE<1> 1) condition;',
            parameters: [
                {
                    spread: false,
                    name: 'condition',
                    description: 'condition of the do_while op.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.LOOP_N,
        name: 'LOOP_N',
        description: 'Loop a source n times on stack items',
        outputs: (_operand) => 0,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            // 2 args that construct LOOP_N operand
            argsConstraints: [
                (_value) => _value < 16 && _value >= 0,     // loopSize valid range
                (_value) => _value < 16 && _value > 0,     // sourceIndex valid range
            ],
            encoder: (_args) => loopNOperand(
                _args[0],    // loop size, n times 
                _args[1]     // source index
            ),
            decoder: (_operand) => [_operand & 15, _operand >> 4]
        },
        aliases: ['LOOP', 'LOOPN', 'FOR'],
        functionPointer: OpLoopN,
        data: {
            description: 'Loop a source n times on stack items.',
            category: 'core',
            example: 'loop_n<8 1>(exp1 exp2); add(STATE<0> STATE<1>) sub(1 STATE<1>);',
            parameters: [
                {
                    spread: false,
                    name: 'loopSize',
                    description: 'loop for this size times (0<n<16).',
                },
                {
                    spread: false,
                    name: 'sourceIndex',
                    description: 'The source index to run (0<n<16).',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.STATE,
        name: 'STATE',
        description: 'Takes an item from constants array or copy from stack items and insert it into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            // 2 args that construct STATE operand
            argsConstraints: [
                (_value) => _value < 2 && _value >= 0,     // type of STATE (constants or stack) valid range
                (_value) => _value < 128 && _value >= 0,     // index valid range
            ],
            encoder: (_args) => memoryOperand(0, _args[0]),
            decoder: (_operand) => [_operand & 1, (_operand & 254) >> 1]
        },
        functionPointer: OpState,
        data: {
            description: 'Copy stack item into the expression.',
            category: 'core',
            example: 'state(3)',
            parameters: [
                {
                    spread: false,
                    name: 'index',
                    description: 'The stack item at this index to copy.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.STORAGE,
        name: 'STORAGE',
        description: 'Insert a value from contract storage into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [
                (_value) => _value < 256 && _value >= 0,     // index of Storage slot valid range
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['MEMORY'],
        functionPointer: OpStorage,
        data: {
            description: 'Insert a value from contract storage.',
            category: 'core',
            example: 'storage(0)',
            parameters: [
                {
                    spread: false,
                    name: 'index',
                    description: 'The index of the storage value to insert.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.HASH,
        name: 'HASH',
        description: 'Hash (solidity keccak256) item(s) of the stack and put the result into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['ENCODE', 'ENCRYPT'],
        functionPointer: OpHash,
        data: {
            description: 'Hash (solidity keccak256) item(s) of the stack and put the result into the stack',
            category: 'crypto',
            example: 'hash(0x1234 0xabcd)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'Values to hash',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ERC20_BALANCE_OF,
        name: 'IERC20_BALANCE_OF',
        description: 'Get the balance of an ERC20 token for an account by taking the contract and account address from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['ERC20_BALANCE_OF', 'ERC20BALANCEOF', 'IERC20BALANCEOF'],
        functionPointer: OpERC20BalanceOf,
        data: {
            description: 'Get the balance of an ERC20 token for an account.',
            category: 'ERC20',
            example: 'ierc20_balance_of(0x..., 0x...)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC20 address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account to get the balance of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ERC20_TOTAL_SUPPLY,
        name: 'IERC20_TOTAL_SUPPLY',
        description: 'Get the supply of an ERC20 token by taking the contract address from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'ERC20_TOTAL_SUPPLY',
            'ERC20TOTALSUPPLY',
            'IERC20TOTALSUPPLY',
        ],
        functionPointer: OpERC20TotalSupply,
        data: {
            description: 'Get the totalSupply of an ERC20 token.',
            category: 'ERC20',
            example: 'ierc20_total_supply(0x...)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC20 address.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ERC20_SNAPSHOT_BALANCE_OF_AT,
        name: 'IERC20_SNAPSHOT_BALANCE_OF_AT',
        description: 'Get the snapshot balance of an ERC20 token for an account by taking the contract and account address and snapshot id from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 3,
        paramsValidRange: (_paramsLength) => _paramsLength === 3,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'ERC20_SNAPSHOT_BALANCE_OF_AT',
            'ERC20SNAPSHOTBALANCEOFAT',
            'IERC20SNAPSHOTBALANCEOFAT',
        ],
        functionPointer: OpERC20SnapshotBalanceOfAt,
        data: {
            description: 'Retrieves the balance of an account at the time a snapshotId was created.',
            category: 'ERC20',
            example: 'ierc20_snapshot_balance_of_at(0x..., 0x..., 1)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC20 address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account to get the balance of.',
                },
                {
                    spread: false,
                    name: 'snapshotId',
                    description: 'The id of the snapshot.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ERC20_SNAPSHOT_TOTAL_SUPPLY_AT,
        name: 'IERC20_SNAPSHOT_TOTAL_SUPPLY_AT',
        description: 'Get the snapshot supply of an ERC20 token by taking the contract address and snapshot id from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'ERC20_SNAPSHOT_TOTAL_SUPPLY_AT',
            'ERC20SNAPSHOTTOTALSUPPLYAT',
            'IERC20SNAPSHOTTOTALSUPPLYAT',
        ],
        functionPointer: OpERC20SnapshotTotalSupplyAt,
        data: {
            description: 'Retrieves the total supply of a token at the time a snapshotId was created.',
            category: 'ERC20',
            example: 'ierc20_snapshot_total_supply_at(0x..., 1)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC20 address.',
                },
                {
                    spread: false,
                    name: 'snapshotId',
                    description: 'The id of the snapshot.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.IERC721_BALANCE_OF,
        name: 'IERC721_BALANCE_OF',
        description: 'Get the balance of an ERC721 token for an account by taking the contract and account address from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'ERC721_BALANCE_OF',
            'ERC721BALANCEOF',
            'IERC721BALANCEOF',
        ],
        functionPointer: OpERC721BalanceOf,
        data: {
            description: 'Get the balance of an ERC721 token for an account.',
            category: 'ERC721',
            example: 'ierc721_balance_of(0x..., 0x...)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC721 address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account to get the balance of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.IERC721_OWNER_OF,
        name: 'IERC721_OWNER_OF',
        description: 'Get the owner of an ERC20 token for an account by taking the contract address and token id from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['ERC721_OWNER_OF', 'ERC721OWNEROF', 'IERC721OWNEROF'],
        functionPointer: OpERC721OwnerOf,
        data: {
            description: 'Returns the owner of the tokenId token.',
            category: 'ERC721',
            example: 'ierc721_owner_of(0x..., 1)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC721 address.',
                },
                {
                    spread: false,
                    name: 'id',
                    description: 'The id to get the owner of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.IERC1155_BALANCE_OF,
        name: 'IERC1155_BALANCE_OF',
        description: 'Get the balance of an ERC1155 token for an account by taking the contract and account address and token id from stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 3,
        paramsValidRange: (_paramsLength) => _paramsLength === 3,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'ERC1155_BALANCE_OF',
            'ERC1155BALANCEOF',
            'IERC1155BALANCEOF',
        ],
        functionPointer: OpERC1155BalanceOf,
        data: {
            description: 'Batched version of balanceOf.',
            category: 'ERC1155',
            example: 'ierc1155_balance_of(0x..., 0x..., 1)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC1155 address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account to get the balance of.',
                },
                {
                    spread: false,
                    name: 'id',
                    description: 'The id to get the balance of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.IERC1155_BALANCE_OF_BATCH,
        name: 'IERC1155_BALANCE_OF_BATCH',
        description: 'Get the batch balances of an ERC1155 token for an account by taking the contract address and array of account addresses and token ids from stack',
        outputs: (_operand) => _operand,
        inputs: (_operand) => (_operand * 2) + 1,
        paramsValidRange: (_paramsLength) => 
            _paramsLength > 2 && ((_paramsLength % 2) === 1),
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => (_paramsLength - 1) / 2,
            decoder: (_operand) => [(_operand * 2) + 1]
        },
        aliases: [
            'ERC1155_BALANCE_OF_BATCH',
            'ERC1155BALANCEOFBATCH',
            'IERC1155BALANCEOFBATCH',
        ],
        functionPointer: OpERC1155BalanceOfBatch,
        data: {
            description: 'Inserts the current block number.',
            category: 'ERC1155',
            example: 'ierc1155_balance_of_batch(2, 0x..., 0x..., 0x..., 1, 2)',
            parameters: [
                {
                    spread: false,
                    name: 'token',
                    description: 'The ERC1155 address.',
                },
                {
                    spread: true,
                    name: 'accounts',
                    description: 'The accounts to get the balance of.',
                },
                {
                    spread: true,
                    name: 'ids',
                    description: 'The corresponding ids to get the balance of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.BLOCK_NUMBER,
        name: 'BLOCK_NUMBER',
        description: 'Inserts the current block number into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['CURRENT_BLOCK', 'CURRENTBLOCK', 'BLOCKNUMBER'],
        functionPointer: OpBlockNumber,
        data: {
            description: 'Inserts the current block number.',
            category: 'EVM',
            example: 'block_number()',
            parameters: [],
        },
    },
    {
        enum: AllStandardOps.CALLER,
        name: 'CALLER',
        description: 'Inserts the msg.sender address into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['MSG_SENDER', 'MSGSENDER', 'SIGNER'],
        functionPointer: OpCaller,
        data: {
            description: 'The sender of the current transaction.',
            category: 'EVM',
            example: 'sender()',
            parameters: [],
        },
    },
    {
        enum: AllStandardOps.THIS_ADDRESS,
        name: 'THIS_ADDRESS',
        description: 'Inserts this contract address into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['THISADDRESS'],
        functionPointer: OpThisAddress,
        data: {
            description: 'The address of the contract this expression is being evaluated in.',
            category: 'EVM',
            example: 'this_address()',
            parameters: [],
        },
    },
    {
        enum: AllStandardOps.BLOCK_TIMESTAMP,
        name: 'BLOCK_TIMESTAMP',
        description: 'Insert the current block timestamp into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 0,
        paramsValidRange: (_paramsLength) => _paramsLength === 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: [
            'CURRENT_TIMESTAMP',
            'CURRENTTIMESTAMP',
            'BLOCKTIMESTAMP',
            'CURRENTTIME',
            'CURRENT_TIME',
        ],
        functionPointer: OpTimestamp,
        data: {
            description: 'The timestamp of the current block (in seconds).',
            category: 'EVM',
            example: 'block_timestamp()',
            parameters: [],
        },
    },
    {
        enum: AllStandardOps.ENSURE,
        name: 'ENSURE',
        description: 'Require ietms(s) of the stack to be true, i.e. greater than zero and revert if fails',
        outputs: (_operand) => 0,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 0,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['REQUIRE'],
        functionPointer: OpEnsure,
        data: {
            description: 'Require ietms(s) of the stack to be true, i.e. greater than zero and revert id fails.',
            category: 'error',
            example: 'ensure(add(0 1) sub(5 9))',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'Values to ensure about.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SCALE18,
        name: 'SCALE18',
        description: 'Rescale some fixed point number to 18 OOMs in situ.',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [
                (_value) => _value < 256 && _value > 0,
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['SCALE_18'],
        functionPointer: OpScale18,
        data: {
            description: 'Rescale some fixed point number to 18 OOMs in situ.',
            category: 'math',
            example: 'scale18(10 47850000000)',
            parameters: [
                {
                    spread: false,
                    name: 'decimal point',
                    description: 'The decimals of the value to convert into 18 fixed point decimals.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The values to convert into 18 fixed point decimals.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SCALE18_DIV,
        name: 'SCALE18_DIV',
        description: 'Inserts the result of dividing the 2 items of the stack by keeping the 18 fixed point decimals into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [
                (_value) => _value < 256 && _value > 0,
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['SCALE18DIV', 'SCALE_18_DIV'],
        functionPointer: OpScale18Div,
        data: {
            description: 'Inserts the result of dividing the 2 items of the stack by keeping the 18 fixed point decimals into the stack',
            category: 'math',
            example: 'scale_div(6 0x123450000 4)',
            parameters: [
                {
                    spread: false,
                    name: 'first value decimal point',
                    description: 'The decimals of the first value to keep the 18 fixed point decimals.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The first value.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The second value.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SCALE18_MUL,
        name: 'SCALE18_MUL',
        description: 'Inserts the result of multiplying the 2 items of the stack by keeping the 18 fixed point decimals into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [
                (_value) => _value < 256 && _value > 0,
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['SCALE18MUL', 'SCALE_18_MUL'],
        functionPointer: OpScale18Mul,
        data: {
            description: 'Inserts the result of dividing the 2 items of the stack by keeping the 18 fixed point decimals into the stack',
            category: 'math',
            example: 'scale_mul(6 0x123450000 4)',
            parameters: [
                {
                    spread: false,
                    name: 'first value decimal point',
                    description: 'The decimals of the first value to keep the 18 fixed point decimals.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The first value.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The second value.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SCALE_BY,
        name: 'SCALE_BY',
        description: 'Scale a fixed point up or down by opernad.',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [
                (_value) => _value < 128 && _value > -129,
            ],
            encoder: (_args) => _args[0] < 0 ? 256 + _args[0] : _args[0],
            decoder: (_operand) => [_operand < 128 ? _operand : _operand - 256]
        },
        aliases: ['SCALEBY'],
        functionPointer: OpScaleBy,
        data: {
            description: 'Rescale an arbitrary fixed point number by some OOMs.',
            category: 'math',
            example: 'scale_by(2 10000000)',
            parameters: [
                {
                    spread: false,
                    name: 'decimal point to scale up/down with',
                    description: 'The decimal point to up or down by, this value is complement 2s.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The value to scale by.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SCALEN,
        name: 'SCALEN',
        description: 'Rescale an 18 OOMs fixed point number to scale N.',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [
                (_value) => _value < 256 && _value > 0,
            ],
            encoder: (_args) => _args[0],
            decoder: (_operand) => [_operand]
        },
        aliases: ['SCALE_N'],
        functionPointer: OpScaleN,
        data: {
            description: 'Rescale an 18 OOMs fixed point number to scale N.',
            category: 'math',
            example: 'scalen(4 1000000000)',
            parameters: [
                {
                    spread: false,
                    name: 'target fixed decimals point',
                    description: 'The targeted fixed decimals point to convert the value to.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The value to scale to N.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.EXPLODE32,
        name: 'EXPLODE32',
        description: 'Part an uint256 value into 8 seperate 1 byte size values.',
        outputs: (_operand) => 8,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['EXPLODE'],
        functionPointer: OpExplode32,
        data: {
            description: 'Part an uint256 value into 8 seperate 1 byte size values.',
            category: 'list',
            example: 'explode32(0x123456abcdef90)',
            parameters: [
                {
                    spread: false,
                    name: 'value',
                    description: 'The value to explode.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ANY,
        name: 'ANY',
        description: 'Inserts the first non-zero value of all the values it checks if there exists one, else inserts zero into the stack.',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['OR', 'ANY_OF', 'ANYOF', '|', '||'],
        functionPointer: OpAny,
        data: {
            description: 'Returns the first non-zero value if any of N number of sub-expressions are non-zero',
            category: 'logic',
            example: 'any(2, {expression}, {expression})',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to check.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.EAGER_IF,
        name: 'EAGER_IF',
        description: 'Takes 3 items from the stack and check if the first item is non-zero the inserts the second item into the stack, else inserts the 3rd item',
        outputs: (_operand) => 1,
        inputs: (_operand) => 3,
        paramsValidRange: (_paramsLength) => _paramsLength === 3,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['EAGERIF', 'IF'],
        functionPointer: OpEagerIf,
        data: {
            description: 'If statement',
            category: 'logic',
            example: 'eager_if(1, 100, 200)',
            parameters: [
                {
                    spread: false,
                    name: 'condition',
                    description: 'The condition to evaluate.',
                },
                {
                    spread: false,
                    name: 'then',
                    description: 'The value if the condition is non-zero/true.',
                },
                {
                    spread: false,
                    name: 'else',
                    description: 'The value if the condition is zero/false.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.EQUAL_TO,
        name: 'EQUAL_TO',
        description: 'Comapres the last 2 items of the stack together and inserts true/1 into stack if they are euqal, else inserts false/0',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['EQ', 'EQUALTO', '=', '==', '==='],
        functionPointer: OpEqualTo,
        data: {
            description: 'Returns true if two values are equal.',
            category: 'logic',
            example: 'equal_to(100, 200)',
            parameters: [
                {
                    spread: false,
                    name: 'value1',
                    description: 'The first value.',
                },
                {
                    spread: false,
                    name: 'value2',
                    description: 'The second value.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.EVERY,
        name: 'EVERY',
        description: 'Inserts the first value of all the values it checks if all of them are non-zero, else inserts zero into the stack.',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['AND', 'ALL_OF', 'ALLOF', '&', '&&'],
        functionPointer: OpEvery,
        data: {
            description: 'Returns the first value if all of N number of sub-expressions are non-zero',
            category: 'logic',
            example: 'every(2, {expression}, {expression})',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to check.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.GREATER_THAN,
        name: 'GREATER_THAN',
        description: 'Takes last 2 values from stack and puts true/1 into the stack if the first value is greater than the second value and false/0 if not.',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['GT', 'GREATERTHAN', 'BIGGERTHAN', 'BIGGER_THAN', '>'],
        functionPointer: OpGreaterThan,
        data: {
            description: 'Returns true if value X is greater than value Y.',
            category: 'logic',
            example: 'greater_than(X, Y)',
            parameters: [
                {
                    spread: false,
                    name: 'value',
                    description: 'The first value.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The second value.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ISZERO,
        name: 'ISZERO',
        description: 'Checks if the value is zero and inserts true/1 into the stack if it is, else inserts false/0',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['IS_ZERO', 'FALSE', 'IS_FALSE', 'ISFALSE'],
        functionPointer: OpIsZero,
        data: {
            description: 'Returns true if a value is zero.',
            category: 'logic',
            example: 'iszero(1)',
            parameters: [
                {
                    spread: false,
                    name: 'value',
                    description: 'The value to check.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.LESS_THAN,
        name: 'LESS_THAN',
        description: 'Takes last 2 values from stack and puts true/1 into the stack if the first value is less than the second value and false/0 if not.',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['LT', 'LESSTHAN', 'LITTLETHAN', 'LITTLE_THAN', '<'],
        functionPointer: OpLessThan,
        data: {
            description: 'Returns true if value X is less than value Y.',
            category: 'logic',
            example: 'less_than(X, Y)',
            parameters: [
                {
                    spread: false,
                    name: 'value',
                    description: 'The first value.',
                },
                {
                    spread: false,
                    name: 'value',
                    description: 'The second value.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SATURATING_ADD,
        name: 'SATURATING_ADD',
        description: 'Inserts sum of the specified items from the stack and if prevernts reverts if the result goes above max 256 bit size',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: [
            'SATURATINGADD',
            'SAT_ADD',
            'SATADD',
            'SATURATING_SUM',
            'SATURATINGSUM',
            'SATSUM',
            'SAT_SUM',
        ],
        functionPointer: OpSaturatingAdd,
        data: {
            description: 'Sum of N values and prevernts from the result going above max uint 256',
            category: 'math',
            example: 'saturating_add(1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to sum.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SATURATING_MUL,
        name: 'SATURATING_MUL',
        description: 'Inserts multiplied result of the specified items from the stack and if prevernts reverts if the result goes above max 256 bit size',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['SATURATINGMUL', 'SAT_MUL', 'SATMUL'],
        functionPointer: OpSaturatingMul,
        data: {
            description: 'Multiplication of N values and prevernts from the result going above max uint 256',
            category: 'math',
            example: 'saturating_mul(1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to sum.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SATURATING_SUB,
        name: 'SATURATING_SUB',
        description: 'Inserts subtraction of the specified items from the stack and if prevernts reverts if the result goes blow zero',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: [
            'SATURATINGSUB',
            'SAT_SUB',
            'SATSUB',
            'SATURATING_MINUS',
            'SATURATINGMINUS',
            'SATMINUS',
            'SAT_MINUS',
        ],
        functionPointer: OpSaturatingSub,
        data: {
            description: 'Subtraction of N values and prevernts from the result going below zero',
            category: 'math',
            example: '',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to sum.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ADD,
        name: 'ADD',
        description: 'Inserts the result of sum of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['+', 'SUM'],
        functionPointer: OpAdd,
        data: {
            description: 'Sums N number of values.',
            category: 'math',
            example: 'add(3, 1, 3, 2)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to sum.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.DIV,
        name: 'DIV',
        description: 'Inserts the result of divide of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['/', '÷', 'DIVIDE'],
        functionPointer: OpDiv,
        data: {
            description: 'Divides N number of values.',
            category: 'math',
            example: 'div(3 1 3 1)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to divide.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.EXP,
        name: 'EXP',
        description: 'Inserts the result of exponention of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: [
            '^',
            '**',
            'POW',
            'POWER',
            'POWER_OF',
            'POWEROF',
            'EXPONENTION',
        ],
        functionPointer: OpExp,
        data: {
            category: 'math',
            example: 'Powers N number of values sequentialy',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to power.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.MAX,
        name: 'MAX',
        description: 'Inserts the maximum of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['MAXIMUM', 'MAXIMUM_OF', 'MAXIMUMOF', 'MAX_OF', 'MAXOF'],
        functionPointer: OpMax,
        data: {
            description: 'Returns the maximum of N number of values',
            category: 'math',
            example: 'max(1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to get the max of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.MIN,
        name: 'MIN',
        description: 'Inserts the minimum of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['MINIMUM', 'MINIMUM_OF', 'MINIMUMOF', 'MIN_OF', 'MINOF'],
        functionPointer: OpMin,
        data: {
            description: 'Returns the minimum of N number of values',
            category: 'math',
            example: 'min(1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to get the min of.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.MOD,
        name: 'MOD',
        description: 'Inserts the mod of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['%'],
        functionPointer: OpMod,
        data: {
            description: 'Mod of N number of values.',
            category: 'math',
            example: 'mod(8 3 2)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to mod.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.MUL,
        name: 'MUL',
        description: 'Inserts the multiplication of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['*', 'X'],
        functionPointer: OpMul,
        data: {
            description: 'Multiplies N number of values',
            category: 'math',
            example: 'mul(3 1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to multiply.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SUB,
        name: 'SUB',
        description: 'Inserts the subtraction of N values taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength,
            decoder: (_operand) => [_operand]
        },
        aliases: ['MINUS'],
        functionPointer: OpSub,
        data: {
            description: 'Subtracts N number of values',
            category: 'math',
            example: 'sub(3 1 2 3)',
            parameters: [
                {
                    spread: true,
                    name: 'values',
                    description: 'The values to subtract.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.IORDERBOOKV1_VAULT_BALANCE,
        name: 'IORDERBOOKV1_VAULT_BALANCE',
        description: 'The balance of an orderbook vault',
        outputs: (_operand) => 1,
        inputs: (_operand) => 4,
        paramsValidRange: (_paramsLength) => _paramsLength === 4,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['VAULTBALANCE', 'VAULT_BALANCE'],
        functionPointer: OpIOrderBookV1VaultBalance,
        data: {
            description: 'The balance of an orderbook vault',
            category: 'orderbook',
            example: 'iorderbook-vault-balance(orderbookAddress ownerAddress tokenAddress id)',
            parameters: [
                {
                    spread: false,
                    name: 'orderbookAddress',
                    description: 'The address of the IOrderbookV2.',
                },
                {
                    spread: false,
                    name: 'ownerAddress',
                    description: 'The address of the Owner of the vault.',
                },
                {
                    spread: false,
                    name: 'tokenAddress',
                    description: 'The address of the Token.',
                },
                {
                    spread: false,
                    name: 'id',
                    description: 'The vault ID.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ISALEV2_REMAINING_TOKEN_INVENTORY,
        name: 'ISALEV2_REMAINING_TOKEN_INVENTORY',
        description: 'The remaining rTKNs left to to be sold',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['REMAINING_UNITS'],
        functionPointer: OpISaleV2RemainingTokenInventory,
        data: {
            description: 'The remaining rTKNs left to to be sold',
            category: 'sale',
            example: 'isalev2_remaining_units_inventory(saleAddress)',
            parameters: [
                {
                    spread: false,
                    name: 'address',
                    description: 'The address of the ISaleV2.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ISALEV2_RESERVE,
        name: 'ISALEV2_RESERVE',
        description: 'The reserve token address',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['RESERVE', 'RESERVE_TOKEN', 'RESERVETOKEN'],
        functionPointer: OpISaleV2Reserve,
        data: {
            description: 'The reserve token address',
            category: 'sale',
            example: 'isalev2_reserve(saleAddress)',
            parameters: [
                {
                    spread: false,
                    name: 'address',
                    description: 'The address of the ISaleV2.',
                },
            ],
        }
    },
    {
        enum: AllStandardOps.ISALEV2_SALE_STATUS,
        name: 'ISALEV2_SALE_STATUS',
        description: 'Insert the status of a Sale contract into the stack by taking its address from the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['SALE_STATUS', 'STATUS'],
        functionPointer: OpISaleV2SaleStatus,
        data: {
            description: 'Insert the status of a Sale contract into the stack by taking its address from the stack',
            category: 'sale',
            example: 'isalev2_status(saleAddress)',
            parameters: [
                {
                    spread: false,
                    name: 'address',
                    description: 'The address of the ISaleV2.',
                },
            ],
        }
    },
    {
        enum: AllStandardOps.ISALEV2_TOKEN,
        name: 'The rTKN address',
        description: 'ISALEV2_TOKEN',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['RTKN', 'TOKEN', 'REDEEMABLE_TOKEN'],
        functionPointer: OpISaleV2Token,
        data: {
            description: 'The rTKN address',
            category: 'sale',
            example: 'isalev2_token(saleAddress)',
            parameters: [
                {
                    spread: false,
                    name: 'address',
                    description: 'The address of the ISaleV2.',
                },
            ],
        }
    },
    {
        enum: AllStandardOps.ISALEV2_TOTAL_RESERVE_RECEIVED,
        name: 'The total amount of reserve tokens received by the sale',
        description: 'ISALEV2_TOTAL_RESERVE_RECEIVED',
        outputs: (_operand) => 1,
        inputs: (_operand) => 1,
        paramsValidRange: (_paramsLength) => _paramsLength === 1,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['TOTAL_RAISED'],
        functionPointer: OpISaleV2TotalReserveReceived,
        data: {
            description: 'The total amount of reserve tokens received by the sale',
            category: 'sale',
            example: 'isalev2_total_reserve_received(saleAddress)',
            parameters: [
                {
                    spread: false,
                    name: 'address',
                    description: 'The address of the ISaleV2.',
                },
            ],
        }
    },
    {
        enum: AllStandardOps.ITIERV2_REPORT,
        name: 'ITIERV2_REPORT',
        description: 'Inserts the report of an account of a tier contract and optionally contexts which are taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand + 2,
        paramsValidRange: (_paramsLength) => 
            _paramsLength === 2 || _paramsLength === 3 || _paramsLength === 10,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength - 2,
            decoder: (_operand) => [_operand + 2]
        },
        aliases: [
            'REPORT',
            'ITIERV2REPORT',
            'TIERREPORT',
            'TIER_REPORT',
            'ITIERREPORT',
            'ITIER_REPORT',
        ],
        functionPointer: OpITierV2Report,
        data: {
            description: 'Return the report of a tier contract for an account',
            category: 'tier',
            example: 'itierv2_report(tierContractAddress account)',
            parameters: [
                {
                    spread: false,
                    name: 'tier contract',
                    description: 'The tier contract address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account address.',
                },
                {
                    spread: true,
                    name: 'context',
                    description: 'The contextual values.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.ITIERV2_REPORT_TIME_FOR_TIER,
        name: 'ITIERV2_REPORT_TIME_FOR_TIER',
        description: 'Inserts the specified tier level report of an account of a tier contract and optionally contexts which are taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand + 3,
        paramsValidRange: (_paramsLength) => 
            _paramsLength === 3 || _paramsLength === 4 || _paramsLength === 11,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => _paramsLength - 3,
            decoder: (_operand) => [_operand + 3]
        },
        aliases: [
            'ITIERV2REPORTTIMEFORTIER',
            'SINGLE_REPORT',
            'SINGLEREPORT',
            'SINGLE_TIER_REPORT',
            'SINGLETIERREPORT',
        ],
        functionPointer: OpITierV2ReportTimesForTier,
        data: {
            description: 'Return the specified tier level report of a tier contract for an account',
            category: 'tier',
            example: 'itierv2_report_time_for_tier(tierAddress account tierLevel)',
            parameters: [
                {
                    spread: false,
                    name: 'tier contract',
                    description: 'The tier contract address.',
                },
                {
                    spread: false,
                    name: 'account',
                    description: 'The account address.',
                },
                {
                    spread: false,
                    name: 'tier',
                    description: 'The tier level.',
                },
                {
                    spread: true,
                    name: 'context',
                    description: 'The contextual values.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SATURATING_DIFF,
        name: 'SATURATING_DIFF',
        description: 'Inserts the saturating difference of 2 reports taken from the stack into the stack and prevents reverts if the result below zero',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [],
            encoder: (_args, _paramsLength) => 0,
            decoder: (_operand) => []
        },
        aliases: ['SAT_DIFF', 'SATDIFF', 'SATURATINGDIFF'],
        functionPointer: OpSaturatingDiff,
        data: {
            description: 'Returns the saturating difference of reports, prevernt the result to go below zero',
            category: 'tier',
            example: 'saturating_diff(report1 report2)',
            parameters: [
                {
                    spread: false,
                    name: 'report1',
                    description: 'The firts report.',
                },
                {
                    spread: false,
                    name: 'report2',
                    description: 'The second report.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.SELECT_LTE,
        name: 'SELECT_LTE',
        description: 'Inserts the result of selecting the less than equal to specified value taken from stack among number of reports by a logic and mode into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => _operand & 31,
        paramsValidRange: (_paramsLength) => _paramsLength > 1,
        operand: {
            argsConstraints: [
                (_value) => _value >= 0 && _value <= 1,    // logic
                (_value) => _value >= 0 && _value <= 2,    // mode
                (_value, _paramsLength) =>
                    _value >= 1 && _value <= 31 && _paramsLength - _value === 1,   // length
            ],
            encoder: (_args) => selectLteOperand(_args[0], _args[1], _args[2]),
            decoder: (_operand) => [_operand >> 7, (_operand >> 5) & 3, _operand & 31],
        },
        aliases: ['SELECTLTE', 'SELECT'],
        functionPointer: OpSelectLte,
        data: {
            description: 'Returns the result of selecting the less than equal to a value among number of reports defnied by the mode and logic',
            category: 'tier',
            example:
                'select_lte(0 1 block_timestamp() itierv2_report(tierAddress account) itierv2_report(tierAddress account))',
            parameters: [
                {
                    spread: false,
                    name: 'logic',
                    description: 'The logic of selectLte (every, any).',
                },
                {
                    spread: false,
                    name: 'mode',
                    description: 'The mode of selectLte (min, max, first).',
                },
                {
                    spread: false,
                    name: 'referrence value',
                    description: 'The value to check the tier reports against.',
                },
                {
                    spread: true,
                    name: 'reports',
                    description: 'The reports to selectLte from.',
                },
            ],
        },
    },
    {
        enum: AllStandardOps.UPDATE_TIMES_FOR_TIER_RANGE,
        name: 'UPDATE_TIMES_FOR_TIER_RANGE',
        description: 'Inserts the result of updating the range of tiers of a report taken from stack by a value taken from the stack into the stack',
        outputs: (_operand) => 1,
        inputs: (_operand) => 2,
        paramsValidRange: (_paramsLength) => _paramsLength === 2,
        operand: {
            argsConstraints: [
                (_value) => _value >= 0 && _value <= 8,    // start tier
                (_value) => _value >= 0 && _value <= 8,    // end tier
            ],
            encoder: (_args) => tierRange(_args[0], _args[1]),
            decoder: (_operand) => [_operand & 31, _operand >> 4]
        },
        aliases: [
            'UPDATETIMESFORTIERRANGE',
            'UPDATE_TIER_RANGE',
            'UPDATETIERRANGE',
            'UPDATE_TIERS',
            'UPDATETIERS',
            'UPDATE_REPORT',
            'UPDATEREPORT',
        ],
        functionPointer: OpUpdateTimesForTierRange,
        data: {
            description: 'Returns the updated report with a value applied to range of tier levels',
            category: 'tier',
            example:
                'update_times_for_tier_range(0 8 block_timestamp() itierv2_report(0x....1 0x....2))',
            parameters: [
                {
                    spread: false,
                    name: 'start tier',
                    description: 'The start tier range',
                },
                {
                    spread: false,
                    name: 'end tier',
                    description: 'The end tier range',
                },
                {
                    spread: false,
                    name: 'updateValue',
                    description: 'The value to update tier range to',
                },
                {
                    spread: false,
                    name: 'report',
                    description: 'The report to update its tier range',
                },
            ],
        },
    }
]
