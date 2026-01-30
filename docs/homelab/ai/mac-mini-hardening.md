# Mac Mini Security Hardening

**Last Updated:** January 30, 2026  
**Author:** Josh Fletcher  
**Purpose:** Harden Mac Mini AI agent boxes to minimize prompt injection attack surface

## Overview

When running AI agents with shell access on a Mac Mini, you need to isolate sensitive credentials from the agent while maintaining necessary functionality. This guide walks through hardening a Mac Mini running OpenClaw/Claude/Codex agents.

## Threat Model

**Primary Risk:** Prompt injection attacks where malicious input tricks the AI agent into:
- Extracting credentials from keychain
- Authenticating to services on your behalf
- Exfiltrating sensitive data

**Key Principle:** Remove high-value credentials from the agent box. The agent only needs what it actively uses.

## Hardening Steps

### 1. Contact Migration (Google → iCloud)

**Goal:** Get contacts on the Mac Mini for name resolution (iMessage, Reminders) without storing Google OAuth credentials.

**Steps:**
1. Go to [contacts.google.com](https://contacts.google.com)
2. Select all contacts → Export → Choose **vCard** format
3. Download the `.vcf` file
4. On the Mac Mini:
   - Open **Contacts.app**
   - File → Import → Select the `.vcf` file
   - Contacts will import to your iCloud account
5. On your MacBook/iPhone:
   - System Settings → Internet Accounts → Google
   - **Disable Contacts sync** (keep Mail/Calendar if needed)
6. Run the duplicate finder:
   - Contacts.app → Card menu → Look for Duplicates → Merge

**Result:** iCloud is now your single source of truth. No Google account on the Mac Mini.

### 2. iCloud Keychain Isolation

**Goal:** Prevent personal passwords/passkeys from syncing to the agent box.

**Steps:**
1. On the Mac Mini:
   - System Settings → Apple ID → iCloud
   - Find **Passwords and Keychain**
   - Toggle **"Sync this Mac"** to **OFF**
2. Confirm in the Passwords app — you'll see a "Turn on iCloud Keychain" prompt

**Result:** Mac Mini has an isolated local keychain. MacBook/iPhone keep their synced credentials.

### 3. Keychain Cleanup

**Goal:** Remove all passwords/passkeys from the Mac Mini except what's needed (Wi-Fi).

**⚠️ CRITICAL: Order Matters**
- Do this AFTER disabling iCloud Keychain sync
- If you delete before disabling sync, it deletes from all devices!

**Steps:**
1. Open **Passwords app** on Mac Mini
2. Select all non-Wi-Fi entries (Cmd+Click to multi-select)
3. Delete them
4. Go to **Recently Deleted** category
5. Select all → Delete permanently

**Result:** Mac Mini keychain only contains Wi-Fi passwords.

### 4. Keychain Audit

Check for remaining credentials:

```bash
# Search for Google credentials
security find-internet-password -s "google.com" 2>&1
security find-generic-password -l "Google" 2>&1
security dump-keychain 2>&1 | grep -i google

# Search for Gmail
security find-internet-password -s "gmail.com" 2>&1
security dump-keychain 2>&1 | grep -i gmail
```

**Expected findings:**
- Apple Assistant (Siri) may have your Gmail address stored for email reading
- This is metadata, not a credential — safe to leave

### 5. Contact Cleanup (Optional)

Clean up years of accumulated random contacts:

**Recommended approach:**
1. Export current contacts as backup
2. Review categories:
   - **Family** - keep
   - **Close friends** - keep
   - **Work contacts you actively use** - keep
   - **Services/businesses** - keep only active ones
   - **Old/random contacts** - delete
3. Use Contacts.app to delete in batches

**Pro tip:** Delete from the Mac Mini AFTER import. Changes sync to iCloud, so all your devices get the cleaned-up list.

## Security Boundaries

### High-Value (Keep OFF Mac Mini)
- Gmail/Google account (master key for password resets)
- Banking/financial credentials
- Personal passwords/passkeys
- Work VPN/SSH keys

### Low-Value (Acceptable on Mac Mini)
- Claude/OpenAI web OAuth (chat access only, no billing control)
- Wi-Fi passwords (required for functionality)
- Apple Assistant metadata (no auth capability)

## Current State Verification

After hardening, your Mac Mini should have:
- ✅ No Google account in System Settings → Internet Accounts
- ✅ iCloud Keychain sync disabled
- ✅ Passwords app shows only Wi-Fi entries (plus "Turn on iCloud Keychain" prompt)
- ✅ Contacts syncing via iCloud only
- ✅ OAuth tokens for Claude/OpenAI only (low-impact if compromised)

Your MacBook/iPhone should still have:
- ✅ Google account active (for Mail/Calendar, Contacts disabled)
- ✅ iCloud Keychain enabled with all passwords/passkeys
- ✅ Same clean contact list

## Future Enhancements

### Optional: 2FA on AI Service Accounts
Enable 2FA on Claude and OpenAI accounts for an additional security layer:
- **Anthropic (Claude):** Supports TOTP (Authy, Google Authenticator)
- **OpenAI:** Supports TOTP or SMS

Even if OAuth tokens are compromised, attackers can't change settings without 2FA.

### Optional: Hardware Security Keys
For maximum security on your main devices (MacBook/iPhone):
- Use YubiKey or similar for high-value accounts
- Keep hardware keys physically secured
- Don't register them on the Mac Mini

## Replication Guide

To harden a new Mac Mini or repeat this process:

1. **Initial setup:** Sign in with Apple ID, enable iCloud (but not Keychain sync)
2. **Contacts:** Import vCard from iCloud export (or Google if migrating)
3. **Keychain:** Never enable iCloud Keychain sync during setup
4. **OAuth only for AI services:** Authenticate Claude/OpenAI when installing agent software
5. **Verify:** Passwords app should be nearly empty

## Mom's Mac Mini Notes

When hardening Charlene's Mac Mini:
- Same process applies
- Focus on contact cleanup (likely lots of accumulated contacts)
- Ensure she knows Contacts are now iCloud-only
- Document her specific Wi-Fi passwords that need to stay

## References

- **Principle of Least Privilege:** Only grant access to what's actively needed
- **Defense in Depth:** Multiple layers (no OAuth + no keychain sync + 2FA)
- **Threat Modeling:** Focus on high-impact risks (master keys) first

---

**Session Notes:** This guide was developed during a 2-hour hardening session on January 30, 2026. Started with 187 contacts, ended with 54. Removed all passwords/passkeys except Wi-Fi. Mac Mini is now properly isolated from personal credentials.
