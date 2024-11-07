## Azure x Supabase OAuth Setup

NOTE: Refer to this [Supabase link](https://supabase.com/docs/guides/auth/social-login/auth-azure) for more information.

Follow these steps to integrate Azure OAuth with Supabase for both local and production environments.

### 1. Register an Application in Azure

1. **Go to** [Azure Portal](https://portal.azure.com/).
2. **Navigate to** **Microsoft Entra ID** > **App registrations** > **New registration**.
3. **Fill in details**:
   - **Name**: Choose a user-friendly name (e.g., `Supabase OAuth`).
   - **Supported account types**: Select **Accounts in any organizational directory and personal Microsoft accounts**.
   - **Redirect URI**:
     - Add `https://your-supabase-url.supabase.co/auth/v1/callback` (production).
4. **Register** the application.

### 2. Add Local Redirect URI

1. Go to **Authentication** > **Platform configurations** > **Add URI**.
2. Add your **local development URI**: `http://localhost:5173/auth/v1/callback`.

### 3. Obtain Client ID and Secret

1. **Client ID**: Find it in the **Overview** as **Application (client) ID**. Use this in Supabase as `AZURE_CLIENT_ID`.
2. **Client Secret**:
   - Go to **Certificates & secrets** > **Client secrets** > **New client secret**.
   - Copy the **Value** (not Secret ID) after creating it. Use this as `AZURE_CLIENT_SECRET` in Supabase.

### 4. Configure API Permissions

1. Go to **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions**.
2. Add the following permissions:
   - `email`
   - `openid`
   - `profile`
   - `User.Read`
3. Click **Grant admin consent**.

### 5. Configure Supabase with Azure Credentials

1. Go to your **Supabase Dashboard** > **Authentication** > **Settings** > **External OAuth Providers**.
2. Enable **Azure** and enter the following:
   - **Client ID**: Use `Application (client) ID` from Azure.
   - **Client Secret**: Use the **secret VALUE** from Azure.
3. Set the **Redirect URL** to your production URI: `https://your-supabase-url.supabase.co/auth/v1/callback`.
