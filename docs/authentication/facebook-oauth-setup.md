# Facebook OAuth Setup (Supabase)

1. **Create a Facebook App**:

   - Navigate to the [Facebook Developers](https://developers.facebook.com/) site and log in.
   - Click on **My Apps** at the top right, then select **Create App**.
   - Choose the appropriate app type, fill in the required details, and click **Create App**.

2. **Configure Facebook Login**:

   - In your new app's dashboard, go to **Add Products to Your App** and click **Set Up** under **Facebook Login**.
   - Skip the Quickstart guide. In the left sidebar, click **Settings** under **Facebook Login**.
   - In the **Valid OAuth Redirect URIs** field, enter your Supabase project's callback URL:
     ```
     https://<project-ref>.supabase.co/auth/v1/callback
     ```
     Replace `<project-ref>` with your Supabase project reference.
     ```
   - Click **Save Changes**.

3. **Set Permissions**:

   - Navigate to **App Review** > **Permissions and Features**.
   - Ensure that **public_profile** and **email** permissions are set to **Ready for testing**. If not, click **Request Advanced Access** for each.

4. **Retrieve App Credentials**:

   - In the left sidebar, click **Settings** > **Basic**.
   - Note your **App ID** and **App Secret**.

5. **Configure Supabase**:
   - Log in to your [Supabase Dashboard](https://app.supabase.com/).
   - Select your project, then navigate to **Authentication** > **Providers**.
   - Enable **Facebook** and enter your **App ID** and **App Secret**.
   - Click **Save**.

## Video Tutorial

[Supabase Authentication: Setting up Facebook Auth](https://www.youtube.com/watch?v=5qF9aMk7eAQ)
