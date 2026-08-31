import { describe, it, expect, beforeEach } from 'vitest';
import {
  computeHash,
  computeHashSync,
  authenticateFamily,
  authenticateStaff,
  saveFamilyNewPassword,
} from './family-security';
import { findFamilyByUsernameOrCard } from './parish-families';

describe('Family Security & Cryptographic Password Hashing', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  it('computes one-way cryptographic hash with parish salt', async () => {
    const hash1 = await computeHash('9442162159');
    const hash2 = await computeHash('9442162159');
    const diffHash = await computeHash('differentPassword');

    expect(hash1).toBeDefined();
    expect(typeof hash1).toBe('string');
    expect(hash1.length).toBeGreaterThan(10);
    // Deterministic for same password
    expect(hash1).toBe(hash2);
    // Different for different password
    expect(hash1).not.toBe(diffHash);
  });

  it('successfully authenticates family 101 with username and mobile number password', async () => {
    const result = await authenticateFamily('qoas101', '9442162159');

    expect(result.success).toBe(true);
    expect(result.family).toBeDefined();
    expect(result.family?.cardNo).toBe('101');
    expect(result.family?.headName).toBe('C. Thomas');
    expect(result.family?.anbiyam).toBe('St. Augustine');
  });

  it('successfully authenticates family 701 (Anglo Indian) with card number and mobile password', async () => {
    const result = await authenticateFamily('701', '9444103254');

    expect(result.success).toBe(true);
    expect(result.family).toBeDefined();
    expect(result.family?.cardNo).toBe('701');
    expect(result.family?.headName).toBe('Sheridon Hawes');
    expect(result.family?.anbiyam).toBe('Anglo Indian');
  });

  it('strictly rejects non-existent family without creating dummy profiles', async () => {
    const result = await authenticateFamily('qoas99999', '1234567890');

    expect(result.success).toBe(false);
    expect(result.family).toBeUndefined();
    expect(result.error).toContain('not found in the official Parish Register');
  });

  it('strictly rejects existing family when given an incorrect password', async () => {
    const result = await authenticateFamily('qoas101', 'wrongPassword123');

    expect(result.success).toBe(false);
    expect(result.error).toContain('Incorrect password');
  });

  it('supports updating password with new cryptographic hash', async () => {
    // 1. Initial password works
    const initialAuth = await authenticateFamily('qoas102', '9626371230');
    expect(initialAuth.success).toBe(true);

    // 2. Update to new password
    await saveFamilyNewPassword('102', 'NewSecurePass@2026!');

    // 3. New password works
    const newAuth = await authenticateFamily('qoas102', 'NewSecurePass@2026!');
    expect(newAuth.success).toBe(true);
    expect(newAuth.family?.headName).toBe('Jerome Joseph Raj');
  });

  it('authenticates staff roles with their secure passwords', async () => {
    const priest = await authenticateStaff('priest', 'priest', 'Priest@QOAS2026!');
    expect(priest.success).toBe(true);
    expect(priest.role).toBe('Priest');

    const admin = await authenticateStaff('admin', 'admin', 'Admin@QOAS2026!');
    expect(admin.success).toBe(true);
    expect(admin.role).toBe('Super Admin');

    const invalidPriest = await authenticateStaff('priest', 'priest', 'wrongPass');
    expect(invalidPriest.success).toBe(false);
    expect(invalidPriest.error).toContain('Incorrect');
  });
});
