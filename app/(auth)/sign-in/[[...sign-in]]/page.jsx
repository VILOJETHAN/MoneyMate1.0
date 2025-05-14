
/**
  import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn />
}
 
 */

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side with Welcome message */}
      <div className="w-1/2 relative hidden md:block">
        <Image
          src="/SignIn.svg" 
          alt="Welcome"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
          
        />
        <div className="absolute bottom-10 left-10 text-black z-10">
          <h1 className="text-5xl font-bold mb-2">Welcome to Moneymate🪙</h1>
          <p className="text-2xl max-w-sm">
             Your One stop Solution to your Finantial Visualization
            </p>
        </div>
      </div>

      {/* Right Side with Clerk SignIn component */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6">
          <SignIn
            appearance={{
              elements: {
                card: 'shadow-xl rounded-xl border',
              },
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/dashboard" 
          />
        </div>
      </div>
    </div>
  );
}
