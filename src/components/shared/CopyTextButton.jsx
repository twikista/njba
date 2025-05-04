'use client';
import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';

export default function CopyTextButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timeoutId); // Reset copied state after 2 seconds
  };

  return (
    <div className='relative'>
      <button
        className='border border-primary rounded-md px-2 text-sm py-0.5 text-primary hover:text-white hover:bg-primary transition-all duration-200 ease-in-out flex items-center gap-1'
        onClick={handleCopy}
        disabled={copied}
      >
        Copy citation
        <BiCopy />
      </button>
      {copied ? (
        <span className='absolute -top-[26px] left-[120px] bg-black text-white px-2 w-fit py-0.5'>
          Citation copied!
        </span>
      ) : null}
    </div>
  );
}
