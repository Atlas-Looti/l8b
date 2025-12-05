# @l8b/notifications

**LootiScript API Binding** - Farcaster notification management for Mini Apps.

> **Note**: This package is used as an API binding for LootiScript in the l8b engine. It provides access to notification tokens and management when running in a Farcaster Mini App environment.

## Overview

Notifications allow Mini Apps to send push notifications to users who have added the app and enabled notifications. This package provides client-side access to notification tokens that need to be sent to your server for storage.

**Important:** Sending notifications is done **server-side**. This package helps you:

- Access notification tokens from the client
- Send tokens to your server for storage
- Check if notifications are enabled

## API Reference

### Methods

#### notifications.isEnabled()

Check if notifications are enabled for the current user.

```lua
if notifications.isEnabled() == 1 then
  print("Notifications enabled")
else
  print("Notifications not enabled")
end
```

**Returns:** `1` if enabled, `0` if not enabled

#### notifications.getToken()

Get the notification token (if available).

```lua
local token = notifications.getToken()
if token then
  print("Token: " .. token)
  -- Send to server for storage
end
```

**Returns:** `string | undefined` - Notification token or undefined if not available

#### notifications.getUrl()

Get the notification URL (if available).

```lua
local url = notifications.getUrl()
if url then
  print("Notification URL: " .. url)
end
```

**Returns:** `string | undefined` - Notification URL or undefined if not available

#### notifications.getDetails()

Get both notification token and URL.

```lua
local details = notifications.getDetails()
if details then
  print("Token: " .. details.token)
  print("URL: " .. details.url)

  -- Send to server
  await http.post("https://api.example.com/notifications/register", {
    token = details.token,
    url = details.url,
    fid = player.getFid()
  })
end
```

**Returns:** `{ token: string, url: string } | undefined` - Notification details or undefined if not available

#### notifications.sendTokenToServer()

Helper method to send notification token to your server.

```lua
-- Send token to your server endpoint
local response = await notifications.sendTokenToServer("https://api.example.com/notifications/register")

if response.ok() == 1 then
  print("Token registered successfully")
else
  print("Failed to register token")
end
```

**Parameters:**

- `serverUrl` (string, required): Your server endpoint URL
- `options` (object, optional): Additional fetch options (headers, etc.)

**Returns:** `Response` - Fetch response object

**Note:** This method automatically includes:

- `token`: Notification token
- `url`: Notification URL
- `fid`: User's Farcaster ID

## Example Usage

### Basic Usage

```lua
function init()
  -- Check if notifications are enabled
  if notifications.isEnabled() == 1 then
    local token = notifications.getToken()
    local url = notifications.getUrl()

    print("Notifications enabled!")
    print("Token: " .. token)
    print("URL: " .. url)

    -- Send to server for storage
    await sendTokenToServer(token, url)
  else
    print("Notifications not enabled")
  end
end

async function sendTokenToServer(token, url)
  local response = await http.post("https://api.example.com/notifications/register", {
    token = token,
    url = url,
    fid = player.getFid()
  })

  if response.ok() == 1 then
    print("Token registered!")
  end
end
```

### Using Helper Method

```lua
async function registerNotifications()
  if notifications.isEnabled() == 1 then
    try
      local response = await notifications.sendTokenToServer("https://api.example.com/notifications/register")

      if response.ok() == 1 then
        print("Notification token registered successfully")
      else
        print("Failed to register token: " .. response.status)
      end
    catch (error)
      print("Error registering token: " .. error)
    end
  else
    print("Notifications not enabled. User needs to add the app first.")
  end
end
```

### Complete Flow

```lua
-- Step 1: Check if user has added the app
if player.isInMiniApp() == 1 then
  -- Step 2: Prompt user to add app if not added
  if player.getContext().client.added == false then
    await actions.addMiniApp()
  end

  -- Step 3: Check if notifications are enabled
  if notifications.isEnabled() == 1 then
    -- Step 4: Get notification details
    local details = notifications.getDetails()

    if details then
      -- Step 5: Send to server
      await notifications.sendTokenToServer("https://api.example.com/notifications/register")
      print("Notifications set up!")
    end
  else
    print("Notifications not enabled. User needs to enable them in settings.")
  end
end
```

## Server-Side Implementation

Your server needs to:

1. **Configure webhookUrl** in your manifest (`l8b.config.json`)
2. **Handle webhook events** from Farcaster clients (sent to `webhookUrl`)
3. **Receive and store tokens** when users enable notifications
4. **Send notifications** using stored tokens

### Configuring webhookUrl

Add `webhookUrl` to your manifest configuration:

```json
{
  "farcaster": {
    "manifest": {
      "miniapp": {
        "webhookUrl": "https://api.example.com/webhook"
      }
    }
  }
}
```

The framework will automatically include this in the generated `/.well-known/farcaster.json` manifest.

### Webhook Events

Farcaster clients POST webhook events to your `webhookUrl` when users interact with your Mini App. Events use [JSON Farcaster Signature](https://github.com/farcasterxyz/protocol/discussions/208) format:

```typescript
{
  header: string; // base64url encoded JFS header
  payload: string; // base64url encoded payload
  signature: string; // base64url encoded signature
}
```

#### Event Types

**1. `miniapp_added`**

- Triggered when user adds your Mini App
- Includes `notificationDetails` with token and URL
- Adding a Mini App automatically enables notifications

**Payload structure:**

```json
{
  "event": "miniapp_added",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

**2. `miniapp_removed`**

- Triggered when user removes your Mini App
- Invalidate all notification tokens for this user

**Payload structure:**

```json
{
  "event": "miniapp_removed"
}
```

**3. `notifications_enabled`**

- Triggered when user enables notifications (after previously disabling)
- Includes new `notificationDetails` with token and URL

**Payload structure:**

```json
{
  "event": "notifications_enabled",
  "notificationDetails": {
    "url": "https://api.farcaster.xyz/v1/frame-notifications",
    "token": "a05059ef2415c67b08ecceb539201cbc6"
  }
}
```

**4. `notifications_disabled`**

- Triggered when user disables notifications
- Invalidate notification tokens for this user

**Payload structure:**

```json
{
  "event": "notifications_disabled"
}
```

### Webhook Handler Example

Here's a complete example using `@farcaster/miniapp-node` for verification:

```typescript
import {
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from "@farcaster/miniapp-node";
import express from "express";

const app = express();
app.use(express.json());

// Webhook endpoint (must match webhookUrl in manifest)
app.post("/webhook", async (req, res) => {
  try {
    // Parse and verify webhook event
    const event = await parseWebhookEvent(req.body, verifyAppKeyWithNeynar);

    // Extract FID from event header
    const header = JSON.parse(
      Buffer.from(event.header, "base64url").toString(),
    );
    const fid = header.fid;

    switch (event.payload.event) {
      case "miniapp_added":
        // User added the app - store notification token
        if (event.payload.notificationDetails) {
          await db.notifications.upsert({
            fid,
            token: event.payload.notificationDetails.token,
            url: event.payload.notificationDetails.url,
            enabled: true,
          });
          console.log(`User ${fid} added app, notifications enabled`);
        }
        break;

      case "miniapp_removed":
        // User removed the app - invalidate tokens
        await db.notifications.updateMany({
          where: { fid },
          data: { enabled: false },
        });
        console.log(`User ${fid} removed app`);
        break;

      case "notifications_enabled":
        // User enabled notifications - store new token
        await db.notifications.upsert({
          fid,
          token: event.payload.notificationDetails.token,
          url: event.payload.notificationDetails.url,
          enabled: true,
        });
        console.log(`User ${fid} enabled notifications`);
        break;

      case "notifications_disabled":
        // User disabled notifications - invalidate tokens
        await db.notifications.updateMany({
          where: { fid },
          data: { enabled: false },
        });
        console.log(`User ${fid} disabled notifications`);
        break;
    }

    // Always return 200 OK
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    // Return 200 even on error to prevent retries
    res.status(200).json({ success: false, error: String(error) });
  }
});
```

### Alternative: Manual Verification

If you prefer to verify webhook events manually:

```typescript
import { verifyJsonFarcasterSignature } from "@farcaster/auth-client";

app.post("/webhook", async (req, res) => {
  const { header, payload, signature } = req.body;

  try {
    // Verify signature
    const isValid = await verifyJsonFarcasterSignature({
      header,
      payload,
      signature,
    });

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Decode payload
    const eventData = JSON.parse(Buffer.from(payload, "base64url").toString());

    // Handle event...
    const fid = JSON.parse(Buffer.from(header, "base64url").toString()).fid;

    // Process event based on eventData.event
    // ...

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(200).json({ success: false });
  }
});
```

### Client-Side Token Registration (Alternative)

Instead of relying only on webhooks, you can also register tokens from the client:

```typescript
// POST /api/notifications/register
app.post("/api/notifications/register", async (req, res) => {
  const { token, url, fid } = req.body;

  // Verify fid matches authenticated user (use Quick Auth or SIWF)
  // Store token in database
  await db.notifications.upsert({
    fid,
    token,
    url,
    enabled: true,
  });

  res.json({ success: true });
});
```

**Note:** Webhook events are the **primary** source of truth. Client-side registration is a fallback for cases where webhooks might be delayed or missed.

### Sending Notifications

According to the Farcaster specification, notifications are sent **server-side** by calling the `notificationUrl` with the stored token.

**Request Format:**

```typescript
POST {notificationUrl}
Content-Type: application/json

{
  "token": "notification-token",
  "notificationId": "unique-notification-id",
  "title": "Notification Title",
  "body": "Notification body text",
  "targetUrl": "https://yourapp.com/path"
}
```

**Response Format:**

```typescript
HTTP 200 OK
Content-Type: application/json

{
  "success": true
}
```

**Implementation Example:**

```typescript
// Send notification to user
async function sendNotification(
  fid: number,
  notification: {
    notificationId: string;
    title: string;
    body: string;
    targetUrl: string;
  },
) {
  // Get stored token for user
  const stored = await db.notifications.findByFid(fid);

  if (!stored || !stored.enabled) {
    throw new Error("Notifications not enabled for user");
  }

  // Send notification according to spec
  const response = await fetch(stored.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: stored.token,
      notificationId: notification.notificationId,
      title: notification.title,
      body: notification.body,
      targetUrl: notification.targetUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(`Notification failed: ${response.status}`);
  }

  return await response.json();
}
```

**Batch Notifications:**

You can send the same notification to multiple users by batching tokens:

```typescript
async function sendBatchNotification(
  tokens: string[],
  notification: {
    notificationId: string;
    title: string;
    body: string;
    targetUrl: string;
  },
) {
  // Use the first token's URL (all tokens from same client share URL)
  const firstToken = await db.notifications.findByToken(tokens[0]);

  const response = await fetch(firstToken.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tokens: tokens, // Array of tokens
      notificationId: notification.notificationId,
      title: notification.title,
      body: notification.body,
      targetUrl: notification.targetUrl,
    }),
  });

  return await response.json();
}
```

**Important Notes:**

- Use stable `notificationId` for idempotency (deduplicated for 24 hours)
- Rate limits: 1 notification per 30 seconds per token, 100 per day per token
- Always handle errors gracefully
- Tokens become invalid when user removes app or disables notifications

## Notes

- Notifications are only available when:
  - Running in a Farcaster Mini App
  - User has added the Mini App
  - User has enabled notifications
- Notification tokens are unique per user per client
- Tokens should be stored securely on your server
- Tokens become invalid when:
  - User removes the Mini App
  - User disables notifications
  - User removes the Farcaster client
- Always check `notifications.isEnabled()` before accessing tokens
- Use `notifications.sendTokenToServer()` to easily send tokens to your server

## Related Documentation

- [Farcaster Mini Apps Notifications Guide](https://miniapps.farcaster.xyz/docs/guides/notifications)
- [Player API](../player/README.md) - For checking if app is added
- [Actions API](../actions/README.md) - For `addMiniApp()` action
