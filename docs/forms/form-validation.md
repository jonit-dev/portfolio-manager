# Form Validation with Zod

This document provides a step-by-step guide to implementing form validation using Zod and React Hook Form.

## Step 1: Create a Zod Schema

Create a new file called `validationSchema.ts` in your project. This file will contain the Zod schema for your form validation.

```typescript
// src/validationSchema.ts
import { z } from 'zod';

export const schema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

## Step 2: Integrate with React Hook Form

In your form component, import the necessary hooks and the Zod schema. Use the `useForm` hook from `react-hook-form` and the `zodResolver` to connect the schema.

```typescript
// src/components/MyForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../validationSchema';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

## Step 3: Build the Form Component

In the `MyForm` component, we:

- Use the `register` method to connect input fields to the form state.
- Use the `handleSubmit` method to handle form submission.
- Display validation errors using the `errors` object.

## Step 4: Handle Form Submission

When the form is submitted, the `onSubmit` function is called with the validated data. If there are validation errors, they will be displayed next to the corresponding input fields.

## Conclusion

By following these steps, you can create any validated form using Zod and React Hook Form. This approach enhances the robustness of form validation, making it easier to manage and maintain while providing clear feedback to users.
