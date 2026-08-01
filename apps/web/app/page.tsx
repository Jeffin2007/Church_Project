import { redirect } from 'next/navigation';

/**
 * Root page — redirects to the public landing page.
 * The (public) group handles the actual home page content.
 */
export default function RootPage(): never {
  redirect('/');
}
