import React from 'react'
import Image from 'next/image'

function Hero() {
  return (
    <section className="bg-grey-3 flex items-center flex-col">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
        Manage Your Expense &
        <strong className="text-indigo-600"> Control </strong>
        Your Money
      </h1>

      <p className="mt-4 text-base font-bold text-pretty text-gray-700 sm:text-lg/relaxed">
      Stay on top of your finances with Monaymate.
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          href="/sign-in"
        >
          Get Started
        </a>

      </div>
    </div>
  </div>
  <Image src='/dashboard.png' alt='Dashboard.img'
    width={1000}
    height={700}
    className='-mt-4 mb-4 rounded-xl border-1'
  />
</section>
  )
}

export default Hero