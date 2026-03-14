import Link from 'next/link';
import { FC } from 'react';

export const Navbar: FC = () => {
	return (
		<nav className="flex items-center justify-between">
			<Link
				href="/"
				className="text-xl font-extrabold tracking-tight md:text-2xl">
				⚛️ Breaking Bad
			</Link>
			<div className="flex items-center gap-x-2 md:gap-x-4">
				<Link href="/gallery">
					🖼️ <span className="hidden md:inline">Gallery</span>
				</Link>
				<Link href="/periodic-table">
					🧪 <span className="hidden md:inline">Periodic Table</span>
				</Link>
				<Link href="https://github.com/hieudoanm/breaking-bad" target="_blank">
					🐙 <span className="hidden md:inline">GitHub</span>
				</Link>
			</div>
		</nav>
	);
};
