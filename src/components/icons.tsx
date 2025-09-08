import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.3 10.7 18 10 18 9c0-.8-.7-1.5-1.5-1.5S15 8.2 15 9" />
      <path d="M9 14c-.2-1-.7-1.7-1.5-2.5C6.7 10.7 6 10 6 9c0-.8.7-1.5 1.5-1.5S9 8.2 9 9" />
      <path d="M12 22v-4" />
      <path d="M20 10.5c0-.2 0-.3.1-.5" />
      <path d="M4 10.5c0-.2 0-.3-.1-.5" />
      <path d="M2 12h20" />
      <path d="M18.4 12c.3 1.2.3 2.5.1 3.8" />
      <path d="M5.6 12c-.3 1.2-.3 2.5-.1 3.8" />
      <path d="M14 18.2c-1.2.5-2.6.5-4 .1" />
      <path d="M12 2a10 10 0 1 0 10 10" />
    </svg>
  );
}
