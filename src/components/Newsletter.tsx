import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-brand-dark text-white py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-2xl font-serif leading-tight">
              Register to our newsletter to receive the latest news from Asha Smart Shades
            </h2>
          </div>

          <div className="md:w-1/3 w-full">
            <form className="flex w-full h-12 bg-white/5 border border-white/20" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="email"
                placeholder="Enter your email address" 
                className="w-full bg-transparent px-4 text-white placeholder:text-white/40 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-brand-green text-white px-6 font-medium text-sm flex items-center hover:bg-brand-green/90 transition-colors"
              >
                GO &rarr;
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
