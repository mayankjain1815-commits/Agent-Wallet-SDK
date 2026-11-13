import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { walletFromEnv } from '../src/convenience.js';

// Well-known Anvil test key — never funded on mainnet.
const TEST_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const TEST_WALLET_ADDRESS = '0x1111111111111111111111111111111111111111';

describe('walletFromEnv chain resolution', () => {
  beforeEach(() => {
    vi.stubEnv('AGENT_PRIVATE_KEY', TEST_PRIVATE_KEY);
    vi.stubEnv('AGENT_WALLET_ADDRESS', TEST_WALLET_ADDRESS);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    ['base', 8453],
    ['base-sepolia', 84532],
    ['ethereum', 1],
    ['arbitrum', 42161],
    ['optimism', 10],
    ['polygon', 137],
  ])('creates a wallet for chain "%s"', (chainName, expectedChainId) => {
    const wallet = walletFromEnv({ chain: chainName });

    expect(wallet.chain.id).toBe(expectedChainId);
  });
});
